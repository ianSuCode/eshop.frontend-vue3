<script setup>
import { RouterView } from 'vue-router'
</script>
<template>
  <div>
    <h1>Admin</h1>
    <nav>
      <router-link to="/admin/users">Users</router-link>
    </nav>
    <RouterView />
  </div>
</template>


<style lang="scss" scoped></style>