import { defineStore } from 'pinia'

export default defineStore('product', {
  state: () => ({ product: null }),
  actions: {
    memo(product) {
      this.product = product
    }
  }
})
