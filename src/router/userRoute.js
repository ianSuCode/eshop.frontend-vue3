import Signup from '../views/Signup.vue'

export default {
  path: '/user',
  children: [
    {
      path: 'signup',
      component: Signup
    }
  ]
}
