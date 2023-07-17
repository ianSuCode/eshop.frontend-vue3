<script setup>
import { ref, onMounted, inject } from 'vue'

const categories = ref(null)

onMounted(async () => {
  const apiUrl = inject('webConfig')?.['apiUrl']
  const res = await fetch(`${apiUrl}/category`)
  categories.value = await res.json()
})
</script>
<template>
  <div>
    <div>
      <div v-for="category in categories">
        <div>{{ category.name }}</div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>