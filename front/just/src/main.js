import { createApp } from 'vue'
import { createPinia } from 'pinia' // import Pinia
import App from './App.vue'
import router from './routes'


const app = createApp(App)

const pinia = createPinia() // create a Pinia instance

app.use(pinia) // use Pinia as a plugin
app.use(router)
app.mount('#app')