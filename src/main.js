import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.css'

// Legacy moon (keeps createMoon/createStars functions if present)
import './js/moon.js'

createApp(App).mount('#app')