const getters = {
  get_selected_client_id: state => {
    return state.selected_client._id;
  },
  get_selected_client_index: state => {
    for (let i = 0; i < state.clients.length; i++) {
      if (state.clients[i]._id == state.selected_client._id) {
        return i;
      }
    }
    return -1;
  },
  get_filtered_clietns: state => {
    return state.clients.filter(
      client =>
        client.forename.toLowerCase().includes(state.filter.toLowerCase()) ||
        client.surname.toLowerCase().includes(state.filter.toLowerCase())
    );
  },
  get_edit_add_dialog: state => {
    return state.dialog == 1;
  },
  get_edit_week_dialog: state => {
    return state.dialog == 2;
  },
  get_add_week_dialog: state => {
    return state.dialog == 3;
  },
  get_add_deliver_dialog: state => {
    return state.dialog == 4;
  },
  get_delete_dialog: state => {
    return state.dialog == 5;
  }
};

export default getters;
