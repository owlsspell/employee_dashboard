import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)
app.use(router).use(VueQueryPlugin)
router.isReady().then(() => app.mount('#app'));
