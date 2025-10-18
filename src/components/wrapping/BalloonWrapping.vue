<template>
  <TresMesh :position="position">
    <TresSphereGeometry :args="[radius, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.7]" />
    <TresMeshPhysicalMaterial
      color="#8b4513"
      :transparent="true"
      :opacity="0.6"
      :side="THREE.DoubleSide"
      :roughness="0.3"
      :metalness="0.1"
      :transmission="0.3"
    />
  </TresMesh>
</template>

<script setup>
import * as THREE from 'three';

defineProps({
  position: { type: Array, default: () => [0, 0, 0] },
  radius: { type: Number, default: 1.5 },
});
</script>