<template>
  <div class="base">
    <div class="picker">
      <div class="arrow left">
        <fa-icon
          :icon="['fas', 'chevron-left']"
          class="icon"
          @mousedown="start(-scrollAmount)"
          @mouseup="stop()"
          @mouseleave="stop()"
        />
      </div>
      <div class="weeks" v-dragscroll.x ref="weeks">
        <div
          class="week"
          :class="{ selected: isSelected(i) }"
          v-for="(week, i) in weeks"
          :key="i"
          @click="selecteWeek(i)"
        >
          {{ week.start }} - {{ week.end }}
        </div>
      </div>
      <div class="arrow right">
        <fa-icon
          :icon="['fas', 'chevron-left']"
          :rotation="180"
          class="icon"
          @mousedown="start(scrollAmount)"
          @mouseup="stop()"
          @mouseleave="stop()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { isEqual } from 'lodash';
import { dragscroll } from 'vue-dragscroll';

export default {
  name: 'WeekPicker',
  directives: {
    dragscroll
  },
  data() {
    return {
      weeks: [],
      currentWeek: '',
      interval: false,
      scrollAmount: 20
    };
  },
  methods: {
    start(amount) {
      if (!this.interval) {
        this.interval = setInterval(
          () => (this.$refs.weeks.scrollLeft += amount),
          10
        );
      }
    },
    stop() {
      clearInterval(this.interval);
      this.interval = false;
    },
    selecteWeek(index) {
      if (this.currentWeek == this.weeks[index]) {
        this.currentWeek = {};
        this.$emit('week-change', {});
      } else {
        this.currentWeek = this.weeks[index];
        this.EmitWeekChange();
      }
    },
    EmitWeekChange() {
      this.$http
        .get(`/weeks?date=${this.currentWeek.start}`)
        .then(Response => {
          this.$emit('week-change', Response.data);
        })
        .catch(e => {
          this.$toast.open({ message: e, type: 'error', position: 'top' });
        });
    },
    isSelected(index) {
      return isEqual(this.currentWeek, this.weeks[index]);
    }
  },
  mounted() {
    this.$http
      .get('/allweeks')
      .then(Response => {
        this.weeks = Response.data;
        this.currentWeek = this.weeks[0];
        this.EmitWeekChange();
      })
      .catch(e => {
        this.$toast.open({ message: e, type: 'error', position: 'top' });
      });
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/colours';
@import '~styles/mixins';
.base {
  @include transition;
  display: flex;
  background-color: $primary;
  border-radius: 6px;
  color: $text;
  margin-right: 1rem;
  width: calc(100vw - 2rem);
  min-width: calc(21ch + 9rem);
  box-shadow: 3px 5px 5px 0px rgba(0, 0, 0, 0.2);
  height: fit-content;
}
.picker {
  display: flex;
  overflow: hidden;
}
.weeks {
  display: flex;
  overflow: hidden;
  min-width: calc(21ch + 3rem);
  .week {
    min-width: 21ch;
    margin: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: darken($primary, 5);
    border-radius: 6px;
    &:hover {
      cursor: pointer;
      background-color: darken($blue, 5);
    }
    &:last-child {
      margin-right: 1rem;
    }
  }
  .selected {
    background-color: $blue;
    &:hover {
      background-color: $blue;
    }
  }
}
.arrow {
  display: flex;
  align-items: center;
  color: $orange;
  font-size: 1.5rem;
  padding: 0 1rem;
  .icon:hover {
    cursor: pointer;
    color: darken($orange, 5);
  }
}
.left {
  border-right: 2px solid lighten($primary, 5);
}
.right {
  border-left: 2px solid lighten($primary, 5);
}
</style>
