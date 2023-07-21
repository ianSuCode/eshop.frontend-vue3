import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import productRoutes from './productRoutes'
import authRoute from './authRoute'
import cartRoute from './cartRoute'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  routes: [
    { path: '/', component: Home },
    { ...productRoutes },
    { ...authRoute },
    { ...cartRoute },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      redirect: '/'
    }
  ]
})

export default router
