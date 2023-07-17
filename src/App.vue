<script setup>

import { RouterView, useRouter, useRoute } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" />

    <div class="wrapper">
      <HelloWorld msg="iansucode.eshop" />
    </div>
    <div class="actions">
      <a href="#">Login</a>
      <a href="#">Logout</a>
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
  width: 120px;
  height: 120px;
}

@media (max-width: 1024px) {
  .logo {
    width: 60px;
    height: 60px;
  }
}
</style>
