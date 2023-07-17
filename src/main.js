import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

const init = async () => {
  try {
    document.getElementById('app').innerHTML = '<span>Loading...</span>' // Vue 3 will replace this when app.mount('#app') is run.
    // web-config.json
    const webConfigUrl = './web-config.json'
    const resWebConfig = await fetch(webConfigUrl)
    if (resWebConfig.status === 404) throw Error(`${webConfigUrl} is missing!`)
    const webConfig = await resWebConfig.json()
    console.log('webConfig', webConfig)
    app.provide('webConfig', webConfig)

    // rest api
    const helloUrl = webConfig.apiUrl + '/hello'
    const resHello = await fetch(helloUrl)
    if (resHello.status === 500 || resHello.status === 404)
      throw Error(`${helloUrl} ${resHello.status}!`)
    const hello = await resHello.json()
    console.log('hello', hello)

    app.use(router)
    app.mount('#app')
  } catch (error) {
    document.getElementById('app').innerHTML = '<h1>Error</h1>' + error.message
  }
}

init()