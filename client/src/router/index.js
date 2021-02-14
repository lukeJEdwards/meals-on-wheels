import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

function OAuth(to, from, next) {
  if (store.state.OAuth) {
    next();
  } else {
    next({ name: "Login" });
  }
}

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login")
  },
  {
    path: "/weeks",
    name: "Weeks",
    component: () => import("@/views/Week"),
    beforeEnter: OAuth
  },
  {
    path: "/delivery",
    name: "Delivery",
    component: () => import("@/views/Delivery"),
    beforeEnter: OAuth
  },
  {
    path: "/clients",
    name: "Clients",
    component: () => import("@/views/Clients"),
    beforeEnter: OAuth
  }
];

const router = new VueRouter({
  mode: "history",
  linkExactActiveClass: "is-active",
  routes
});

export default router;
