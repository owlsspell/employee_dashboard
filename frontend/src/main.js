import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { plugin, defaultConfig } from '@formkit/vue'
import { generateClasses } from '@formkit/themes'
import customTailwindTheme from '../tailwind-theme.js'

const app = createApp(App)
app.use(router).use(VueQueryPlugin)
app.use(plugin, defaultConfig({
    config: {
        classes: generateClasses(customTailwindTheme),
    },
}))

// router.isReady().then(() => {
//     app.mount('#app')
// })
app.mount('#app')