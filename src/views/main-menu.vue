<template>
  <div class="background">
    <SignOutButton />
    <div class="flex-container">
      <button
        type="button"
        class="btn m-2"
        id="meals-on-wheels"
        @click="Goto($event)"
      >
        Meals on Wheel
      </button>
      <button
        type="button"
        class="btn m-2 btn-disable"
        id="delivieries"
        @click="Goto($event)"
      >
        Delivieries
      </button>
      <button type="button" class="btn m-2" id="clients" @click="Goto($event)">
        Clients
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainMenu',
  components: { SignOutButton: () => import('../components/sign-out-button') },
  methods: {
    Goto(event) {
      console.log(event.currentTarget.id);
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
