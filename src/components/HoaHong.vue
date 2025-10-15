<template>
  <ModelViewer 
    model-path="/models/HoaHong.glb"
    :position="{ x: -2, y: 0, z: 0 }"
    :scale="{ x: 1, y: 1, z: 1 }"
  />
</template>

<script>
import ModelViewer from './ModelViewer.vue'

export default {
  name: 'HoaHong',
  components: {
    ModelViewer
  }
}
</script>