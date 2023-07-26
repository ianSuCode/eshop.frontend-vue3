import { defineStore } from 'pinia'

import fetchHelper from '../helpers/fetchHelper'

export default defineStore('cart', {
  state: () => ({ items: [] }),
  actions: {
    async retrieveItems() {
      this.items = await fetchHelper.get('cart')
    },
    async add(product) {
      const itemIndex = this.items.findIndex(
        (item) => item.product.id === product.id
      )
      let count = 1
      if (itemIndex !== -1) {
        const item = this.items[itemIndex]
        count += item.count
        this.items.splice(itemIndex, 1, { ...item, count })
      } else {
        this.items.push({ product, count })
      }
      await fetchHelper.post('cart', { productId: product.id, count })
    },
    async changeCount(oldItem, count) {
      const itemIndex = this.items.findIndex(
        (item) => item.product.id === oldItem.product.id
      )
      if (count > 0) {
        const item = this.items[itemIndex]
        this.items.splice(itemIndex, 1, { ...item, count: count })

        await fetchHelper.post('cart', { productId: item.product.id, count })
      } else {
        this.items.splice(itemIndex, 1)
        await fetchHelper.delete(`cart/remove-product/${oldItem.product.id}`)
      }
    },
    async clear() {
      await fetchHelper.delete('cart/clear')
      this.items = []
    }
  }
})
