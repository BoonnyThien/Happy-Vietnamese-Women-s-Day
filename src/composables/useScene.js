// src/composables/useScene.js
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import gsap from 'gsap'

export function useScene(containerRef) {
  const scene = ref(new THREE.Scene())
  const camera = ref(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000))
  const renderer = ref(new THREE.WebGLRenderer({ antialias: true }))
  
  // Models
  const moon = ref(null)

  onMounted(() => {
    if (!containerRef.value) return
    
    renderer.value.setSize(window.innerWidth, window.innerHeight)
    containerRef.value.appendChild(renderer.value.domElement)
    camera.value.position.z = 20
    
    // Lights
    scene.value.add(new THREE.AmbientLight(0x404040, 0.2))
    scene.value.add(new THREE.PointLight(0xfff9d6, 0.9))
    
    animate()
  })

  const animate = () => {
    requestAnimationFrame(animate)
    if (moon.value) moon.value.rotation.y += 0.005
    renderer.value.render(scene.value, camera.value)
  }

  // GSAP
  const initAnimations = () => {
    gsap.fromTo(moon.value.position, { y: -5 }, { y: 0, duration: 1.5, ease: 'bounce.out' })
  }

  const swapItems = () => {
    gsap.to(moon.value.position, { x: () => Math.random() * 6 - 3, duration: 0.5 })
  }

  onUnmounted(() => renderer.value.dispose())

  return { scene, camera, renderer, moon, initAnimations, swapItems }
}