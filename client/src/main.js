import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import icons from "./icons";
import notifications from "./notifications";
Vue.config.productionTip = false;

axios.defaults.baseURL = "http://localhost:5000/api/";
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  icons,
  notifications,
  render: (h) => h(App),
}).$mount("#app");
