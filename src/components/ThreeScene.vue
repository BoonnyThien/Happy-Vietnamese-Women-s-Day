<template>
  <TresCanvas shadows window-size>
    <TresPerspectiveCamera :position="[0, 5, 15]" :look-at="[0, 0, 0]" />
    <OrbitControls :enable-damping="true" :damping-factor="0.05" />

    <TresAmbientLight :intensity="0.5" />
    <TresDirectionalLight :position="[5, 5, 5]" :intensity="1.5" cast-shadow />
    
    <slot></slot>
  </TresCanvas>
</template>

<script setup>
// Import component điều khiển từ Cientos
import { OrbitControls } from '@tresjs/cientos';
</script>