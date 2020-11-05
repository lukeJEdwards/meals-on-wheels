<template>
  <button
    class="btn"
    type="button"
    :class="{ add: add, edit: edit, delete: deleteClient }"
    @mouseenter="start()"
    @mouseleave="stop()"
    @click="clickFunction()"
  >
    <fa-icon :icon="icon" class="icon" ref="icon" v-if="!showIcon" />
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "ControlButton",
  props: {
    icon: String,
    add: Boolean,
    edit: Boolean,
    rotate: Boolean,
    pulse: Boolean,
    deleteClient: Boolean,
    showIcon: Boolean,
    clickFunction: { type: Function, required: true },
  },
  methods: {
    start() {
      this.rotate ? this.$refs.icon.classList.add("rotate") : null;
      this.pulse ? this.$refs.icon.classList.add("pulse") : null;
    },
    stop() {
      this.rotate ? this.$refs.icon.classList.remove("rotate") : null;
      this.pulse ? this.$refs.icon.classList.remove("pulse") : null;
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  position: relative;
  font-size: clamp(0.8rem, 2vw, 1.25rem);
  border-radius: $radius;
  margin: 0 1rem;
  margin-bottom: 1rem;
  color: $text;
  border: none;
  padding: 1rem;
  &:hover {
    cursor: pointer;
  }
  .icon {
    @include transition-quick;
    margin-right: 1rem;
  }
}
.add {
  background-color: $green;
  &:hover {
    background-color: darken($green, 5);
  }
}
.edit {
  background-color: $orange;
  &:hover {
    background-color: darken($orange, 5);
  }
}
.delete {
  background-color: $red;
  &:hover {
    background-color: darken($red, 5);
  }
}
.rotate {
  @include transform(rotateZ(-90deg));
}
.pulse {
  @include transform(scale(1.25));
}
</style>
