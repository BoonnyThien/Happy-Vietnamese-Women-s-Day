<template>
  <GLTFModel 
    path="/models/HoaHong.glb"
    :position="[-2, 0, 0]"
    :scale="[2, 1, 1]"
    :draco="true"
  />
</template>

<script setup>
import { GLTFModel } from '@tresjs/cientos';
</script>