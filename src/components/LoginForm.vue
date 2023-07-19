<script setup>
const props = defineProps(['title', 'email', 'password'])
const emit = defineEmits(['update:email', 'update:password'])
</script>
<template>
  <form>
    <p class="title">{{ title }}</p>
    <div class="field">
      <label for="email">Email</label>
      <input id="email" name="email" :value="props.email" @input="$emit('update:email', $event.target.value)">
    </div>
    <div class="field">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" :value="props.password"
        @input="$emit('update:password', $event.target.value)" />
    </div>
  </form>
</template>

<style lang="scss" scoped>
form {
  p.title {
    text-align: center;
    font-weight: bold;
    font-size: 1.6rem;
    color: var(--vt-c-indigo);
  }

  .field {
    label {
      display: block;
    }

    input {
      width: 100%;
      border-radius: 4px;
      height: 2rem;
      font-size: 1.2rem;
      padding: 0 4px;
    }
  }
}
</style>