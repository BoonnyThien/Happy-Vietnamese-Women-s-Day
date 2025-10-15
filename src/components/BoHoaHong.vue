<template>
  <ModelViewer 
    model-path="/models/BoHoaHongFull.glb"
    :position="{ x: 0, y: 0, z: 0 }"
    :scale="{ x: 1, y: 1, z: 1 }"
    :rotation="{ x: 0, y: 0, z: 0 }"
  />
</template>

<script>
import ModelViewer from './ModelViewer.vue'

export default {
  name: 'BoHoaHong',
  components: {
    ModelViewer
  }
}
</script>