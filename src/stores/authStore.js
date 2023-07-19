import { defineStore } from 'pinia'

export default defineStore('auth', {
  state: () => ({
    accessToken: null,
    userInfo: null
  }),
})
