<template>
  <div class="clients">
    <ClietDialog :Add="add" />
    <Overlay />
    <div class="buttons">
      <ControlButton Add />
      <ControlButton />
    </div>
    <ViewPort />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Clients",
  components: {
    ViewPort: () => import("@/components/viewports/client"),
    ControlButton: () => import("@/components/buttons/control_button"),
    Overlay: () => import("@/components/dialogs/overlay"),
    ClietDialog: () => import("@/components/dialogs/client")
  },
  computed: {
    ...mapState(["overlay", "add"])
  },
  watch: {
    overlay: function() {
      if (!this.overlay) {
        this.$forceUpdate();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.clients {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 4rem);
  .buttons {
    position: relative;
    display: flex;
    width: 90vw;
  }
}
</style>
