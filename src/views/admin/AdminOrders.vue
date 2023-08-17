<script setup>
import { ref, onMounted } from 'vue'
import fetchHelper from '../../helpers/fetchHelper'

const orderGroups = ref(null)

onMounted(async () => {
  orderGroups.value = (await fetchHelper.get('admin/order'))
})

const dusplayDateTime = text => {
  return text.substring(0, 19).replaceAll('-', '/').replace('T', ' ')
}

const handleStateChange = async order => {
  const result = await fetchHelper.patch('admin/order/change-state', {id: order.id, state: order.state})
  order.updatedAt = result.updatedAt
}

const handleDelete = async (order, orderGroupindex, orderIndex) => {
  await fetchHelper.delete(`admin/order/${order.id}`)
  if (orderGroups.value[orderGroupindex].orders.length === 1) {
    orderGroups.value.splice(orderGroupindex, 1)
  } else {
    orderGroups.value[orderGroupindex].orders.splice(orderIndex, 1)
  }
}
</script>
<template>
  <div>
    <h2>Orders</h2>
    <table class="orders">
      <thead>
        <tr>
          <th>User</th>
          <th>Product</th>
          <th>Count</th>
          <th>Created time</th>
          <th>Updated time</th>
          <th>State</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(orderGroup, orderGroupindex) in orderGroups">
          <tr>
            <td :rowspan="orderGroup.orders.length + 1">{{ orderGroup.userEmail }}</td>
          </tr>
          <tr v-for="(order, orderIndex) in orderGroup.orders">
            <td>
              <span>{{ order.product.name }}</span>
              <br />
              <span>$ {{ order.product.price }}</span>
            </td>
            <td>{{ order.count }}</td>
            <td>{{ dusplayDateTime(order.createdAt) }}</td>
            <td>{{ dusplayDateTime(order.updatedAt) }}</td>
            <td>
              <select v-model="order.state" @change="() => handleStateChange(order)">
                <option value="new">new</option>
                <option value="processing">processing</option>
                <option value="shipping">shipping</option>
                <option value="done">done</option>
                <option value="done">cancel</option>
              </select>
            </td>
            <td><button @click="() => handleDelete(order, orderGroupindex, orderIndex)">Delete</button></td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>


<style lang="scss" scoped>
table,
th,
td {
  border: 1px solid;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
</style>