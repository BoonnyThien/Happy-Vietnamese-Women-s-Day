<template>
  <div ref="container" id="canvas-container"></div>
</template>

<script>
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default {
  name: 'ThreeScene',
  setup() {
    const container = ref(null)
    let scene, camera, renderer, controls

    function init() {
      // Scene
      scene = new THREE.Scene()
      scene.background = new THREE.Color(0x000000)

      // Camera
      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      camera.position.set(0, 5, 10)

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(window.devicePixelRatio)
      container.value.appendChild(renderer.domElement)

      // Controls
      controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.dampingFactor = 0.05

      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
      directionalLight.position.set(5, 5, 5)
      scene.add(directionalLight)

      // Expose to window.App for legacy moon.js
      window.App = window.App || {}
      window.App.getScene = () => scene
      window.App.getCamera = () => camera
      window.App.getRenderer = () => renderer

      // Animation loop
      function animate() {
        requestAnimationFrame(animate)
        controls.update()
        renderer.render(scene, camera)
      }
      animate()

      // Handle resize
      window.addEventListener('resize', onResize)
    }

    function onResize() {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }
    }

    onMounted(() => {
      init()
    })

    return {
      container
    }
  }
}
</script>

<style scoped>
#canvas-container {
  width: 100%;
  height: 100%;
}
</style>