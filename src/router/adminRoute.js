import Admin from '@/views/Admin.vue'
import Users from '@/views/Users.vue'

export default {
  path: '/admin',
  component: Admin,
  meta: { requiresAuth: true },
  children: [
    {
      path: 'users',
      component: Users
    }
  ]
}
