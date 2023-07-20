import { defineStore } from 'pinia'

export default defineStore('alert', {
  state: () => ({ alert: null }),
  actions: {
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
