<template>
  <transition name="fade" appear>
    <div class="overlay" v-if="overlay" @click="set_overlay(false)"></div>
  </transition>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Overlay",
  computed: {
    ...mapState(["overlay"])
  },
  methods: {
    ...mapActions(["set_overlay"])
  }
};
</script>

<style lang="scss" scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.3);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
