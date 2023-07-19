    
<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRoute } from 'vue-router'
import useProductStore from '@/stores/productStore'

const route = useRoute()
const productStore = useProductStore()
const product = ref(productStore.product)

const apiUrl = inject('webConfig')?.['apiUrl']
const imgUrl = apiUrl.replace('api', '')

onMounted(async () => {
  if (!product.value) {
    const id = route.params.id
    console.log('fetch product: ' + id)
    const res = await fetch(`${apiUrl}/product/${id}`)
    product.value = await res.json()
  }
})

</script>
<template>
  <div>
    <router-link to="../product/list">Product List</router-link>
    <div v-if="product">
      <h1>{{ product.name }}</h1>
      <img :src="imgUrl + product.imageUrl" />
      <p>{{ product.description }}</p>
      <span>$ {{ product.price }}</span>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>