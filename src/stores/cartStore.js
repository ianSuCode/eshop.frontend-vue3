import { defineStore } from 'pinia'
import useAlertStore from '../stores/alertStore'
import fetchHelper from '../helpers/fetchHelper'

export default defineStore('cart', {
  state: () => ({ items: [] }),
  actions: {
    async retrieveItems() {
      this.items = await fetchHelper.get('cart')
    },
    async add(product) {
      const alertStore = useAlertStore()
      try {
        const itemIndex = this.items.findIndex(item => item.product.id === product.id)
        const count = itemIndex === -1 ? 1 : this.items[itemIndex].count + 1
        await fetchHelper.post('cart', { productId: product.id, count })
        alertStore.success(`${product.name} added successfully`)

        if (itemIndex === -1) {
          this.items.push({ product, count })
        } else {
          this.items[itemIndex].count = count
        }

      } catch (error) {
        alertStore.error(error)
      }
    },
    async changeCount(oldItem, count) {
      const itemIndex = this.items.findIndex(item => item.product.id === oldItem.product.id)
      if (count > 0) {
        await fetchHelper.post('cart', { productId: oldItem.product.id, count })
        this.items[itemIndex].count = count
      } else {
        await fetchHelper.delete(`cart/remove/${oldItem.product.id}`)
        this.items.splice(itemIndex, 1)
      }
    },
    async clear() {
      await fetchHelper.delete('cart/clear')
      this.items = []
    }
  }
})
