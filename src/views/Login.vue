<script setup>
import { ref } from 'vue'
import LoginForm from '../components/LoginForm.vue'
import useAuthStore from '@/stores/authStore'

const email = ref('admin@iansucode.com')
const password = ref('admin')
const authStore = useAuthStore()

const handleSubmit = async () => {
  await authStore.login(email, password)
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