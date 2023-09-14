import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { plugin, defaultConfig } from '@formkit/vue'
import { generateClasses } from '@formkit/themes'
import customTailwindTheme from '../tailwind-theme.js'
import { createPinia } from 'pinia'
import { createAuth0 } from '@auth0/auth0-vue';
// import "@formkit/themes/genesis";

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router).use(VueQueryPlugin)
app.use(plugin, defaultConfig({
    config: {
        classes: generateClasses(customTailwindTheme),
    },
}))

app.use(
    createAuth0({
        domain: import.meta.env.VITE_DOMAIN,
        clientId: import.meta.env.VITE_CLIENT_ID,
        authorizationParams: {
            redirect_uri: window.location.origin,
            audience: import.meta.env.MODE === 'development' ? import.meta.env.VITE_BACKEND_DEVELOPMENT : import.meta.env.VITE_BACKEND_PRODUCTION,
        }
    })
);

app.mount('#app')