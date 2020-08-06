<template>
  <fa-icon :icon="['far', 'arrow-alt-circle-left']" @click="back()" />
</template>

<script>
export default {
  name: 'BackButton',
  methods: {
    back() {
      this.$router.go(-1);
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
