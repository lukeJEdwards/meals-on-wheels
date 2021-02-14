import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getter";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: "",
    OAuth: true,
    admin: false,
    _id: "",
    clients: [],
    selected_client: { _id: "NaN" },
    filter: "",
    overlay: false,
    dialog: 0,
    add: false
  },
  mutations,
  actions,
  getters
});
