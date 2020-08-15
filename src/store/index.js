import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: true,
    formStatus: { active: false, type: '' }
  },
  mutations: {
    authentication(state, paylaod) {
      state.isAuthenticated = paylaod;
    },
    formStatus(state, payload) {
      state.formStatus = { active: payload.active, type: payload.type };
    }
  },
  actions: {},
  modules: {}
});
