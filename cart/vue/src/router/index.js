// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/AuthStore'

const routes = [
  {
    path: '',
    redirect:'/dashboard',
    component: () => import('@/layouts/admin/Admin.vue'),
    meta:{requiresAuth: true},
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import( '@/views/AdminPage.vue'),
      },
      {
        path: '/users',
        name: 'Users',
        component: () => import( '@/views/Users.vue'),
      },
      {
        path: '/categories',
        name: 'Categories',
        component: () => import('@/views/Categories.vue'),
      },
      {
        path: '/products',
        name: 'Products',
        component: () => import('@/views/Products.vue'),
      },
    ],
  },
  {
    path:'/adminlogin',
    meta: {isGuest: true},
    name:'AdminLogin',
    component: () => import('@/views/AdminLogin.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
 const authStore = useAuthStore()
  if( to.meta.requiresAuth && !authStore.$state.user.token ){
    next({name:'AdminLogin'})
  } else if(authStore.$state.user.token && (to.meta.isGuest)){
    next({name:'Dashboard'})
  } else {
    next()
  }

})

export default router
