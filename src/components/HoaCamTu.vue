<template>
  <GLTFModel 
    path="/models/HoaCamTuFull.glb"
    :position="[2, 0, 0]"
    :scale="[1, 1, 1]"
  />
</template>

<script setup>
import { GLTFModel } from '@tresjs/cientos';
</script>