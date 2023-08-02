import Account from '../views/Account.vue'
import Orders from '../views/Orders.vue'

export default {
  path: '/account',
  component: Account,
  meta: { requiresAuth: true },
  children: [
    {
      path: 'orders',
      component: Orders
    }
  ]
}
