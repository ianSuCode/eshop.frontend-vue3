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

const checkResponse = (res) => {
  if (res.status >= 400)
    throw Error(`${res.status} ${res.url} ${res.statusText}`)
}

export default {
  async get(path) {
    const res = await fetch(`${apiUrl}/${path}`, {
      headers: { Authorization: getBearer() }
    })
    checkResponse(res)
    return await res.json()
  },
  async post(path, payload) {
    const res = await fetch(
      `${apiUrl}/${path}`,
      getFetchOption('POST', payload)
    )
    checkResponse(res)
    return await res.json()
  },
  async patch(path, payload) {
    const res = await fetch(
      `${apiUrl}/${path}`,
      getFetchOption('PATCH', payload)
    )
    checkResponse(res)
    return await res.json()
  },
  async delete(path, payload) {
    const res = await fetch(
      `${apiUrl}/${path}`,
      getFetchOption('DELETE', payload)
    )
    checkResponse(res)
    return await res.json()
  }
}
