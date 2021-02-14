<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import { io } from "socket.io-client";
export default {
  name: "App",
  components: {
    NavBar: () => import("./components/util/nav_base")
  },
  data() {
    return { io: {} };
  },
  mounted() {
    this.io = io("http://localhost:3000");
    this.io.on("clients", clients => {
      this.$store.commit("set_clients", clients);
    });
  }
};
</script>

<style lang="scss">
#app {
  position: relative;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
