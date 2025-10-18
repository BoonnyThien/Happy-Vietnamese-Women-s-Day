<template>
  <TresGroup :position="position">
    <TresMesh :position="[0, thickness / 2, 0]">
      <TresBoxGeometry :args="[width, thickness, depth]" />
      <TresMeshPhysicalMaterial v-bind="materialProps" />
    </TresMesh>
    <TresMesh :position="[0, height / 2, depth / 2 - thickness / 2]">
      <TresBoxGeometry :args="[width, height, thickness]" />
      <TresMeshPhysicalMaterial v-bind="materialProps" />
    </TresMesh>
    <TresMesh :position="[0, height / 2, -depth / 2 + thickness / 2]">
      <TresBoxGeometry :args="[width, height, thickness]" />
      <TresMeshPhysicalMaterial v-bind="materialProps" />
    </TresMesh>
    <TresMesh :position="[-width / 2 + thickness / 2, height / 2, 0]">
      <TresBoxGeometry :args="[thickness, height, depth]" />
      <TresMeshPhysicalMaterial v-bind="materialProps" />
    </TresMesh>
    <TresMesh :position="[width / 2 - thickness / 2, height / 2, 0]">
      <TresBoxGeometry :args="[thickness, height, depth]" />
      <TresMeshPhysicalMaterial v-bind="materialProps" />
    </TresMesh>
    <TresMesh :position="[0, height - thickness / 2, 0]">
      <TresBoxGeometry :args="[width, thickness, depth]" />
      <TresMeshPhysicalMaterial v-bind="materialProps" />
    </TresMesh>
    <TresMesh :position="[0, height, 0]" :rotation-z="Math.PI * 2">
      <TresTorusGeometry :args="[0.5, 0.05, 16, 32, Math.PI]" />
      <TresMeshPhysicalMaterial
        color="#cccccc"
        :transparent="true"
        :opacity="0.5"
        :roughness="0.2"
        :metalness="0.3"
      />
    </TresMesh>
  </TresGroup>
</template>

<script setup>
const props = defineProps({
  position: { type: Array, default: () => [0, 0, 0] },
  dimensions: { type: Array, default: () => [2.5, 2.5, 1.5] },
});

const [width, height, depth] = props.dimensions;
const thickness = 0.05;

// Thuộc tính vật liệu dùng chung cho các mặt kính/mica
const materialProps = {
  color: '#f5f5f5',       // Màu trắng sữa nhẹ
  transparent: true,       // Cho phép trong suốt
  opacity: 0.6,            // Mờ 40%
  roughness: 0.3,          // Có độ nhám nhẹ (mica không bóng như kính)
  metalness: 0.0,          // Không phải kim loại
  transmission: 0.7,       // Ánh sáng xuyên qua phần nào
  thickness: 1.0,          // Độ dày trung bình
  ior: 1.49,               // Chỉ số khúc xạ của mica/acrylic thật
  reflectivity: 0.3,       // Phản xạ nhẹ
  clearcoat: 0.2,          // Một lớp phủ bóng nhẹ
  clearcoatRoughness: 0.4  // Không gương, chỉ bóng mịn
};
</script>