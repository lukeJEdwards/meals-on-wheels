<template>
  <div class="background" :class="{ closed: closed }">
    <div class="parent">
      <div class="title" :class="{ fade: closed }">
        <p>Weeks</p>
      </div>
      <div class="add-btn" :class="{ fade: closed }">
        <div class="picker">
          <vc-date-picker
            mode="range"
            is-dark
            class="date-picker"
            :value="null"
            v-model="newWeekInfo"
            color="gray"
            :disabled-dates="{ weekdays: [1, 7] }"
            :popover="{ placement: 'bottom', visibility: 'click' }"
          />
          <button type="button" class="add" @click="AddWeekMethod()">
            Add
          </button>
        </div>
      </div>
      <div class="close-btn">
        <fa-icon
          :icon="['fas', 'angle-double-left']"
          class="icon"
          :class="{ rotate: closed }"
          @click="Close()"
        />
      </div>
      <div class="main" :class="{ 'No-Weeks': weeks.length == 0 }">
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
        <div v-if="weeks.length == 0">
          No Weeks
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      closed: true,
      weeks: [],
      currentWeek: '',
      closeInput: true,
      newWeekInfo: {
        start: new Date(),
        end: new Date()
      }
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
    },
    AddWeekMethod() {
      const diffTime = Math.abs(this.newWeekInfo.start - this.newWeekInfo.end);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays != 4) {
        this.$parent.SendNotification(
          'please chose dates sapnning 1 working week',
          'warning',
          3500
        );
        return;
      }
      let obj = {
        startDate: this.newWeekInfo.start
          .toLocaleDateString('en-GB')
          .split('/')
          .join('-'),
        endDate: this.newWeekInfo.end
          .toLocaleDateString('en-GB')
          .split('/')
          .join('-'),
        data: []
      };
      this.$http
        .post('/weeks', obj)
        .then(Response => {
          if ('complete' in Response.data) {
            this.$parent.SendNotification('week created', 'success', 3500);
            this.getWeeks();
          } else {
            this.$parent.SendNotification(Response.data.error, 'warning', 3500);
          }
        })
        .catch(e => {
          this.$parent.SendNotification(e, 'error', 3500);
        });
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  overflow-y: auto;
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
.picker {
  display: flex;
  justify-content: center;
  align-items: center;
}
.No-Weeks {
  justify-content: center;
  align-items: center;
  font-size: 3rem;
}
</style>
