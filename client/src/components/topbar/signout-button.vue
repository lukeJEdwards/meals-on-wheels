<template>
  <div class="sign-out-btn" @click="signOut()">
    <fa-icon icon="sign-out-alt" class="icon" />
    <p class="text">Signout</p>
  </div>
</template>

<script>
export default {
  name: "SingOutBtn",
  props: {
    check: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    signOut() {
      if (this.check) {
        this.$store.commit("setAuth", false);
        this.$store.commit("setUsername", "");
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sign-out-btn {
  display: flex;
  align-items: center;
  font-size: clamp(0.8rem, 2vw, 1.5rem);
  &:hover {
    cursor: pointer;
    .icon {
      color: darken($text, 20);
    }
    .text {
      color: darken($text, 20);
    }
  }
}
.icon {
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  margin: 0 1rem;
}
</style>
