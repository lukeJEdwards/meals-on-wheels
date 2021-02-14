<template>
  <button
    type="button"
    class="button"
    :class="{ green: Add, red: !Add }"
    @click="click()"
  >
    <fa-icon icon="user-plus" class="icon" v-if="Add" />
    <fa-icon icon="user-minus" class="icon" v-else />
  </button>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  name: "AddButton",
  props: {
    Add: Boolean
  },
  methods: {
    ...mapMutations(["set_add", "set_selected_client"]),
    ...mapActions(["set_edit_add_dialog"]),
    click() {
      if (this.Add) {
        this.set_selected_client({ _id: "NaN" });
        this.set_add(true);
      }
      this.set_edit_add_dialog();
    }
  }
};
</script>

<style lang="scss" scoped>
.button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: $border-radius;
  border: none;
  padding: 1rem;
  margin-top: 1rem;
  margin-right: 1rem;
  .icon {
    color: $text;
    font-size: 1.5rem;
  }
}
.green {
  background-color: $green;
  @include darken-hover($green);
}
.red {
  background-color: $red;
  @include darken-hover($red);
}
</style>
