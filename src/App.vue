<template>
  <div v-if="isLoading" class="loader" id="loader">
    <div class="loader-content">
      <div class="moon-loader"></div>
      <h2>Đợi chút xíu đang tải 3D...</h2>
    </div>
  </div>

  <div v-else>
    <Stars />

    <!-- TROISJS MAGIC: <renderer> tự tạo canvas + scene + camera + loop! -->
    <renderer 
      ref="renderer" 
      antialias 
      orbit-ctrl  <!-- Tự động camera controls! -->
      resize="window"
      :onBeforeRender="onBeforeRender"
    >
      <camera :position="{ z: 20 }" />  <!-- Camera tự động -->
      <scene>  <!-- Scene tự động -->
        <!-- Lights -->
        <point-light :position="{ y: 50, z: 50 }" color="0xfff9d6" intensity="0.9" />
        <directional-light :position="{ y: 10 }" color="0xfff9d6" intensity="0.12" />

        <!-- Models -->
        <Moon ref="moon" />
        <!-- Thêm <HoaHong ref="cup" /> nếu có component -->
        
        <!-- Ambient light -->
        <ambient-light intensity="0.2" />
      </scene>
    </renderer>

    <div class="ui-overlay">
      <header class="header">
        <div class="logo">🥤 Happy-Vietnamese Women's Day 🌙</div>
      </header>
      <div class="greeting-card">
        <h2 class="greeting-title">🎑 Chúc Mừng Ngày Phụ nữ Việt Nam 🎑</h2>
        <p class="greeting-text">{{ greetings[currentGreeting] }}</p>
      </div>
      <div class="controls">
        <button class="btn" @click="changeGreeting">✨ Đổi Lời Chúc</button>
        <button class="btn" @click="swapItems">🔀 Ngẫu Nhiên</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Stars from './components/ui/Stars.vue'
import Moon from './components/canvas/Moon.vue'
import { Renderer } from 'troisjs'  // Import Renderer từ TroisJS
import { useUI } from './composables/useUI.js'

const renderer = ref(null)
const moon = ref(null)
const isLoading = ref(true)

const { 
  currentGreeting, 
  greetings, 
  changeGreeting, 
  swapItems, 
  initAnimations 
} = useUI()

const onBeforeRender = () => {
  // Animation loop tự động của TroisJS - thêm rotation nếu cần
  if (moon.value) moon.value.rotation.y += 0.01
}

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
    // Init GSAP sau load
    if (moon.value) initAnimations([moon.value])
  }, 2000)
})
</script>

<style>
@import './assets/css/main.css';
</style>