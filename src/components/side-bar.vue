<template>
  <div class="background" :class="{ closed: closed }">
    <div class="parent">
      <div class="title" :class="{ fade: closed }">
        <p>Weeks</p>
      </div>
      <div class="back-btn">
        <BackButton />
      </div>
      <div class="add-btn" :class="{ fade: closed }">
        <button class="btn px-4">Add new week</button>
      </div>
      <div class="close-btn">
        <fa-icon
          :icon="['fas', 'angle-double-left']"
          class="icon"
          :class="{ rotate: closed }"
          @click="Close()"
        />
      </div>
      <div class="main">
        <div
          class="week px-2 py-1"
          v-for="(week, i) in weeks"
          :key="i"
          :id="i"
          @click="selected($event.currentTarget.id)"
          :class="{ 'active-week': isActive(i), fade: closed }"
        >
          {{
            week.start.toLocaleDateString('en-GB', {
              month: 'short',
              day: 'numeric'
            })
          }}
          -
          {{
            week.end.toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  components: {
    BackButton: () => import('../components/back-button')
  },
  data() {
    return {
      closed: true,
      weeks: [],
      currentWeek: ''
    };
  },
  methods: {
    Close() {
      this.closed = !this.closed;
      this.$emit('close', this.closed);
    },
    getWeeks() {
      this.$http
        .get('/allweeks')
        .then(Response => {
          this.weeks = Response.data.map(date => {
            let newStartDate = date.start.split('-');
            let newEndDate = date.end.split('-');
            return {
              start: new Date(
                newStartDate[2],
                newStartDate[1] - 1,
                newStartDate[0]
              ),
              end: new Date(newEndDate[2], newEndDate[1] - 1, newEndDate[0])
            };
          });
          this.currentWeek = this.weeks[0];
          this.$emit('WeekChanged', this.currentWeek);
        })
        .catch(e => {
          this.$parent.SendNotification(e, 'error', 5000);
        });
    },
    isActive(id) {
      return this.weeks[id] == this.currentWeek;
    },
    getWeek(id) {
      return this.weeks[id];
    },
    selected(id) {
      this.currentWeek = this.getWeek(id);
      this.$emit('WeekChanged', this.currentWeek);
    }
  },
  mounted() {
    this.getWeeks();
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/utilities';
@import '~styles/mixins';

.background {
  @include transition;
  width: 400px !important;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
}
.closed {
  @include transform(translateX(-80%));
}
.fade {
  opacity: 0;
}
.parent {
  @include transition;
  display: grid;
  width: 400px;
  height: 100vh;
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-rows: repeat(2, 1fr) 7fr 1fr;
}

.title {
  @include transition;
  grid-area: 1 / 1 / 2 / 4;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  font-size: 2em;
  border-bottom: 1px solid $text;
  padding-bottom: 1rem;
}
.add-btn {
  @include transition;
  grid-area: 2 / 1 / 3 / 4;
  display: flex;
  align-items: center;
  justify-content: center;
  .btn {
    border: 1px solid $green;
    background-color: $green;
    font-size: 1.25rem;
    &:hover {
      border: 1px solid lighten($green, 10);
    }
  }
}
.back-btn {
  grid-area: 1 / 1 / 2 / 2;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  .fa-arrow-alt-circle-left {
    font-size: 3rem;
  }
}
.close-btn {
  grid-area: 1 / 3 / 4 / 4;
  display: flex;
  align-items: center;
  justify-content: center;
  .icon {
    @include transition;
    color: $orange;
    font-size: 3rem;
    &:hover {
      cursor: pointer;
      color: darken($orange, 20);
    }
  }
  .rotate {
    @include transform(rotateZ(180deg));
  }
}
.main {
  @include transition;
  grid-area: 3 / 1 / 4 / 3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  .week {
    @include transition;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    border: 1px solid rgba(#000, 0);
    margin-bottom: 0.5rem;
    font-size: 1.25rem;
    &:hover {
      cursor: pointer;
      border: 1px solid $orange;
      border-left: none;
    }
  }
  .active-week {
    background: $orange;
    border: 1px solid $orange;
  }
}
</style>
