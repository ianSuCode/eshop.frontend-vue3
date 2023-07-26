<script setup>
import { storeToRefs } from 'pinia'
import useAlertStore from '../stores/alertStore'

const alertStore = useAlertStore()
const { alert } = storeToRefs(alertStore)
</script>
<template>
  <div v-if="alert" class="alert">
    <div>
      <span><span class="type" :class="alert.type">[{{ alert.type }}]</span> {{ alert.message }}</span>
    </div>
    <button @click="alertStore.clear()" class="link">X</button>
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

    .type.success {
      color: var(--main-green)
    }

    .type.warning {
      color: var(--main-yellow)
    }

    .type.error {
      color: var(--main-error)
    }
  }

  button {
    color: var(--vt-c-text-dark-2)
  }
}
</style>