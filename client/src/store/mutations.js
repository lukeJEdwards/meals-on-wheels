const mutations = {
  set_username(state, payload) {
    state.username = payload;
  },
  set_admin(state, payload) {
    state.admin = payload;
  },
  set_id(state, payload) {
    state._id = payload;
  },
  set_OAuth(state, payload) {
    state.OAuth = payload;
  },
  set_clients(state, payload) {
    state.clients = payload;
  },
  set_client(state, payload) {
    state.clients[payload.index] = payload.client;
  },
  set_selected_client(state, payload) {
    state.selected_client = payload;
  },
  set_filter(state, payload) {
    state.filter = payload;
  },
  set_overlay(state, payload) {
    state.overlay = payload;
  },
  set_dialog(state, payload) {
    state.dialog = payload;
  },
  set_add(state, payload) {
    state.add = payload;
  },
  remove_client(state, payload) {
    let ids = state.clients.map(client => client._id);
    for (let i = 0; i < ids.length; i++) {
      if (ids[i] == payload) {
        state.client.splice(i, 1);
        return true;
      }
    }
    return false;
  }
};

export default mutations;
