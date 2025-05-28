import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const routes = [
  { 
    path: '/', 
    component: () => import('@/pages/stub/Home.vue'), 
    meta: { requiresAuth: true } 
  },

  { 
    path: '/shop', 
    component: () => import('@/pages/stub/Shop.vue'), 
    meta: { requiresAuth: true } 
  },
  {
    path: '/payments',
    component: () => import('@/pages/stub/Payments.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/recipes',
    component: () => import('@/pages/Recipes.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/plans',
    component: () => import('@/pages/stub/Plans.vue'),
    meta: { requiresAuth: true },
  },
  { path: '/chat', component: () => import('@/pages/stub/Chat.vue'), meta: { requiresAuth: true } },
  {
    path: '/settings',
    component: () => import('@/pages/stub/Settings.vue'),
    meta: { requiresAuth: true },
  },

  { path: '/login', component: () => import('@/pages/Login.vue'), meta: { hideAside: true } },
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
    return '/recipes'
  }
})

export default router
