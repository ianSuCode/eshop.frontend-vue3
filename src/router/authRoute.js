import Login from '@/views/Login.vue'

export default {
  path: '/auth',
  children: [
    {
      path: 'login',
      component: Login
    }
  ]
}
