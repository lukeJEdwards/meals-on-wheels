<template>
  <div class="back-btn" @click="check ? $router.go(-1) : null">
    <fa-icon icon="arrow-alt-circle-left" class="icon" />
  </div>
</template>

<script>
export default {
  name: "BackButton",
  props: {
    check: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  color: $orange;
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  &:hover {
    cursor: pointer;
    color: darken($orange, 5);
  }
}
</style>
