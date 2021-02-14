<template>
  <div>
    <div class="row" :key="client._id" @dblclick="select_client(client)">
      <div class="data-col name">{{ client.forename }}</div>
      <div class="data-col name">{{ client.surname }}</div>
      <div class="data-col address">{{ client.address }}</div>
      <div class="data-col postcode">{{ client.postcode }}</div>
      <div class="data-col tag-group">{{ client.comments }}</div>
      <div class="data-col tag-group">{{ client.dietaryRequirements }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "ClientRow",
  props: {
    client: { type: Object, required: true }
  },
  computed: {
    ...mapGetters(["get_selected_client_id"])
  },
  data() {
    return { overlay: false };
  },
  methods: {
    ...mapMutations(["set_selected_client", "set_add"]),
    ...mapActions(["set_edit_add_dialog"]),
    select_client(client) {
      this.set_add(false);
      this.set_selected_client(client);
      this.set_edit_add_dialog();
    }
  }
};
</script>

<style lang="scss" scoped>
.name {
  width: 10%;
}
.address {
  width: 20%;
}
.postcode {
  width: 10%;
}
.tag-group {
  width: 25%;
}
.row {
  position: relative;
  display: flex;
  &:nth-child(even) {
    background-color: lighten($main-background, 5);
  }
  @include darken-hover($main-background);
  .data-col {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;
    text-align: center;
  }
}
</style>
