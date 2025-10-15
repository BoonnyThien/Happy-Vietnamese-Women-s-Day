<template>
  <div class="controls" style="position: absolute; bottom: 20px; left: 20px; z-index: 20;">
    <button @click="createStars">Create Stars</button>
    <button @click="swapItems">Swap Items</button>
  </div>
</template>

<script>
export default {
  name: 'Controls',
  methods: {
    createStars(){ if (window.App && window.App.createStars) window.App.createStars() },
    swapItems(){ if (window.App && window.App.swapItems) window.App.swapItems() }
  }
}
</script>

<style scoped>
button{ margin-right: 8px }
</style>