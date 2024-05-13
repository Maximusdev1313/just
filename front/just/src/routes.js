// import HelloWorld from './components/HelloWorld.vue'
import IndexPage from './pages/IndexPage.vue'
import OrdersPage from './pages/OrdersPage.vue'
import ReportPage from './pages/ReportPage.vue'
import AuthPage from './pages/AuthPage.vue'
import AddProductPage from './pages/AddProduct.vue'
import NotAdded from './pages/NotAdded.vue'
import changeCheck from './pages/ChangeCheck.vue'
import AdminPage from './pages/AdminPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import VueCookies from 'vue-cookies'
const routes = [
  { path: '/', component: IndexPage },
  { path: '/orders', component: OrdersPage },
  { path: '/report', component: ReportPage },
  { path: '/auth', component: AuthPage },
  { path: '/addproduct', component: AddProductPage },
  { path: '/notadded', component: NotAdded },
  { path: '/changeCheck', component: changeCheck },
  { path: '/admin', component: AdminPage, meta: { requiresRole: 'owner' } },
]
// 3. Create the router instance and pass the `routes` configuration
// You can pass in additional options here, but let's keep it simple for now.
const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  const user = VueCookies.get('user') // replace 'userRole' with the actual cookie name
  if (user) { // Check if user is logged in
    if (to.meta.requiresRole && user.role !== to.meta.requiresRole) {
      if (user.role === 'worker') {
        next('/')
      } else {
        next('/auth') // or any other default path
      }
    } else {
      next()
    }
  } else {
    if (to.path === '/auth') {
      next(); // Allow unauthenticated users to access /auth
    } else {
      next('/auth'); // Redirect to /auth if user is not logged in
    }
  }
})


export default router

