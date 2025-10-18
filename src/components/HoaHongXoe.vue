<template>
  <GLTFModel 
    path="/models/HoaHongXoe.glb"
    :position="[0, 0, 0]"
    :scale="[1, 1, 1]"
  />
</template>

<script setup>
import { GLTFModel } from '@tresjs/cientos';
</script>