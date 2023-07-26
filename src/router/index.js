import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import productRoutes from './productRoutes'
import authRoute from './authRoute'
import cartRoute from './cartRoute'
import useAuthStore from '../stores/authStore'

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

router.beforeEach((to, from) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const authStore = useAuthStore()
    if (!authStore.accessToken) {
      return '/auth/login'
    }
  }
})
