<template>
  <div class="side-bar" :class="{ close: !open }">
    <div class="parent">
      <div class="title" :class="{ fade: !open }">
        <p>Weeks</p>
      </div>
      <div class="week-pick" :class="{ fade: !open }">
        <vc-date-picker
          mode="range"
          is-dark
          class="date-picker"
          :value="null"
          v-model="newWeekDates"
          color="gray"
          :disabled-dates="{ weekdays: [1, 7] }"
          :popover="{ placement: 'bottom', visibility: 'click' }"
        />
        <button type="button" class="add" @click="addWeek()">
          Add
        </button>
      </div>
      <div class="weeks" :class="{ fade: !open }">
        <div
          class="week"
          v-for="(week, i) in weeks"
          :key="i"
          :class="{ active: isActive(i) }"
          @click="makeActiveWeek(i)"
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
        <div class="no-week" v-if="noWeek">
          <p>No weeks found</p>
        </div>
      </div>
      <div class="toggle">
        <fa-icon
          :icon="['fas', 'angle-double-left']"
          class="icon"
          :class="{ rotate: !open }"
          @click="toggle()"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      newWeekDates: {
        start: new Date(),
        end: new Date()
      },
      weeks: [],
      open: false,
      activeWeek: {}
    };
  },
  computed: {
    noWeek() {
      return this.weeks.length < 1;
    }
  },
  methods: {
    getWeeks() {
      this.$http
        .get('/allweeks')
        .then(Response => {
          this.weeks =
            Response.data.length > 0
              ? Response.data.map(date => {
                  let newStartDate = date.start.split('-');
                  let newEndDate = date.end.split('-');
                  return {
                    start: new Date(
                      newStartDate[2],
                      newStartDate[1] - 1,
                      newStartDate[0]
                    ),
                    end: new Date(
                      newEndDate[2],
                      newEndDate[1] - 1,
                      newEndDate[0]
                    )
                  };
                })
              : [];
          this.weeks.length > 0 ? (this.activeWeek = this.weeks[0]) : null;
          this.$emit('week-change', this.activeWeek);
        })
        .catch(e => {
          this.$toast.open({ message: e, type: 'error', position: 'top' });
        });
    },
    toggle() {
      this.open = !this.open;
      this.$emit('sidebar-toggle', this.open);
    },
    isActive(index) {
      return this.activeWeek == this.weeks[index];
    },
    makeActiveWeek(index) {
      if (this.activeWeek == this.weeks[index]) {
        this.activeWeek = {};
      } else {
        this.activeWeek = this.weeks[index];
      }
      this.$emit('week-change', this.activeWeek);
    },
    addWeek() {
      const diffTime = Math.abs(
        this.newWeekDates.start - this.newWeekDates.end
      );
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays != 4) {
        this.$toast.open({
          message: 'please chose dates sapnning 1 working week',
          type: 'warning',
          position: 'top'
        });
        return;
      }
      let obj = {
        startDate: this.newWeekDates.start
          .toLocaleDateString('en-GB')
          .split('/')
          .join('-'),
        endDate: this.newWeekDates.end
          .toLocaleDateString('en-GB')
          .split('/')
          .join('-'),
        data: []
      };
      this.$http
        .post('/weeks', obj)
        .then(Response => {
          if ('complete' in Response.data) {
            this.$toast.open({
              message: 'week created',
              type: 'success',
              position: 'top'
            });
            this.getWeeks();
          } else {
            this.$toast.open({
              message: Response.data.error,
              type: 'warning',
              position: 'top'
            });
          }
        })
        .catch(e => {
          this.$toast.open({ message: e, type: 'error', position: 'top' });
        });
    }
  },
  mounted() {
    this.getWeeks();
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/colours';
@import '~styles/mixins';
.side-bar {
  @include transition;
  display: flex;
  height: 100vh;
  width: 400px;
  background-color: $primary;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  color: $text;
}
.parent {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: repeat(2, 1fr) 5fr 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}
.title {
  @include transition;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-size: 2rem;
  border-bottom: 2px solid $text;
  padding-bottom: 1rem;
  grid-area: 1 / 1 / 2 / 4;
}
.week-pick {
  @include transition;

  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: 2 / 1 / 3 / 4;
  .add {
    height: 38px;
    padding: 0 2rem;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    border: none;
    background-color: $green;
    color: $text;
    font-weight: 700;
    &:hover {
      cursor: pointer;
      background-color: lighten($green, 5);
    }
  }
}
.weeks {
  @include transition;
  display: flex;
  flex-direction: column;
  overflow: auto;
  grid-area: 3 / 1 / 4 / 3;
  .week {
    width: 18ch;
    font-size: 1.25rem;
    padding: 1rem 2rem;
    margin-bottom: 0.5rem;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    &:hover {
      cursor: pointer;
      background-color: $orange;
    }
  }
  .active {
    background-color: $orange;
    &:hover {
      background-color: $orange;
    }
  }
}
.toggle {
  @include transition;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: 1 / 3 / 5 / 4;
  .icon {
    @include transition;
    color: $orange;
    font-size: 3rem;
    padding: 0 1rem;
    &:hover {
      cursor: pointer;
      color: darken($orange, 5);
    }
  }
}
.close {
  width: 80px;
}
.fade {
  opacity: 0;
  overflow: hidden;
}
.rotate {
  @include transform(rotateZ(180deg));
}
.no-week {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.5rem;
}
</style>
