<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      created by Vite + Vue 3
    </h3>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

@media (max-width: 1024px) {
  .greetings {
    line-height: 0.6;

    h1 {
      font-size: 1.6rem;
    }

    h3 {
      font-size: 1rem;
    }
  }

}
</style>
