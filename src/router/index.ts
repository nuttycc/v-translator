import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TranslatorView from '@/views/TranslatorView.vue'
import SettingsView from '../views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/translator',
      name: 'translator',
      component: TranslatorView,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    }
  ],
})

// router.beforeEach(async (to, from) => {
//   if (to.name !== 'translator') {
//     return {name: 'translator'}
//   }
// })

export default router
