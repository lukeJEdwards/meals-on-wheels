<template>
  <fa-icon :icon="['far', 'arrow-alt-circle-left']" @click="back()" />
</template>

<script>
export default {
  name: 'BackButton',
  props: {
    check: {
      type: Function,
      required: false,
      default: () => {
        return true;
      }
    }
  },
  methods: {
    back() {
      if (this.check()) {
        this.$router.go(-1);
      } else {
        this.$toast.open({
          message: 'Please Save',
          type: 'warning',
          position: 'top'
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/colours';

svg {
  font-size: 2rem;
  color: $orange;
  margin: 0.5rem;
  &:hover {
    cursor: pointer;
    color: darken($orange, 10);
  }
}
</style>
