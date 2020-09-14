import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    formStatus: { active: false, type: '' },
    userName: ''
  },
  mutations: {
    authentication(state, paylaod) {
      state.isAuthenticated = paylaod;
    },
    setUsername(state, payload) {
      state.userName = payload;
    },
    formStatus(state, payload) {
      state.formStatus = { active: payload.active, type: payload.type };
    }
  }
});
