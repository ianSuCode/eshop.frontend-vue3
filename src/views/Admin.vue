<script setup>
import { RouterView } from 'vue-router'
</script>
<template>
  <div>
    <h1>Admin</h1>
    <nav>
      <router-link to="/admin/users">Users</router-link>
      <span> | </span>
      <router-link to="/admin/orders">Orders</router-link>
    </nav>
    <RouterView />
  </div>
</template>


<style lang="scss" scoped>
nav {
  border-bottom: 1px solid var(--vt-c-text-light-2);
}
</style>