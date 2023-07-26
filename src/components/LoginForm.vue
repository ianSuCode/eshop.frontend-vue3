<script setup>
const props = defineProps(['title', 'email', 'password'])
const emit = defineEmits(['update:email', 'update:password', 'submit'])

const handleSumbit = () => {
  if (props.email && props.password) {
    emit('submit')
  }
}
</script>
<template>
  <div class="back">
    <div class="form">
      <div>
        <p class="title">{{ title }}</p>
        <div class="field">
          <label for="email">Email</label>
          <input id="email" name="email" :value="props.email" @input="$emit('update:email', $event.target.value)"
            :class="{ red: !props.email }">
        </div>
        <div class="field">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" :value="props.password"
            @input="$emit('update:password', $event.target.value)" :class="{ red: !props.password }" />
        </div>
        <div class="actions">
          <button class="link" :class="{ green: props.email && props.password }" @click="handleSumbit"
            :disabled="!(props.email && props.password)">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.back {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  &>* {
    flex-basis: 600px;

    border: 1px solid var(--vt-c-text-dark-2);
    border-radius: .4rem;
    background-color: var(--vt-c-white-soft);
    padding: 1rem;

    .actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 12px;
    }
  }
}

.form {
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