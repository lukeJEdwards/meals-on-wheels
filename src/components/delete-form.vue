<template>
  <div class="flex-container cols delete-form" :class="{ close: close }">
    <div class="m-1">
      <p>
        would you like to delete
      </p>
      <p>{{ client.forename }} {{ client.surname }}</p>
      <p>as a client</p>
    </div>
    <div class="flex-container buttons">
      <button type="button" class="btn px-2" @click="yes()">Yes</button>
      <button type="button" class="btn px-2" @click="no()">No</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeleteForm',
  props: {
    client: { type: Object, required: true }
  },
  data() {
    return {
      error: '',
      close: true
    };
  },
  methods: {
    yes() {
      this.$http
        .delete('clients/', { data: { id: this.client.id } })
        .then(Response => {
          console.log(Response);
          if ('message' in Response.data) {
            this.no();
            this.$parent.refresh();
          } else {
            this.$parent.SendNotification(Response.data, 'warning', 3000);
          }
        })
        .catch(e => {
          this.$parent.SendNotification(e, 'warning', 10000);
        });
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
  background-color: $red;
  width: 350px !important;
  margin-left: calc(50vw - 175px);
  margin-top: calc(30vh - 50px);
  border-radius: 25px;
  p {
    text-align: center;
  }
}
.close {
  @include transform(translateY(-100vh));
}
.buttons {
  margin-bottom: 1rem;
  justify-content: space-evenly;
  .btn {
    border: 1px solid $orange;
    &:hover {
      background-color: $orange;
    }
  }
}
</style>
