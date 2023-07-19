<script setup>
import { storeToRefs } from 'pinia'
import useAlertStore from '@/stores/alertStore'

const { alert } = storeToRefs(useAlertStore())
</script>
<template>
  <div v-if="alert" class="alert">
    <p>{{ alert.message }}</p>
    <button @click="() => alert = null" class="link">X</button>
  </div>
</template>


<style lang="scss" scoped>
.alert {
  background-color: var(--vt-c-indigo);
  color: var(--vt-c-text-dark-1);
  border: 1px solid var(--vt-c-black-mute);
  border-radius: 4px;
  padding: calc(var(--section-gap) / 10);
  position: absolute;
  width: 100%;
  display: flex;

  &> :first-child {
    flex: 1;
  }

  button {
    color: var(--vt-c-text-dark-2)
  }
}
</style>