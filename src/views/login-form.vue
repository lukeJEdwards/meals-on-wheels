<template>
  <div class="background">
    <div class="container">
      <form @:submit.prevent>
        <h1>Login</h1>
        <input
          type="search"
          class="input m-2"
          placeholder="Username"
          v-model="UserName"
          @keydown.enter="OAuth()"
        />
        <button type="button" class="btn" @click="OAuth()">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      UserName: ''
    };
  },
  methods: {
    OAuth() {
      if (this.UserName.toLowerCase() == 'admin') {
        this.$store.commit('authentication', true);
        this.UserName = '';
        this.$router.push({ name: 'main-menu' });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/utilities';

.container {
  margin-right: auto;
  margin-left: auto;
  margin-top: 30vh;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    border: 1px solid $green;
    width: 350px;
    text-align: center;
  }
  button {
    width: 250px;
    border: 1px solid $orange;
  }
  button:hover {
    background-color: $orange;
  }
}
</style>
