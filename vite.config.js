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
    port: 3000, // Hoặc 3001 tùy bạn
    host: '0.0.0.0',
    open: true
  },
  base: './',
  // TẠM THỜI XÓA HOẶC COMMENT OUT KHỐI NÀY
  // optimizeDeps: {
  //   include: ['@tresjs/core', '@tresjs/cientos']
  // }
})