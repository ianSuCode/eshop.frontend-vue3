<script setup>
import { storeToRefs } from 'pinia'
import useAuthStore from '../stores/authStore'

const { userInfo } = storeToRefs(useAuthStore())

</script>
<template>
  <div>
    <div>
      <label>Email</label>
      <p>{{ userInfo.email }}</p>
    </div>
    <div>
      <label>Roles</label>
      <p>{{ userInfo.roles.join(', ') }}</p>
    </div>
  </div>
</template>


<style lang="scss" scoped>
label {
  color: var(--vt-c-text-light-2);
}
p {
  color: var(--color-text);
  font-size: 1.2rem;
  margin-left: 1rem;
}
</style>