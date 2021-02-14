const actions = {
  set_OAuth({ commit }, payload) {
    commit("set_OAuth", payload);
    if (!payload) {
      commit("set_username", "");
      commit("set_admin", false);
      commit("set_id", "");
    }
  },
  set_edit_add_dialog({ commit }) {
    commit("set_dialog", 1);
    commit("set_overlay", true);
  },
  set_edit_week_dialog({ commit }) {
    commit("set_dialog", 2);
    commit("set_overlay", true);
  },
  set_add_week_dialog({ commit }) {
    commit("set_dialog", 3);
    commit("set_overlay", true);
  },
  set_add_deliver_dialog({ commit }) {
    commit("set_dialog", 4);
    commit("set_overlay", true);
  },
  set_delete_dialog({ commit }) {
    commit("set_dialog", 5);
    commit("set_overlay", true);
  },
  set_overlay({ commit }, payload) {
    if (!payload) {
      commit("set_dialog", 0);
      commit("set_overlay", false);
    } else {
      commit("set_overlay", true);
    }
  }
};

export default actions;
