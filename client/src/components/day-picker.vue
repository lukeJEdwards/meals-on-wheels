<template>
  <div class="day-picker">
    <div class="days">
      <div
        class="day"
        v-for="(day, i) in days"
        :key="i"
        @click="select(i)"
        :class="{ selected: selected(i) }"
      >
        {{ day }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DayPicker',
  data() {
    return {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      selectedDay: -1
    };
  },
  watch: {
    selectedDay() {
      this.$emit('day-change', this.selectedDay);
    }
  },
  methods: {
    select(index) {
      this.selectedDay == index
        ? (this.selectedDay = -1)
        : (this.selectedDay = index);
    },
    selected(index) {
      return this.selectedDay == index;
    }
  },
  mounted() {
    this.selectedDay = 0;
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/colours';
.day-picker {
  position: relative;
  display: flex;
  color: $text;
}
.days {
  position: relative;
  display: flex;
  background-color: $primary;
  width: 100%;
  border-radius: 6px;
  justify-content: space-around;
  .day {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $secondary;
    border-radius: 6px;
    padding: 0.5rem 2rem;
    margin: 0.5rem 1rem;
    flex-grow: 1;
    &:hover {
      cursor: pointer;
      background-color: $blue;
    }
  }
  .selected {
    background-color: $blue;
    &:hover {
      background-color: $blue;
    }
  }
}
</style>
