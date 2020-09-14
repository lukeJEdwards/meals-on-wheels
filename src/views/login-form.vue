<template>
  <div class="background">
    <div class="container">
      <div class="form">
        <h1>Login</h1>
        <input
          type="search"
          class="input m-2"
          placeholder="Username"
          v-model="UserName"
          @keydown.enter="OAuth()"
          ref="username"
          @:submit.prevent="onSubmit"
        />
        <button type="button" class="btn" @click="OAuth()">
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { mapMutations } from 'vuex';
export default {
  name: 'Login',
  computed: {
    ...mapState(['isAuthenticated'])
  },
  data() {
    return {
      UserName: ''
    };
  },
  watch: {
    isAuthenticated: function() {
      if (this.isAuthenticated) {
        this.setUsername(this.UserName);
        this.$router.push({ name: 'main-menu' });
      }
    }
  },
  methods: {
    OAuth() {
      this.$http
        .get(`/login/${this.UserName}`)
        .then(Response => {
          this.authentication(Response.data.Oauth);
        })
        .catch(e => {
          this.$toast.open({
            message: e,
            type: 'error',
            position: 'top'
          });
        });
    },
    ...mapMutations(['authentication', 'setUsername']),
    onSubmit() {}
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

.form {
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
