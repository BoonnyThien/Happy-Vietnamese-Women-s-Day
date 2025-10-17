// src/components/ui/Stars.vue
<template>
  <div id="stars"></div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const starsContainer = document.getElementById('stars')
  if (!starsContainer) return
  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div')
    star.className = 'star'
    star.style.left = Math.random() * 100 + '%'
    star.style.top = Math.random() * 100 + '%'
    star.style.animationDelay = Math.random() * 3 + 's'
    starsContainer.appendChild(star)
  }
})
</script>

<style scoped>
#stars {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;  
/* Đặt sau nếu cần*/
}
.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  opacity: 0.8;
  border-radius: 50%;
  animation: twinkle 2s infinite ease-in-out;
}
@keyframes twinkle {
  0% { opacity: 0.2; }
  50% { opacity: 1; }
  100% { opacity: 0.2; }
}
</style>