<script setup>
import { ref, computed } from 'vue'
import useCartStore from '../stores/cartStore'
import fetchHelper from '../helpers/fetchHelper'

const checkedProductIds = ref([])

const cartStore = useCartStore()

const totalCost = computed(() => {
  const selectedItems = cartStore.items.filter(it => checkedProductIds.value.includes(it.product.id))
  return selectedItems.reduce((total, current) => total + current.product.price * current.count, 0)
})

const handleCountChange = (item, count) => {
  cartStore.changeCount(item, count)
  if (count === 0 && checkedProductIds.value.indexOf(item.product.id) !== -1) { 
    // remove selected item
    checkedProductIds.value = checkedProductIds.value.filter(it => it !== item.product.id)
  }
}

const handleClearAll = () => {
  cartStore.clear()
  checkedProductIds.value = []
}

const handleCheckout = async () => {
  if (checkedProductIds.value.length > 0) {
    await fetchHelper.post('order', checkedProductIds.value)
    cartStore.items = cartStore.items.filter(it => !checkedProductIds.value.includes(it.product.id))
    checkedProductIds.value = []
  }
}

</script>
<template>
  <div>
    <h1>Cart</h1>
    <div>
      <button @click="handleClearAll" class="link green">Clear All</button>
      <span> | </span>
      <button @click="handleCheckout" class="link green">Check out ({{ checkedProductIds.length }})</button>
    </div>
    <div class="products">
      <div>
        <div></div>
        <span>Name</span>
        <span>Price</span>
        <span>Count</span>
      </div>
      <div v-for="item in cartStore.items" :key="item.id">
        <div>
          <input type="checkbox" :value="item.product.id" v-model="checkedProductIds"/>
        </div>
        <div>
          <router-link :to="`/product/${item.product.id}`">{{ item.product.name }}</router-link>
        </div>
        <span>{{ item.product.price }}</span>
        <div>
          <input type="number" :value="item.count" min="0"
            @change="(event) => handleCountChange(item, +event.target.value)" />
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

    // header
    &:first-child {
      
      border-bottom: 1px solid var(--vt-c-indigo);
    }

    &>* {
      &:first-child {
        flex: 1rem;
      }
      &:nth-child(2) {
        flex: 1 1 50%;
      }

      &:nth-child(3) {
        width: 20%;
      }

      &:last-child {
        width: 20%;

        &>input[type=number] {
          width: 3rem;
        }
      }
    }

    // footer
    &:last-child { 
      margin-top: 2px;
      border-top: 1px solid var(--vt-c-indigo);
      text-align: right;
    }
  }
}
</style>