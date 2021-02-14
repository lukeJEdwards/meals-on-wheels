<template>
  <nav v-if="!login">
    <div class="links">
      <router-link
        v-for="route in routes"
        :key="route.path"
        :to="route.path"
        :class="{ active: route.path == $route.path }"
      >
        <span>{{ route.name }}</span>
      </router-link>
    </div>
    <div class="sign-out" @click="log_out">
      <p>Signout</p>
      <fa-icon icon="sign-out-alt" />
    </div>
  </nav>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "NavBase",
  computed: {
    login() {
      return this.$route.path == "/login" || this.$route.path == "/";
    },
    routes() {
      let arry = this.$router.options.routes;
      arry.splice(0, 2);
      return arry;
    }
  },
  methods: {
    ...mapActions(["set_OAuth"]),
    log_out() {
      this.set_OAuth(false);
      this.$router.push("./login");
    }
  }
};
</script>

<style lang="scss" scoped>
nav {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: $main-background;
  color: $text;
  height: 4rem;
}
.links {
  margin-left: 2rem;
  a {
    margin: 0 2rem;
    padding: 0.5rem 1rem;
    color: $text;
    text-decoration: none;
    font-size: 1.25rem;
    border-radius: $border-radius;
    @include darken-hover($secondary-background);
  }
}
.sign-out {
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 2rem;
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  border-radius: $border-radius;
  height: fit-content;
  p {
    font-weight: 600;
    margin: 0;
    margin-right: 1rem;
  }
  @include darken-hover($secondary-background);
}
.active {
  background-color: $secondary-background;
}
</style>
