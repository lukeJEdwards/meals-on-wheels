<template>
  <div class="login">
    <form class="form" @submit.prevent="login()">
      <h1>Login</h1>
      <input
        type="text"
        class="username"
        v-model="username"
        placeholder="Username"
      />
      <button type="button" class="btn" @click="login()">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
    };
  },
  methods: {
    login() {
      this.$axios
        .get(`/users/${this.username}`)
        .then((Response) => {
          if (Response.data.Oauth) {
            this.$store.commit("setAuth", Response.data.Oauth);
            this.$store.commit("setUsername", this.username);
            this.$router.push("/main-menu");
          }
          this.username = "";
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100vh;
  background-color: $primary;
  color: $text;
}
.form {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 50vw;
  min-width: 320px;
  height: 50vh;
  h1 {
    margin-top: 15%;
  }
  .username {
    font-family: "Nunito", sans-serif;
    width: 25vw;
    min-width: 200px;
    border-radius: $radius;
    background-color: $primary;
    color: $text;
    border: 1px solid $orange;
    font-size: 1.25rem;
    padding: 0.5rem 0;
    text-indent: 10px;
    text-align: center;
    margin-bottom: 1rem;
    &:hover,
    &:focus {
      border: 1px solid $green;
    }
    &::placeholder {
      color: darken($text, 35);
    }
  }
  .btn {
    font-family: "Nunito", sans-serif;
    width: 20vw;
    min-width: 180px;
    color: $text;
    background-color: $blue;
    border: none;
    border-radius: $radius;
    font-size: 1.25rem;
    padding: 0.5rem 0;
    &:hover {
      cursor: pointer;
      background-color: darken($blue, 5);
    }
  }
}
</style>
