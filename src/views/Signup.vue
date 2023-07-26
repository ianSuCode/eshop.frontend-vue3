<script setup>
import { ref } from 'vue'
import LoginForm from '../components/LoginForm.vue'
import useAlertStore from '../stores/alertStore'

const email = ref()
const password = ref()
const alertStore = useAlertStore()
const url = `${import.meta.env.VITE_API_URL}/api/user`
const handleSubmit = async () => {
  const payload = { email: email.value, password: password.value }
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
  const result = await res.json()

  if (res.status === 201) {
    alertStore.success(`Created user(${email.value}) successful`)
  } else if (res.status !== 500) {
    alertStore.warning(result.message)
  }
}
</script>
<template>
  <div class="form">
    <h1>Signup</h1>
    <LoginForm v-model:email="email" v-model:password="password" @submit="handleSubmit" />
  </div>
</template>


<style lang="scss" scoped>
.form {
  background-color: var(--vt-c-indigo);

  &>h1 {
    text-align: center;
    color: var(--vt-c-text-dark-1);
  }
}
</style>