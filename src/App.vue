<template>
  <LoadingScreen v-if="isLoading" />

  <div v-else>
    <Stars />
    
    <UiOverlay 
      :greetingText="greetings[currentGreeting]"
      @changeGreeting="changeGreeting"
      @swapItems="swapItems"
    />

    <ThreeScene>
      <Moon ref="moon" />
   
      
      <Suspense>
        <BoHoaHong :position="[0, -2, 0]" :scale="[3,3,3]" :draco="true" />
        
        <template #fallback>
          <TresMesh>
            <TresBoxGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>
        </template>
      </Suspense>
    </ThreeScene>
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// BỎ import OrbitControls vì ThreeScene đã lo việc này
// import { OrbitControls } from '@tresjs/cientos'; 
import { useUI } from './composables/useUI.js';

// Import các component UI và 3D
import LoadingScreen from './components/ui/LoadingScreen.vue';
import UiOverlay from './components/ui/UiOverlay.vue';
import Stars from './components/ui/Stars.vue';
import Moon from './components/canvas/Moon.vue';
import BoHoaHong from './components/BoHoaHong.vue';
import HoaHong from './components/HoaHong.vue';


// Import component sân khấu 3D
import ThreeScene from './components/ThreeScene.vue'; // <-- DÙNG COMPONENT NÀY

// Logic không thay đổi
const moon = ref(null);
const isLoading = ref(true);

const { 
  currentGreeting, 
  greetings, 
  changeGreeting, 
  swapItems, 
  initAnimations 
} = useUI();

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
    // Lưu ý: ref="moon" bây giờ nằm trong ThreeScene, 
    // App.vue không truy cập trực tiếp được nữa. 
    // Cần cách khác để trigger animation nếu cần.
    // if (moon.value) initAnimations([moon.value]); 
    console.log("3D Scene loaded"); 
  }, 2000);
});
</script>

<style>
@import './assets/css/main.css';
</style>