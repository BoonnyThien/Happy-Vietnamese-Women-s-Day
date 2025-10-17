// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000, // Đổi port tránh conflict
    host: '0.0.0.0',
    open: true
  },
  base: './',
  // Cho production build
  optimizeDeps: {
    include: ['troisjs']
  }
})