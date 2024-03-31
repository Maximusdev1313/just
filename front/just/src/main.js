import { createApp } from 'vue'
import { createPinia } from 'pinia' // import Pinia
import App from './App.vue'
import router from './routes'
import VueApexCharts from "vue3-apexcharts"

const app = createApp(App)


const pinia = createPinia() // create a Pinia instance
app.use(VueApexCharts)
app.use(pinia) // use Pinia as a plugin
app.use(router)

app.mount('#app')