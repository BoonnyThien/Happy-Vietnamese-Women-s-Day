<template>
  <mesh ref="moonMesh" :position="[-7, 0, -10]">
    <sphere-geometry :args="[2, 64, 64]" />
    <mesh-standard-material 
      color="0xfff9d6" 
      emissive="0xfff9d6" 
      emissive-intensity="0.12"
      transparent 
      alpha-test="0.05"
    />
  </mesh>
  <!-- Glow (TROISJS tự add vào scene) -->
  <mesh :position="[-7, 0, -10]">
    <sphere-geometry :args="[2.24, 32, 32]" />
    <mesh-basic-material 
      color="0xfff9d6" 
      transparent 
      opacity="0.14" 
      blending="2" 
    />
  </mesh>
  <mesh :position="[-7, 0, -10]">
    <sphere-geometry :args="[3.2, 32, 32]" />
    <mesh-basic-material 
      color="0xfff9d6" 
      transparent 
      opacity="0.07" 
      blending="2"
    />
  </mesh>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const moonMesh = ref(null)

onMounted(() => {
  console.log('Moon loaded in TROISJS!')
})
</script>