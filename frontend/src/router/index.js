import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Reports from '../views/Reports.vue'
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
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
        component: Reports

    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router