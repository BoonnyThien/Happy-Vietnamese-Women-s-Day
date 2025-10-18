<template>
  <TresGroup :position="position" :scale="[scale, scale, scale]">
    <TresMesh :position="[0, 0, 0]">
      <TresSphereGeometry :args="[0.3, 16, 16]" />
      <TresMeshStandardMaterial :color="color" :roughness="0.4" :metalness="0.3" />
    </TresMesh>

    <TresMesh :position="[-0.6, 0, 0]" :rotation-z="Math.PI / 6">
      <TresTorusGeometry :args="[0.5, 0.15, 16, 32]" />
      <TresMeshStandardMaterial :color="color" :roughness="0.4" :metalness="0.3" />
    </TresMesh>

    <TresMesh :position="[0.6, 0, 0]" :rotation-z="-Math.PI / 6">
      <TresTorusGeometry :args="[0.5, 0.15, 16, 32]" />
      <TresMeshStandardMaterial :color="color" :roughness="0.4" :metalness="0.3" />
    </TresMesh>

    <TresMesh :position="[0, -0.8, 0]" :rotation-z="0.2">
      <TresBoxGeometry :args="[0.2, 1, 0.1]" />
      <TresMeshStandardMaterial :color="color" :roughness="0.4" :metalness="0.3" />
    </TresMesh>

    <TresMesh :position="[0, -0.8, 0]" :rotation-z="-0.2">
      <TresBoxGeometry :args="[0.2, 1, 0.1]" />
      <TresMeshStandardMaterial :color="color" :roughness="0.4" :metalness="0.3" />
    </TresMesh>
    <Ribbon 
      :position="[0, height + 0.1, 0]"  
      :scale="[0.6, 0.6, 0.6]" 
      color="#FFB6C1" 
    />
  </TresGroup>
</template>

<script setup>
defineProps({
  color: { type: String, default: '#f5f5f5' },
  position: { type: Array, default: () => [0, 0, 0] },
  scale: { type: Number, default: 1 },
});
import Ribbon from './Ribbon.vue';
</script>