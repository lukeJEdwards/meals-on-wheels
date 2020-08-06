import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: true
  },
  mutations: {
    authentication(state, paylaod) {
      state.isAuthenticated = paylaod;
    }
  },
  actions: {},
  modules: {}
});
