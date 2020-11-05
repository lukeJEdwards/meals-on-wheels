<template>
  <div class="main-menu">
    <SignOut class="signout" />
    <div class="buttons">
      <button
        type="button"
        class="btn"
        v-for="(link, i) in links"
        :key="i"
        @click="route(i)"
      >
        {{ link }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainMenu",
  components: {
    SignOut: () =>
      import(
        /* webpackChunkName: "signoutBtn" */ "../components/topbar/signout-button"
      ),
  },
  data() {
    return {
      links: ["Meals-on-Wheels", "Deliveries", "Clients"],
    };
  },
  methods: {
    route(index) {
      this.$router.push(`/${this.links[index].toLowerCase()}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.main-menu {
  position: relative;
  align-items: center;
  flex-direction: column;
  display: flex;
  justify-content: center;
  height: 100vh;
  background-color: $primary;
  color: $text;
}
.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btn {
  background-color: $primary;
  border: 1px solid $blue;
  color: $text;
  border-radius: $radius;
  width: 25vw;
  height: 20vh;
  min-width: 300px;
  margin: 2vh 0;
  font-family: "Nunito", sans-serif;
  font-size: 2rem;
  font-weight: 300;
  &:hover {
    cursor: pointer;
    background-color: $blue;
  }
}
.signout {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
