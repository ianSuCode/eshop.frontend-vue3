import { defineStore } from 'pinia'
import { router } from '@/router'

import useAlertStore from '@/stores/alertStore'

const apiUrl = `${import.meta.env.VITE_API_URL}/api`

export default defineStore('auth', {
  state: () => ({
    accessToken: null,
    userInfo: null
  }),
  actions: {
    async login(email, password) {
      try {
        const option = {
          method: 'POST',
          credentials: 'include', // make browser send cookies to server or save cookies
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
          router.push('/')
        }
      } catch (error) {
        const alertStore = useAlertStore()
        alertStore.error(error)
      }
    },
    async logout() {
      this.accessToken = null
      this.userInfo = null
      await fetch(`${apiUrl}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      })
    }
  }
})
