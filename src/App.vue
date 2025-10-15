<template>
  <div class="mobile-container">
    <ThreeScene class="background-canvas" />
    <div class="ui-overlay">
      <!-- Background stars + moon từ logic cũ -->
      <div id="stars" class="stars"></div>
      <Controls />
    </div>
    
    <!-- Các model hoa mới -->
    <HoaHong />
    <HoaCuc />
    <HoaCamTu />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import ThreeScene from './components/canvas/Scene.vue'
import HoaHong from './components/HoaHong.vue'
import HoaCuc from './components/HoaCuc.vue'
import HoaCamTu from './components/HoaCamTu.vue'
import Controls from './components/ui/Controls.vue'

import './styles/main.css'

export default {
  components: { 
    ThreeScene,
    HoaHong,
    HoaCuc,
    HoaCamTu
    , Controls
  },
  setup() {
    onMounted(() => {
      // Chỉ giữ lại phần tạo stars và khởi tạo moon từ code cũ
      setTimeout(() => {
        if (window.App && window.App.createStars) window.App.createStars()
      }, 300)
    })
  }
}
</script>
