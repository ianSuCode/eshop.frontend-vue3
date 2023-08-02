<script setup>
import { ref, onMounted } from 'vue'
import fetchHelper from '../helpers/fetchHelper'

const orders = ref(null)

onMounted(async () => {
  orders.value = (await fetchHelper.get('order'))
})

const dusplayDateTime = text => {
  return text.substring(0, 19).replaceAll('-', '/').replace('T', ' ')
}
</script>
<template>
  <div>
    <h2>Orders</h2>
    <table class="orders">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Count</th>
          <th>Created time</th>
          <th>Updated time</th>
          <th>State</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders">
          <td>
            <router-link :to="`/product/${order.productId}`">{{ order.product.name }}</router-link>
          </td>
          <td>{{ order.product.price }}</td>
          <td>{{ order.count }}</td>
          <td>{{ dusplayDateTime(order.createdAt) }}</td>
          <td>{{ dusplayDateTime(order.updatedAt) }}</td>
          <td>{{ order.state }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<style lang="scss" scoped>
.orders {
  width: 100%;
  text-align: left;

  thead {
    border-bottom: 1px solid var(--vt-c-indigo)
  }

}
</style>