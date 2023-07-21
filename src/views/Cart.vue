<script setup>
import { computed } from 'vue'
import useCartStore from '@/stores/cartStore'

const cartStore = useCartStore()

const totalCost = computed(() => cartStore.items.reduce((total, current) => total + current.product.price * current.count, 0))

const hangleCountChange = (item, count) => {
  cartStore.changeCount(item, count)
}
</script>
<template>
  <div>
    <h1>Cart</h1>
    <div>
      <button @click="cartStore.clear()" class="link green">Clear All</button>
    </div>
    <div class="products">
      <div>
        <span>Name</span>
        <span>Price</span>
        <span>Count</span>
      </div>
      <div v-for="item in cartStore.items">
        <span>{{ item.product.name }}</span>
        <span>{{ item.product.price }}</span>
        <div>
          <input type="number" :value="item.count" min="0"
            @change="(event) => hangleCountChange(item, +event.target.value)" />
        </div>
      </div>
      <div>
        <span>Total Cost: {{ totalCost }}</span>
      </div>
    </div>

  </div>
</template>


<style lang="scss" scoped>
.products {
  &>* {
    width: 100%;
    display: flex;

    &:first-child {
      border-bottom: 1px solid var(--vt-c-indigo);
    }

    &> :first-child {
      flex: 1 1 60%;
    }

    &> :nth-child(2) {
      width: 20%;
    }

    &> :last-child {
      width: 20%;

      &>input[type=number] {
        width: 3rem;
      }
    }

    &:last-child {
      margin-top: 2px;
      border-top: 1px solid var(--vt-c-indigo);
      text-align: right;
    }
  }
}
</style>