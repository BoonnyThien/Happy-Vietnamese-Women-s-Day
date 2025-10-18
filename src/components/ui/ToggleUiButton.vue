<template>
  <button class="toggle-ui-btn btn" @click="$emit('toggleUi')">
    <span class="btn-text">Ẩn/Hiện Giao Diện</span>
    <span class="btn-icon">🫣</span>
  </button>
</template>

<script setup>
// Định nghĩa sự kiện component phát ra
defineEmits(['toggleUi']);
</script>

<style scoped>
.toggle-ui-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 10px 16px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
}

/* Hiệu ứng hover trên PC */
.toggle-ui-btn:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: scale(1.05);
}

/* Ẩn icon khi đủ rộng (chỉ hiện chữ) */
.btn-icon {
  display: none;
}

/* Khi ở màn hình nhỏ (điện thoại) */
@media (max-width: 768px) {
  .toggle-ui-btn {
    bottom: 12px;
    right: 12px;
    padding: 8px 10px;
    font-size: 12px;
    border-radius: 50%;
    width: 44px;
    height: 44px;
    justify-content: center;
  }

  /* Ẩn chữ, chỉ hiện icon */
  .btn-text {
    display: none;
  }

  .btn-icon {
    display: inline;
    font-size: 18px;
  }
}
</style>
