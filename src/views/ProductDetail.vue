    
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import useProductStore from '../stores/productStore'
import useCartStore from '../stores/cartStore'
import useAuthStore from '../stores/authStore'

const route = useRoute()
const productStore = useProductStore()
const authSotre = useAuthStore()

const product = ref(productStore.product)

const baseUrl = import.meta.env.VITE_API_URL
const apiUrl = `${baseUrl}/api`

onMounted(async () => {
  if (!product.value) {
    const id = route.params.id
    console.log('fetch product: ' + id)
    const res = await fetch(`${apiUrl}/product/${id}`)
    product.value = await res.json()
  }
})

const handleAddToCart = (product) => {
  useCartStore().add(product)
}

</script>
<template>
  <div>
    <router-link to="../product/list">Product List</router-link>
    <div v-if="product">
      <h1>{{ product.name }}</h1>
      <p>{{ product.description }}</p>
      <span>$ {{ product.price }}</span>
      <div>
        <button v-if="authSotre.accessToken" @click="() => handleAddToCart(product)" class="link green">Add to cart</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>