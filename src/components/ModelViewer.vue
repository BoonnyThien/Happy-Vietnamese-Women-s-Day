<template>
  <div ref="container" class="model-container"></div>
</template>

<script>
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default {
  name: 'ModelViewer',
  props: {
    modelPath: {
      type: String,
      required: true
    },
    position: {
      type: Object,
      default: () => ({ x: 0, y: 0, z: 0 })
    },
    scale: {
      type: Object, 
      default: () => ({ x: 1, y: 1, z: 1 })
    },
    rotation: {
      type: Object,
      default: () => ({ x: 0, y: 0, z: 0 })
    }
  },
  setup(props) {
    const container = ref(null)
    const loader = new GLTFLoader()
    
    onMounted(() => {
      const scene = window.App && window.App.getScene && window.App.getScene()
      if (!scene) {
        console.error('Scene not found - ensure ThreeScene is mounted first')
        return
      }

      loader.load(
        props.modelPath,
        (gltf) => {
          const model = gltf.scene
          model.position.set(props.position.x, props.position.y, props.position.z)
          model.scale.set(props.scale.x, props.scale.y, props.scale.z)
          model.rotation.set(props.rotation.x, props.rotation.y, props.rotation.z)
          scene.add(model)
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total * 100) + '% loaded')
        },
        (error) => {
          console.error('Error loading model:', error)
        }
      )
    })

    return {
      container
    }
  }
}
</script>

<style scoped>
.model-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>