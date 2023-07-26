<script setup>
import { onMounted, computed } from 'vue'
import { RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Alert from './components/Alert.vue'
import useAuthStore from '@/stores/authStore'
import useCartStore from '@/stores/cartStore'

const authStore = useAuthStore()
const cartStore = useCartStore()
const isAdmin = computed(() => authStore.userInfo?.roles?.includes('Admin'))

const handleLogout = async () => {
  await authStore.logout()
}

onMounted(async () => {
  if (authStore.accessToken) {
    await authStore.retrieveUserInfo()
    await cartStore.retrieveItems()
  }
})
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
      <template v-if="authStore.accessToken">
        <template v-if="isAdmin">
          <span> | </span>
          <router-link to="/admin">Admin</router-link>
        </template>
        <span> | </span>
        <router-link to="/cart">
          <span>Cart</span>
          <span> ({{ cartStore.items.length }})</span>
        </router-link>
        <span> | </span>
        <button @click="handleLogout" class="link green">Logout</button>
      </template>
      <template v-else>
        <span> | </span>
        <router-link to="/user/signup">Signup</router-link>
        <span> | </span>
        <router-link to="/auth/login">Login</router-link>
      </template>
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
