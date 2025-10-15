<template>
  <div ref="container" class="three-scene"></div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default {
  name: 'Scene',
  emits: ['ready'],
  setup(_, { emit }){
    const container = ref(null)
    let scene, camera, renderer, controls, raf

    function init(){
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.set(0, 5, 10)

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(window.devicePixelRatio || 1)
      container.value.appendChild(renderer.domElement)

      controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true

      const amb = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(amb)
      const dir = new THREE.DirectionalLight(0xffffff, 0.6)
      dir.position.set(10, 10, 10)
      scene.add(dir)

      // expose getters on window.App for compatibility
      window.App = window.App || {}
      window.App.getScene = () => scene
      window.App.getCamera = () => camera
      window.App.getRenderer = () => renderer

      animate()
      emit('ready')
    }

    function animate(){
      raf = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }

    function onResize(){
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    onMounted(()=>{
      init()
      window.addEventListener('resize', onResize)
    })

    onBeforeUnmount(()=>{
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
      if (renderer && renderer.domElement && container.value) container.value.removeChild(renderer.domElement)
    })

    return { container }
  }
}
</script>

<style scoped>
.three-scene {
  width: 100%;
  height: 100vh;
  position: relative;
}
</style>