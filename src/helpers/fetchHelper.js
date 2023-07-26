import useAuthStore from '../stores/authStore'

const apiUrl = `${import.meta.env.VITE_API_URL}/api`

const getBearer = () => {
  const authStore = useAuthStore()
  return `Bearer ${authStore.accessToken}`
}

const getFetchOption = (method, payload) => {
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getBearer()
    },
    body: JSON.stringify(payload)
  }
}

export default {
  async get(path) {
    const res = await fetch(`${apiUrl}/${path}`, {
      headers: { Authorization: getBearer() }
    })
    return await res.json()
  },
  async post(path, payload) {
    const res = await fetch(
      `${apiUrl}/${path}`,
      getFetchOption('POST', payload)
    )
    return await res.json()
  },
  async delete(path) {
    await fetch(`${apiUrl}/${path}`, {
      method: 'DELETE',
      headers: { Authorization: getBearer() }
    })
  }
}
