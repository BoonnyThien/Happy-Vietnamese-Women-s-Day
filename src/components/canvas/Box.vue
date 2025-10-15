<template>
  <mesh ref="mesh" :position="position">
    <boxBufferGeometry :args="[size, size, size]" />
    <meshStandardMaterial :color="color" />
  </mesh>
</template>

<script>
export default {
  name: 'Box',
  props: {
    position: { type: Array, default: () => [0,0,0] },
    size: { type: Number, default: 1 },
    color: { type: String, default: '#ff0000' }
  }
}
</script>

<style scoped>
</style>