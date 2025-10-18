<template>
  <TresGroup :position="position" :scale="scale" :rotation="rotation" :draco="draco" >
    <MicaBox
      :position="[2, 0, 0]"
      :scale="[5, 5, 5]"
      :draco="true"
    />
  </TresGroup>
</template>

<script setup>
// Import các component hoa lẻ cần dùng
import HoaHong from '../HoaHong.vue';
import HoaCamTu from '../HoaCamTu.vue';
import HoaHongNhat from '../HoaHongNhat.vue'; // Ví dụ thêm hoa khác
import HoaCamTuXanh from '../HoaCamTuXanh.vue';

import HoaHongNhuy from '../HoaHongNhuy.vue';
import HoaHongTrang from '../HoaHongTrang.vue';
import HoaHongTuong from '../HoaHongTuong.vue';
import HoaHongXoe from '../HoaHongXoe.vue';

import BalloonWrapping from '../wrapping/BalloonWrapping.vue';
import MicaBox from '../wrapping/MicaBox.vue';
import Ribbon from '../wrapping/Ribbon.vue';
import RoundWrappingPaper from '../wrapping/RoundWrappingPaper.vue';
import SquareWrappingPaper from '../wrapping/SquareWrappingPaper.vue';
import HoaCuc from '../HoaCuc.vue';
import HoaDongTien from '../HoaDongTien.vue';
import HoaHongSam from '../HoaHongSam.vue';


// Định nghĩa props để component cha (App.vue) có thể điều khiển bó hoa
defineProps({
  position: { type: Array, default: () => [0, 0, 0] },
  scale: { type: Array, default: () => [1, 1, 1] },
  rotation: { type: Array, default: () => [0, 0, 0] }
});
</script>