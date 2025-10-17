import { createApp } from 'vue'

// 1. Import file CSS chính của bạn vào đây
import './assets/css/main.css' 

// 2. Import component gốc là App.vue
import App from './App.vue'

// 3. Tạo và gắn ứng dụng Vue vào div#app trong index.html
createApp(App).mount('#app')