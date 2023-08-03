<script setup>
import { ref } from 'vue'
import LoginForm from '../components/LoginForm.vue'
import useAuthStore from '../stores/authStore'
import useCartStore from '../stores/cartStore'
import { router } from '../router'

const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const cartStore = useCartStore()

const handleSubmit = async () => {
  const isSuccess = await authStore.login(email, password)
  if (isSuccess) {
    await cartStore.retrieveItems()
    router.push('/')
  }
}
</script>
<template>
  <div>
    <LoginForm title="Login" v-model:email="email" v-model:password="password" @submit="handleSubmit" />
  </div>
</template>


<style lang="scss" scoped></style>