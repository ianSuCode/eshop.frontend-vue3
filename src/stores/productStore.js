import { defineStore } from 'pinia'

export default defineStore('product', {
  state: () => ({ product: null }),
  actions: {
    selected(product) {
      this.product = product
    }
  }
})
