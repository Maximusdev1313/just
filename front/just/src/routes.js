// import HelloWorld from './components/HelloWorld.vue'
import IndexPage from './pages/IndexPage.vue'
import ReportPage from './pages/ReportPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  { path: '/', component: IndexPage },
  { path: '/report', component: ReportPage },
]
// 3. Create the router instance and pass the `routes` configuration
// You can pass in additional options here, but let's keep it simple for now.
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router

