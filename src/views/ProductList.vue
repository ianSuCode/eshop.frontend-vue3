<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useProductStore from '../stores/productStore'
import useCartStore from '../stores/cartStore'
import useAuthStore from '../stores/authStore'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const cartStore = useCartStore()
const authStore = useAuthStore()

const selectCategoryId = ref(null)
const categories = ref(null)
const products = ref(null)

const baseUrl = import.meta.env.VITE_API_URL
const apiUrl = `${baseUrl}/api`

onMounted(async () => {
  const res = await fetch(`${apiUrl}/category`)
  categories.value = await res.json()
})

watchEffect(async () => {
  selectCategoryId.value = route.query.categoryId
  const q = route.query.categoryId ? `?categoryId=${route.query.categoryId}` : ''
  const res = await fetch(`${apiUrl}/product${q}`)
  products.value = await res.json()
})

const handleClickProduct = (product) => {
  productStore.selected(product)
  router.push(`/product/${product.id}`)
}

const handleAddToCart = (product) => {
  cartStore.add(product)
}

</script>
<template>
  <div>
    <div>
      <router-link to="/product/list" :class="{ 'selected': !selectCategoryId }">All Categories</router-link>
      <template v-for="category in categories" :key="category.id">
        <span> | </span>
        <router-link :to="`/product/list?categoryId=${category.id}`"
          :class="{ 'selected': category.id === selectCategoryId }">{{ category.name }}</router-link>
      </template>
    </div>
    <div class="products">
      <div v-for="product in products" class="product-box">
        <div class="product-head">
          <button class="link green" @click="() => handleClickProduct(product)">
            <h2>{{ product.name }}</h2>
          </button>
        </div>
        <div class="product-body">
          <img :src="`${baseUrl}/${product.imageUrl}`" />
          <span>$ {{ product.price }}</span>
        </div>
        <div class="product-foot">
          <button v-if="authStore.accessToken" class="link green" @click="() => handleAddToCart(product)">Add to
            cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;

  >div.product-box {
    border: 1px solid var(--vt-c-text-dark-2);
    padding: 2px;

    img {
      width: 32px;
      height: 32px;
    }

    .product-foot {
      text-align: right;
    }


  }
}
</style>