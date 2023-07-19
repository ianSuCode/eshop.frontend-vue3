import { defineStore } from 'pinia'

export default defineStore('alert', {
  state: () => ({ alert: null }),
  actions: {
    warn(message) {
      this.alert = { message, type: 'warn' }
    }
  }
})
