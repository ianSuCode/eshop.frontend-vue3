<script setup>
import { inject } from 'vue'
import { RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'

import HelloWorld from './components/HelloWorld.vue'
import Alert from './components/Alert.vue'
import useAuthStore from '@/stores/authStore'

const apiUrl = inject('webConfig')?.['apiUrl']

const { accessToken, userInfo } = storeToRefs(useAuthStore())

const handleLogout = async () => {
  accessToken.value = null
  userInfo.value = null
  await fetch(`${apiUrl}/auth/logout`, { method: 'POST', credentials: 'include' })
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" />
    <div class="wrapper">
      <HelloWorld msg="iansucode.eshop" />
    </div>
    <div class="actions">
      <router-link to="/">Home</router-link>
      <span> | </span>
      <router-link to="/product/list">Products</router-link>
      <span> | </span>
      <router-link to="/auth/login" v-if="!accessToken">Login</router-link>
      <button v-if="accessToken" @click="handleLogout" class="link green">Logout</button>
    </div>
    <Alert />
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style lang="scss" scoped>
header {
  line-height: 1.5;
  display: flex;
  place-items: center;
  position: relative;

  .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .actions {
    margin-left: auto;
  }
}

.logo {
  width: 100px;
  height: 100px;
}

@media (max-width: 1024px) {
  .logo {
    width: 46px;
    height: 46px;
  }
}
</style>
