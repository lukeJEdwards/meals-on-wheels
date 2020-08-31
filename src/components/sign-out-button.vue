<template>
  <div @click="SignOut()">
    <fa-icon :icon="['fas', 'sign-out-alt']" />
    <p>Signout</p>
  </div>
</template>

<script>
export default {
  name: 'SignOutButton',
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
    SignOut() {
      if (this.check()) {
        this.$store.commit('authentication', false);
        this.$router.push({ name: 'login' });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/colours';
div {
  display: flex;
  align-items: center;
  color: $text;
  margin: 0.5rem;
  svg {
    font-size: 2rem;
  }
  p {
    margin-left: 0.5rem;
  }
  &:hover {
    cursor: pointer;
    color: darken($color: white, $amount: 20);
  }
}
</style>
