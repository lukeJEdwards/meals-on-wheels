<template>
  <div class="base" :class="{ close: close }">
    <fa-icon :icon="['fas', 'times']" class="icon" @click="closeForm()" />
    <div class="title">
      Daily PDFs
    </div>
    <div class="files">
      <div @click="GetMeals()" class="file">
        <fa-icon :icon="['fas', 'file']" class="icon" />
        <div class="title">Meals</div>
      </div>
      <div @click="GetDelivers()" class="file">
        <fa-icon :icon="['fas', 'file']" class="icon" />
        <div class="title">Delivers</div>
      </div>
    </div>
  </div>
</template>

<script>
import download from 'downloadjs';
export default {
  name: 'PrintForm',
  data() {
    return {
      close: true
    };
  },
  props: {
    week: { type: Object, required: true },
    day: { type: Number, required: true }
  },
  methods: {
    GetMeals() {
      this.$http
        .get(`/pdfs/meals/${this.week.startDate}/${this.day}`)
        .then(Response => {
          const content = Response.headers['content-type'];
          download(
            Response.data,
            `${this.getDay(this.day)} - ${this.week.startDate} meals`,
            content
          );
        })
        .catch(e => {
          this.$toast.open({ message: e, type: 'error', position: 'top' });
        });
    },
    GetDelivers() {
      this.$http
        .get(`/pdfs/delivers/${this.week.startDate}/${this.day}`)
        .then(Response => {
          const content = Response.headers['content-type'];
          download(
            Response.data,
            `${this.getDay(this.day)} - ${this.week.startDate} delivers`,
            content
          );
        })
        .catch(e => {
          this.$toast.open({ message: e, type: 'error', position: 'top' });
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
    },
    closeForm() {
      this.close = true;
      setTimeout(() => {
        this.$store.commit('formStatus', { active: false, type: '' });
      }, 750);
    },
    Update() {
      this.$http
        .get(`/pdfs/${this.week.startDate}`)
        .then(Response => {
          console.log(Response.data);
        })
        .catch(e => {
          this.$toast.open({ message: e, type: 'error', position: 'top' });
        });
    }
  },
  mounted() {
    this.Update();
    setTimeout(() => {
      this.close = false;
    });
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/colours';
@import '~styles/mixins';
.base {
  @include transition;
  position: absolute;
  display: flex;
  flex-direction: column;
  color: $text;
  background-color: lighten($primary, 10);
  min-width: 450px;
  min-height: 200px;
  margin-top: calc(50vh - 200px);
  margin-left: calc(50vw - 225px);
  border-radius: 6px;
  font-size: 1.5rem;
  overflow: hidden;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
}
.icon {
  position: absolute;
  left: 0;
  top: 0;
  margin: 1rem;
  &:hover {
    cursor: pointer;
    color: darken($text, 10);
  }
}
.files {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 0;
  .file {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    &:hover {
      cursor: pointer;
    }
    .icon {
      position: relative;
      margin: 0;
      color: $text;
    }
    .title {
      padding: 0.25rem 0;
    }
  }
}
.close {
  @include transform(translateY(-100vh));
}
</style>
