import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
const Home = () => import('./pages/home/Home.page.vue');
const Product = () => import('./pages/product/Product.page.vue');

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/product/:id',
    component: Product,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;