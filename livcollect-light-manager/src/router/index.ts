import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';
import ResetPassword from '@/components/ResetPassword.vue';
import Orders from '@/components/Orders.vue';

const routes = [
  {
    path: '/',
    redirect: '/auth/signin',
  },
  {
    path: '/auth/signin',
    name: 'Signin',
    component: Login,
  },
  {
    path: '/auth/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
