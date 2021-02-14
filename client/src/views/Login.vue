<template>
  <div class="login">
    <form @submit.prevent="login">
      <h1>Login</h1>
      <input
        v-model="username"
        type="text"
        class="nunito"
        placeholder="username"
      />
      <button type="button" class="nunito" @click="login">Login</button>
    </form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      username: ""
    };
  },
  methods: {
    ...mapMutations(["set_username", "set_admin", "set_id"]),
    ...mapActions(["set_OAuth"]),
    login() {
      this.$axios.get(`/${this.username}`).then(Response => {
        this.set_OAuth(Response.data.Oauth);
        if (Response.data.Oauth) {
          this.set_username(Response.data.user.username);
          this.set_admin(Response.data.user.admin);
          this.set_id(Response.data.user._id);
          this.$router.push("/weeks");
        } else {
          this.username = "";
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: $main-background;
  color: $text;
}
form {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20vh;
  h1 {
    position: relative;
    font-weight: 600;
    font-size: 3rem;
  }
  input {
    position: relative;
    width: 25vw;
    height: 45px;
    border-radius: $border-radius;
    border: 1px solid $orange;
    background-color: $main-background;
    margin-bottom: 2rem;
    color: $text;
    text-align: center;
    font-size: 1.25rem;
    @include border-hover($green);
    &::placeholder {
      color: darken($text, 40);
    }
  }
  button {
    position: relative;
    width: 20vw;
    height: 45px;
    background-color: $blue;
    border-radius: $border-radius;
    color: $text;
    border: none;
    font-size: 1.25rem;
    @include darken-hover($blue);
  }
}
</style>
