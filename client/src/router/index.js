import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

Vue.use(VueRouter);

function OAuth(to, from, next) {
  if (store.state.Auth) {
    next();
  } else {
    next({ name: "Login" });
  }
}

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: { name: "Login" },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "@/views/Login"),
  },
  {
    path: "/main-menu",
    name: "MainMenu",
    component: () =>
      import(/* webpackChunkName: "MainMenu" */ "@/views/MainMenu"),
    beforeEnter: OAuth,
  },
  {
    path: "/clients",
    name: "Clients",
    component: () =>
      import(/* webpackChunkName: "Clients" */ "@/views/Clients"),
    beforeEnter: OAuth,
  },
  {
    path: "*",
    name: "404",
    component: () => import(/* webpackChunkName: "404" */ "@/views/Error-404"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
