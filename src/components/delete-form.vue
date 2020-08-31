<template>
  <div class="flex-container cols delete-form" :class="{ close: close }">
    <div class="m-1">
      <p>would you like to <b>delete</b></p>
      <p>
        <b>{{ client.forename }} {{ client.surname }}</b>
      </p>
      <p>as a client</p>
    </div>
    <div class="flex-container buttons">
      <button type="button" class="btn px-2 yes" @click="yes()">Yes</button>
      <button type="button" class="btn px-2 no" @click="no()">No</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeleteForm',
  props: {
    client: { type: Object, required: true },
    delete: { type: Function, required: true }
  },
  data() {
    return {
      error: '',
      close: true
    };
  },
  methods: {
    yes() {
      this.delete();
      this.no();
    },
    no() {
      this.close = true;
      setTimeout(() => {
        this.$store.commit('formStatus', { active: false, type: '' });
      }, 750);
    }
  },
  mounted() {
    setTimeout(() => {
      this.close = false;
    }, 10);
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/utilities';
@import '~styles/mixins';
.delete-form {
  @include transition;
  position: absolute;
  z-index: 1;
  color: $text;
  background-color: lighten($primary, 10);
  width: 350px !important;
  margin-left: calc(50vw - 175px);
  margin-top: calc(30vh - 50px);
  border-radius: 25px;
  p {
    text-align: center;
  }
  b {
    font-weight: 900;
  }
}
.close {
  @include transform(translateY(-100vh));
}
.buttons {
  margin-bottom: 1rem;
  justify-content: space-evenly;
  .yes {
    border: 1px solid $green;
    background-color: lighten($green, 10);
  }
  .no {
    border: 1px solid $red;
    background-color: $red;
  }
}
</style>
