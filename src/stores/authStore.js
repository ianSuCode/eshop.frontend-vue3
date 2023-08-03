import { defineStore } from 'pinia'
import { router } from '../router'

import useAlertStore from '../stores/alertStore'

const apiUrl = `${import.meta.env.VITE_API_URL}/api`

export default defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken'),
    userInfo: null
  }),
  actions: {
    async login(email, password) {
      const alertStore = useAlertStore()
      try {
        const option = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.value, password: password.value })
        }
        const res = await fetch(`${apiUrl}/auth/login`, option)
        const result = await res.json()

        if (res.status !== 200) {
          alertStore.warning(result.message)
          return false
        } else {
          this.accessToken = result.accessToken
          this.userInfo = result.userInfo
          localStorage.setItem('accessToken', result.accessToken)
          alertStore.clear()
          return true
        }
      } catch (error) {
        alertStore.error(error)
      }
    },
    logout() {
      this.accessToken = null
      this.userInfo = null
      localStorage.removeItem('accessToken')
      router.push('/')
    },
    async retrieveUserInfo() {
      try {
        const res = await fetch(`${apiUrl}/auth/user-info/${this.accessToken}`)
        const result = await res.json()
        if (res.status === 200) {
          this.userInfo = result
        } else {
          this.logout()
        }
      } catch (error) {
        useAlertStore().error(error)
      }
    },
  }
})
