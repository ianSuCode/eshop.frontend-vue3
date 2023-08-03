<script setup>
import { ref, onMounted } from 'vue'
import useAlertStore from '../../stores/alertStore'
import fetchHelper from '../../helpers/fetchHelper'
const users = ref([])
const alertStore = useAlertStore()

const dusplayDateTime = text => {
  return text.substring(0, 19).replaceAll('-', '/').replace('T', ' ')
}

onMounted(async () => {
  users.value = await fetchHelper.get('admin/user')
})
const handleDeleteUser = async user => {
  try {
    await fetchHelper.delete(`admin/user/${user.id}`)
    users.value = users.value.filter(it => it.id !== user.id)
  } catch (error) {
    alertStore.error(error)
  }
}

const handleAcitveChange = async user => {
  try {
    await fetchHelper.patch('admin/user/active', { id: user.id, active: !user.active })
    user.active = !user.active
  } catch (error) {
    alertStore.error(error)
  }
}
</script>
<template>
  <div>
    <h3>Users</h3>
    <table>
      <tr>
        <td>Email</td>
        <td>Roles</td>
        <td>Created At</td>
        <td>Active</td>
        <td>Orders</td>
        <td></td>
      </tr>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.email }}</td>
        <td>{{ user.roles.join(',') }}</td>
        <td>{{ dusplayDateTime(user.createdAt) }}</td>
        <td>
          <div class="switch-container">
            <input type="checkbox" :id="`toggle-switch-${user.id}`" class="toggle-input" :checked="user.active"
              @change="() => handleAcitveChange(user)" />
            <label :for="`toggle-switch-${user.id}`" class="toggle-label"></label>
          </div>
        </td>
        <td>
          <ul>
            <li v-for="order in user.orders">{{ order.id.substring(0, 6) + '... ' }} [{{ order.state }}]</li>
          </ul>
        </td>
        <td><button @click="() => handleDeleteUser(user)">Delete</button></td>
      </tr>
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
}

ul {
  list-style: none;
  padding: 0;
}

/* Style for the container */
.switch-container {
  position: relative;
  width: 36px;
  height: 18px;
}

/* Style for the input checkbox */
.toggle-input {
  position: absolute;
  opacity: 0;
}

/* Style for the switch button */
.toggle-label {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ccc;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

/* Style for the sliding animation when switched on */
.toggle-input:checked+.toggle-label {
  background-color: var(--main-green);
}

/* Style for the circular button inside the switch */
.toggle-label::after {
  content: '';
  position: absolute;
  top: 1px;
  left: 1px;
  width: 16px;
  height: 16px;
  background-color: #fff;
  border-radius: 50%;
  transition: transform 0.2s ease;
}

/* Style for the sliding animation when switched on */
.toggle-input:checked+.toggle-label::after {
  transform: translateX(17px);
}

.toggle-label {
  display: flex;
}
</style>