<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useProductStore from '@/stores/productStore'

const route = useRoute()
const router = useRouter()
const { selected } = useProductStore()

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
});

const handleClickProduct = (product) => {
  selected(product)
  router.push(`/product/${product.id}`)
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
      <div v-for="product in products">
        <div>
          <button class="link green" @click="() => handleClickProduct(product)">
            <h2>{{ product.name }}</h2>
          </button>
        </div>
        <div>
          <img :src="`${baseUrl}/${product.imageUrl}`" />
          <span>$ {{ product.price }}</span>
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

  >div {
    border: 1px solid var(--vt-c-text-dark-2);

    img {
      width: 32px;
      height: 32px;
    }

  }
}
</style>