import Account from '../views/Account.vue'
import Profile from '../views/Profile.vue'
import Orders from '../views/Orders.vue'

export default {
  path: '/account',
  component: Account,
  meta: { requiresAuth: true },
  children: [
    {
      path: 'profile',
      component: Profile
    },
    {
      path: 'orders',
      component: Orders
    }
  ]
}
