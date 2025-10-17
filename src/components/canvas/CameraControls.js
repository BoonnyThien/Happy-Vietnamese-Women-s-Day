// src/components/canvas/CameraControls.js
import { onMounted, onUnmounted } from 'vue'

export function useCameraControls(getCamera) {
  const ROTATE_SPEED = 0.005
  const ZOOM_SPEED = 0.01
  const MIN_RADIUS = 5
  const MAX_RADIUS = 80

  let isPointerDown = false
  let isTouchPinching = false
  let lastX = 0
  let lastY = 0
  let pinchStartDist = 0
  let pinchStartRadius = 0

  let yaw = 0
  let pitch = Math.PI / 2
  let radius = 20

  const updateFromCamera = (camera) => {
    if (!camera) return
    const p = camera.position
    const r = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z) || 1
    radius = r
    pitch = Math.acos(Math.max(-1, Math.min(1, p.y / r)))
    yaw = Math.atan2(p.x, p.z)
  }

  const applySphericalToCamera = (camera) => {
    if (!camera) return
    const phi = Math.max(0.1, Math.min(Math.PI - 0.1, pitch))
    const theta = yaw
    const r = Math.max(MIN_RADIUS, Math.min(MAX_RADIUS, radius))
    const sinPhi = Math.sin(phi)
    camera.position.x = r * sinPhi * Math.sin(theta)
    camera.position.y = r * Math.cos(phi)
    camera.position.z = r * sinPhi * Math.cos(theta)
    camera.lookAt(0, 0, 0)
  }

  const handleMouseDown = (e) => {
    isPointerDown = true
    lastX = e.clientX
    lastY = e.clientY
  }

  const handleMouseMove = (e) => {
    const camera = getCamera()
    if (!camera || !isPointerDown) return
    const dx = e.clientX - lastX
    const dy = e.clientY - lastY
    lastX = e.clientX
    lastY = e.clientY
    yaw -= dx * ROTATE_SPEED
    pitch -= dy * ROTATE_SPEED
    applySphericalToCamera(camera)
  }

  const handleMouseUp = () => { isPointerDown = false }

  const handleWheel = (e) => {
    const camera = getCamera()
    if (!camera) return
    radius += e.deltaY * ZOOM_SPEED
    radius = Math.max(MIN_RADIUS, Math.min(MAX_RADIUS, radius))
    applySphericalToCamera(camera)
  }

  const handleTouchStart = (e) => {
    const camera = getCamera()
    if (!camera) return
    if (e.touches.length === 1) {
      isPointerDown = true
      lastX = e.touches[0].clientX
      lastY = e.touches[0].clientY
      isTouchPinching = false
    } else if (e.touches.length === 2) {
      isTouchPinching = true
      isPointerDown = false
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      pinchStartDist = Math.sqrt(dx * dx + dy * dy)
      pinchStartRadius = radius
    }
  }

  const handleTouchMove = (e) => {
    const camera = getCamera()
    if (!camera) return
    if (isTouchPinching && e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const dist = Math.sqrt(dx * dx + dy * dy)
      const diff = dist - pinchStartDist
      radius = pinchStartRadius - diff * ZOOM_SPEED * 0.5
      radius = Math.max(MIN_RADIUS, Math.min(MAX_RADIUS, radius))
      applySphericalToCamera(camera)
      e.preventDefault()
    } else if (isPointerDown && e.touches.length === 1) {
      const touch = e.touches[0]
      const dx = touch.clientX - lastX
      const dy = touch.clientY - lastY
      lastX = touch.clientX
      lastY = touch.clientY
      yaw -= dx * ROTATE_SPEED
      pitch -= dy * ROTATE_SPEED
      applySphericalToCamera(camera)
      e.preventDefault()
    }
  }

  const handleTouchEnd = (e) => {
    if (e.touches.length === 0) {
      isPointerDown = false
      isTouchPinching = false
    } else if (e.touches.length === 1) {
      isTouchPinching = false
      isPointerDown = true
      lastX = e.touches[0].clientX
      lastY = e.touches[0].clientY
    }
  }

  const handleResize = () => {
    const camera = getCamera()
    if (!camera) return
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  }

  onMounted(() => {
    const initCamera = getCamera()
    if (initCamera) updateFromCamera(initCamera)

    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseleave', handleMouseUp)
    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd)
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('mousedown', handleMouseDown)
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
    window.removeEventListener('mouseleave', handleMouseUp)
    window.removeEventListener('wheel', handleWheel)
    window.removeEventListener('touchstart', handleTouchStart)
    window.removeEventListener('touchmove', handleTouchMove)
    window.removeEventListener('touchend', handleTouchEnd)
    window.removeEventListener('resize', handleResize)
  })

  return { applySphericalToCamera }
}