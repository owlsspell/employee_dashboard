import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from "vue";
import Homepage from '../views/Homepage.vue'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Homepage
    },
    {
        path: '/reports',
        name: 'Reports',
        component: defineAsyncComponent(() => import('../views/Reports.vue'))
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: defineAsyncComponent(() => import('../views/Dashboard.vue'))
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router