<script setup>

</script>
<template>
  <div>
    <h1>Account</h1>
    <nav>
      <router-link to="/account/profile">Profile</router-link>
      <span> | </span>
      <router-link to="/account/orders">Orders</router-link>
    </nav>
    <RouterView />
  </div>
</template>


<style lang="scss" scoped>
nav {
  border-bottom: 1px solid var(--vt-c-text-light-2);
}
</style>