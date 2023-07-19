<script setup>
import { ref, inject } from 'vue'
import { storeToRefs } from 'pinia'
import LoginForm from '../components/LoginForm.vue'
import useAlertStore from '@/stores/alertStore'
import useAuthStore from '@/stores/authStore'

const email = ref('admin@iansucode.com')
const password = ref('admin')

const apiUrl = inject('webConfig')?.['apiUrl']
const { warn } = useAlertStore()
const { accessToken, userInfo } = storeToRefs(useAuthStore())

const handleSubmit = async () => {
  const option = {
    method: 'POST',
    credentials: 'include', // make browser send cookies to server or save cookies
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.value, password: password.value }),
  }
  const res = await fetch(`${apiUrl}/auth/login`, option)
  const result = await res.json()

  if (res.status !== 200) {
    warn(result.message)
  }
  else {
    accessToken.value = result.accessToken
    userInfo.value = result.userInfo
  }
}
</script>
<template>
  <div>
    <div class="back">
      <div>
        <LoginForm title="Login" v-model:email="email" v-model:password="password" />
        <div class="actions">
          <button class="link green" @click="handleSubmit">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.back {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  &>* {
    flex-basis: 600px;

    border: 1px solid var(--vt-c-text-dark-2);
    border-radius: .4rem;
    background-color: var(--vt-c-white-soft);
    padding: 1rem;

    .actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 12px;
    }
  }
}
</style>