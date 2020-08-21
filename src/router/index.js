import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';

Vue.use(VueRouter);

function OAuth(to, from, next) {
  if (store.state.isAuthenticated) {
    next();
  } else {
    next({ name: 'login' });
  }
}

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login-form.vue')
  },
  {
    path: '/main-menu',
    name: 'main-menu',
    component: () => import('../views/main-menu.vue'),
    beforeEnter: OAuth
  },
  {
    path: '/clients',
    name: 'clients',
    component: () => import('../views/client-form.vue'),
    beforeEnter: OAuth
  },
  {
    path: '/meals-on-wheels',
    name: 'meals-on-wheels',
    component: () => import('../views/meals-on-wheels.vue'),
    beforeEnter: OAuth
  }
];

const router = new VueRouter({
  routes
});

export default router;
