<template>
  <TresMesh :position="position" :rotation-z="Math.PI / 4">
    <TresExtrudeGeometry :args="[shape, extrudeSettings]" />
    <TresMeshStandardMaterial
      :color="color"
      :side="THREE.DoubleSide"
      :roughness="0.7"
      :metalness="0.05"
    />
  </TresMesh>
</template>

<script setup>
import * as THREE from 'three';
import { computed } from 'vue';

const props = defineProps({
  color: { type: String, default: '#e8d5d5' },
  position: { type: Array, default: () => [0, 0, 0] },
  size: { type: Number, default: 2 },
});

// Tính toán Shape dựa trên prop 'size'
const shape = computed(() => {
  const shape = new THREE.Shape();
  const s = props.size;
  shape.moveTo(-s, -s);
  shape.lineTo(s, -s);
  shape.lineTo(s, s);
  shape.lineTo(-s, s);
  shape.lineTo(-s, -s);
  return shape;
});

// Cài đặt Extrude (không cần computed vì không đổi)
const extrudeSettings = {
  depth: 0.05,
  bevelEnabled: true,
  bevelThickness: 0.1,
  bevelSize: 0.1,
  bevelSegments: 3
};
</script>