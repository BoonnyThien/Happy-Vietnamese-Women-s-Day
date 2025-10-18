import { createApp } from 'vue'
import Tres from '@tresjs/core' // Tres core plugin (registers <Tres*> components)

import App from './App.vue'
import './assets/css/main.css'

const app = createApp(App)

// Register Tres core first, then register Cientos plugin so its components are available
app.use(Tres)


app.mount('#app')