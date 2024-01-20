// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/AuthStore'

const routes = [
  {
    path: '/admin',
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
      {
        path:'/profile/:id',
        name:'Profile',
        component: () => import('@/views/AdminProfile.vue'),
      }
    ],
  },

  {
    path:'/',
    redirect:'/index',
    component: () => import('@/layouts/customer/Customer.vue'),
    children: [
        {
          path: '/index',
          name: 'Index',
          component: () => import('@/views/customerPages/Index.vue'),
        },
        {
          path:'/product/:slug',
          name:'ProductView',
          component: () => import('@/views/customerPages/ProductView.vue')
        },
        {
          path:'/index/cart',
          name:'CartView',
          component:() => import('@/views/customerPages/CartView.vue')
        }
    ]
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
