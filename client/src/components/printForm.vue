<template>
  <div class="base" :class="{ close: closed }">
    <fa-icon icon="times" @click="close()" class="close-icon" />
    <div class="container">
      <b>Download</b>
      <p>
        <b>{{ day }} of Week: {{ currentWeek.startDate }}</b>
      </p>
      <div class="files">
        <div @click="GetMeals()" class="file">
          <fa-icon :icon="['fas', 'file']" class="icon" />
          <div class="title">Meals</div>
        </div>
        <div @click="GetDelivers()" class="file">
          <fa-icon :icon="['fas', 'file']" class="icon" />
          <div class="title">Deliverers</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import download from 'downloadjs';
export default {
  name: 'PrintForm',
  props: {
    currentWeek: { type: Object, required: true },
    currentDay: { type: Number, required: true },
    deliverList: { type: Array, required: true }
  },
  data() {
    return {
      closed: true,
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    };
  },
  computed: {
    day() {
      return this.days[this.currentDay];
    }
  },
  methods: {
    close() {
      this.closed = true;
      setTimeout(() => {
        this.$store.commit('formStatus', { active: false, type: '' });
      }, 750);
    },
    GetMeals() {
      this.$http
        .put('/pdf/meals', {
          week: this.currentWeek,
          chunks: this.deliverList,
          day: this.currentDay
        })
        .then(Response => {
          const content = Response.headers['content-type'];
          download(
            Response.data,
            `${this.getDay(this.currentDay)} - ${
              this.currentWeek.startDate
            } meals`,
            content
          );
        });
    },
    GetDelivers() {
      this.$http
        .put('/pdf/delivers', {
          week: this.currentWeek,
          chunks: this.deliverList,
          day: this.currentDay
        })
        .then(Response => {
          const content = Response.headers['content-type'];
          download(
            Response.data,
            `${this.getDay(this.currentDay)} - ${
              this.currentWeek.startDate
            } deliveries`,
            content
          );
        });
    },
    getDay(day) {
      switch (day) {
        case 0:
          return 'Mon';
        case 1:
          return 'Tue';
        case 2:
          return 'Wed';
        case 3:
          return 'Thu';
        case 4:
          return 'Fri';
        default:
          break;
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.closed = false;
    }, 10);
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/utilities';
@import '~styles/mixins';
.base {
  @include transition;
  position: absolute;
  display: flex;
  justify-content: center;
  z-index: 1;
  color: $text;
  background-color: lighten($primary, 10);
  width: 350px !important;
  margin-left: calc(50vw - 175px);
  margin-top: calc(30vh - 50px);
  border-radius: 6px;
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
.close-icon {
  position: absolute;
  left: 1rem;
  top: 1rem;
  font-size: 1.25rem;
  &:hover {
    cursor: pointer;
    color: darken($text, 20);
  }
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
}
.files {
  display: flex;
  margin: 1rem 0;
  justify-content: space-between;
  .file {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.5rem;
    margin: 0 1rem;
    &:hover {
      cursor: pointer;
      color: darken($text, 20);
    }
  }
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
