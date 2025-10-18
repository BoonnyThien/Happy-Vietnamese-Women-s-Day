<template>
  <TresMesh :position="position" :rotation-x="Math.PI">
    <TresConeGeometry :args="[radius, radius * 1.5, 32, 1, true]" />
    <TresMeshStandardMaterial
      :color="color"
      :side="THREE.DoubleSide"
      :roughness="0.8"
      :metalness="0.1"
    />
  </TresMesh>
</template>

<script setup>
import * as THREE from 'three'; // Cần import THREE để dùng DoubleSide

defineProps({
  color: { type: String, default: '#2a2a2a' },
  position: { type: Array, default: () => [0, 0, 0] },
  radius: { type: Number, default: 2 },
});
</script>