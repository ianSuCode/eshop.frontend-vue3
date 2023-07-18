<script setup>

import { RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'


const handleClickLogin = () => {
  alert('working on it')
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
      <button class="link-btn green" @click="handleClickLogin"><span>Login</span></button>
    </div>
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
