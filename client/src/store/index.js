import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Auth: true,
    username: "",
  },
  mutations: {
    setAuth(state, payload) {
      state.Auth = payload;
    },
    setUsername(state, payload) {
      state.username = payload;
    },
  },
  actions: {},
  modules: {},
});
