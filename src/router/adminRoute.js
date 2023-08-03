import Admin from '../views/Admin.vue'
import AdminUsers from '../views/admin/AdminUsers.vue'
import AdminOrders from '../views/admin/AdminOrders.vue'

export default {
  path: '/admin',
  component: Admin,
  meta: { requiresAuth: true },
  children: [
    {
      path: 'users',
      component: AdminUsers
    },
    {
      path: 'orders',
      component: AdminOrders
    }
  ]
}
