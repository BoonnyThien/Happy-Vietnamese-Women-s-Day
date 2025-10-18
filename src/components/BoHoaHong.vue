<template>
  <GLTFModel 
    path="/models/BoHoaHongFull.glb" 
    :position="position"
    :scale="scale"
    :draco="draco"
  />
</template>

<script setup>
// Import component GLTFModel từ Cientos
import { GLTFModel } from '@tresjs/cientos';

// Định nghĩa props như cũ, nhưng dùng <script setup> cho nhất quán
defineProps({
  position: Object,
  scale: Object,
  draco: Boolean
});
</script>