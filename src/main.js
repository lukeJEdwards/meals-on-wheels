import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import './icons/index';
import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.1.140:3000/api';
Vue.prototype.$http = axios;

Vue.config.productionTip = false;
Vue.use(VueToast);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
