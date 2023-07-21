import { defineStore } from 'pinia'

import useAuthStore from '../stores/authStore'

const apiUrl = `${import.meta.env.VITE_API_URL}/api`

const getBearer = () => {
  const authStore = useAuthStore()
  return `Bearer ${authStore.accessToken}`
}

const getFetchOption = (method, payload) => {
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getBearer()
    },
    body: JSON.stringify(payload)
  }
}

export default defineStore('cart', {
  state: () => ({ items: [] }),
  actions: {
    async retrieveItems() {
      const res = await fetch(`${apiUrl}/cart`, {
        headers: { Authorization: getBearer() }
      })
      const result = await res.json()
      this.items = result
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
      await fetch(
        `${apiUrl}/cart`,
        getFetchOption('POST', { productId: product.id, count })
      )
    },
    async changeCount(oldItem, count) {
      const itemIndex = this.items.findIndex(
        (item) => item.product.id === oldItem.product.id
      )
      if (count > 0) {
        const item = this.items[itemIndex]
        this.items.splice(itemIndex, 1, { ...item, count: count })

        await fetch(
          `${apiUrl}/cart`,
          getFetchOption('POST', { productId: item.product.id, count })
        )
      } else {
        this.items.splice(itemIndex, 1)

        await fetch(`${apiUrl}/cart/remove-product/${oldItem.product.id}`, {
          method: 'DELETE',
          headers: { Authorization: getBearer() }
        })
      }
    },
    clear() {
      this.items = []
    }
  }
})
