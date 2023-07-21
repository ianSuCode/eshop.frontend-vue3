import { defineStore } from 'pinia'
import { router } from '@/router'

import useAlertStore from '@/stores/alertStore'

const apiUrl = `${import.meta.env.VITE_API_URL}/api`

export default defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken'),
    userInfo: null
  }),
  actions: {
    async login(email, password) {
      try {
        const option = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.value, password: password.value })
        }
        const res = await fetch(`${apiUrl}/auth/login`, option)
        const result = await res.json()

        if (res.status !== 200) {
          const alertStore = useAlertStore()
          alertStore.warning(result.message)
        } else {
          this.accessToken = result.accessToken
          this.userInfo = result.userInfo
          localStorage.setItem('accessToken', result.accessToken)
          router.push('/')
        }
      } catch (error) {
        const alertStore = useAlertStore()
        alertStore.error(error)
      }
    },
    logout() {
      this.accessToken = null
      this.userInfo = null
      localStorage.removeItem('accessToken')
    },
    async retrieveUserInfo() {
      try {
        const res = await fetch(
          `${apiUrl}/auth/user-info/${this.accessToken}`
        )
        const result = await res.json()

        if (res.status !== 200) {
          const alertStore = useAlertStore()
          alertStore.warning(result.message)
        } else {
          this.userInfo = result.userInfo
        }
      } catch (error) {
        const alertStore = useAlertStore()
        alertStore.error(error)
      }
    }
  }
})
