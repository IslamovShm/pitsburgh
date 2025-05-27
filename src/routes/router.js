import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/pages/Main.vue'
import Login from '@/pages/Login.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    component: Main,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    component: Login,
    meta: { hideAside: true },
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

router.beforeEach((to) => {
  const isAuth = store.getters['auth/isAuth']
  
  if (to.meta.requiresAuth && !isAuth) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  if (isAuth && to.path === '/login') {
    return '/'
  }
})

export default router
