<template>
  <div class="form" :class="{ close: close }">
    <div class="title">
      <p>Weekly meals</p>
    </div>
    <div class="info">
      <div class="client">
        <p>{{ this.client.forename }} {{ this.client.surname }}</p>
        <p>{{ this.client.postcode }}</p>
        <p>{{ this.client.address }}</p>
      </div>
      <div class="week">
        <div class="day" v-for="(day, i) in client.days" :key="i" :id="i">
          <p>{{ getDay(i) }}</p>
          <div class="day-option">
            <p>Main:</p>
            <input type="search" class="input day-input" v-model="day.main" />
          </div>
          <div class="day-option">
            <p>Veg:</p>
            <input type="search" class="input day-input" v-model="day.veg" />
          </div>
          <div class="day-option">
            <p>Soup:</p>
            <input type="search" class="input day-input" v-model="day.soup" />
          </div>
          <div class="day-option">
            <p>Pud:</p>
            <input
              type="search"
              class="input day-input"
              v-model="day.pudding"
            />
          </div>
        </div>
      </div>
      <div class="button">
        <ButtonIcon
          icon="minus"
          prefix="fas"
          pulse-on-hover
          type="delete"
          class="btn close-btn"
          @click.native="Close()"
          >Close</ButtonIcon
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditFormWeek',
  props: {
    client: { type: Object, required: true }
  },
  components: {
    ButtonIcon: () => import('../components/button-&-Icon')
  },
  data() {
    return {
      close: true,
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    };
  },
  methods: {
    Close() {
      this.close = true;
      setTimeout(() => {
        this.$store.commit('formStatus', { active: false, type: '' });
      }, 750);
    },
    getDay(i) {
      return this.days[i];
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
@import '~styles/colours';
@import '~styles/mixins';

.form {
  @include transition;
  position: absolute;
  width: 50vw;
  height: 50vh;
  min-width: 700px;
  min-height: 470px;
  background-color: lighten($primary, 10);
  z-index: 1;
  border-radius: 6px;
  top: 15vh;
  left: 25vw;
  color: $text;
}
.close {
  @include transform(translateY(-100vh));
}
.close-icon {
  position: absolute;
  margin: 1rem;
  font-size: 1.5rem;
  &:hover {
    cursor: pointer;
    color: darken($text, 20);
  }
}
.title {
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  padding-top: 2rem;
  border-bottom: 2px solid $primary;
}
.info {
  display: flex;
  flex-direction: column;
  .week {
    display: flex;
    justify-content: space-around;
    .day {
      display: flex;
      flex-direction: column;
      width: 20%;
      text-align: center;
    }
  }
  .client {
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
    margin-bottom: 2rem;
    p {
      border-radius: 6px;
      background-color: $primary;
      padding: 0.5rem;
    }
  }
}
.day-option {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 0;
  p {
    width: 5ch;
  }
  .day-input {
    border: 1px solid $orange;
    width: 50px;
    margin-left: 1rem;
    text-align: center;
    text-indent: 0;
    background-color: transparent;
    border-radius: 6px;
    height: 40px;
    color: $text;
    &:hover {
      border-color: lighten($orange, 5);
    }
  }
}
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 0;
}
@media only screen and (max-width: 1600px) {
  .form {
    margin-top: calc(40vh - 250px);
  }
  .info {
    height: calc(450px - 8rem);
  }
}
</style>
