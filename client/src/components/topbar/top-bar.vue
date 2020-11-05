<template>
  <div class="top-bar">
    <BackBtn :check="check" class="back-btn" />
    <SignOutBtn :check="check" />
    <fa-icon
      icon="sync"
      class="refresh"
      @click="refreshMethod()"
      :class="{ spin: spin }"
    />
  </div>
</template>

<script>
export default {
  name: "TopBar",
  components: {
    BackBtn: () => import(/* webpackChunkName: "BackBtn" */ "./back-button"),
    SignOutBtn: () =>
      import(/* webpackChunkName: "signoutBtn" */ "./signout-button"),
  },
  props: {
    check: {
      type: Boolean,
      default: true,
    },
    refresh: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      spin: false,
    };
  },
  methods: {
    refreshMethod() {
      this.refresh();
      this.spin = true;
      setTimeout(() => {
        this.spin = false;
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
.top-bar {
  position: relative;
  display: flex;
  align-items: center;
  background-color: $secondary;
  margin: 1rem;
  border-radius: $radius;
  width: 25vw;
  min-width: 288px;
}
.back-btn {
  margin-left: 1rem;
}
.refresh {
  font-size: clamp(1rem, 2vw, 1.5rem);
  margin-left: auto;
  margin-right: 1rem;
  &:hover {
    cursor: pointer;
    color: darken($text, 20);
  }
}
.spin {
  @include transition-slow;
  transform: rotateZ(360deg);
}
</style>
