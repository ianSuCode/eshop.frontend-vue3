import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import productRoutes from './productRoutes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  routes: [
    { path: '/', component: Home }, 
    { ...productRoutes }
  ]
})

export default router
