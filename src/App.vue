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
  // Check if authStore has an accessToken and retrieve user info if it exists.
  if (authStore.accessToken) await authStore.retrieveUserInfo()
  
  // If authStore still has an accessToken, retrieve cart items.
  // Note that authStore.retrieveUserInfo() may clear the token under certain conditions.
  if (authStore.accessToken) await cartStore.retrieveItems()
})
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" />
    <div class="wrapper">
      <HelloWorld msg="iansucode.eshop" />
    </div>
    <nav class="actions">
      <router-link to="/">Home</router-link>
      <router-link to="/product/list">Products</router-link>
      <template v-if="authStore.accessToken">
        <template v-if="isAdmin">
          <router-link to="/admin">Admin</router-link>
        </template>
        <router-link to="/cart">
          <span>Cart</span>
          <span> ({{ cartStore.items.length }})</span>
        </router-link>
        <router-link to="/account">Account</router-link>
        <a @click="handleLogout">Logout</a>
      </template>
      <template v-else>
        <router-link to="/user/signup">Signup</router-link>
        <router-link to="/auth/login">Login</router-link>
      </template>
    </nav>
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
