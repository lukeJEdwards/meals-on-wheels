<template>
  <div class="background">
    <SignOutButton />
    <div class="flex-container">
      <button type="button" class="btn m-2 btn-disable">Meals on Wheel</button>
      <button type="button" class="btn m-2 btn-disable">Delivieries</button>
      <button type="button" class="btn m-2" id="clients" @click="Goto($event)">
        Clients
      </button>
    </div>
  </div>
</template>

<script>
import SignOutButton from '../components/sign-out-button';
export default {
  name: 'MainMenu',
  components: { SignOutButton },
  methods: {
    Goto(event) {
      this.$router.push({ name: event.currentTarget.id });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/utilities';
.flex-container {
  flex-direction: column;
  margin: auto;
  .btn {
    border: 1px solid $green;
    width: 20vw;
    min-width: 200px;
    height: 15vh;
    font-size: 1em;
  }

  .btn:hover {
    background-color: $green;
  }
  .btn-disable {
    border: 1px solid $disable;
    pointer-events: none;
  }
}
</style>
