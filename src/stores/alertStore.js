import { defineStore } from 'pinia'

export default defineStore('alert', {
  state: () => ({ alert: null }),
  actions: {
    success(message) {
      this.alert = { message, type: 'success' }
    },
    warning(message) {
      this.alert = { message, type: 'warning' }
    },
    error(message) {
      this.alert = { message, type: 'error' }
    },
    clear() {
      this.alert = null
    }
  }
})
