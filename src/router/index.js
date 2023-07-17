import { createRouter, createWebHistory } from 'vue-router'
import productRoutes from './product.routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    { ...productRoutes },
  ]
})

export default router
