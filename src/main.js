import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import './icons/index';
import axios from 'axios';
import VCalendar from 'v-calendar';

axios.defaults.baseURL = 'http://192.168.1.140:3000/api';
Vue.prototype.$http = axios;

Vue.config.productionTip = false;
Vue.use(VueToast);

Vue.use(VCalendar, {
  componentPrefix: 'vc'
});

Vue.directive('click-outside', {
  bind: function(el, binding, vnode) {
    el.clickOutsideEvent = function(event) {
      // here I check that click was outside the el and his children
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unbind: function(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
