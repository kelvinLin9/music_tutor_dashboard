import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/music_tutor_dashboard/'),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import("../views/Home.vue"),
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../views/Dashboard.vue')
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('../views/User.vue')
        },
        {
          path: '/course',
          name: 'course',
          component: () => import('../views/Course.vue')
        },
        {
          path: '/order',
          name: 'order',
          component: () => import('../views/Order.vue')
        },
        {
          path: '/coupon',
          name: 'coupon',
          component: () => import('../views/Coupon.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/google/callback',
      name: 'googleCallback',
      component: () => import('../views/Callback.vue')
    }
  ]
})

export default router
