<template>
  <div class="day-picker">
    <div
      class="day"
      v-for="(day, i) in days"
      :key="i"
      @click="selectDay(i)"
      :class="{ selected: isSelected(i) }"
    >
      {{ day }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'DayPicker',
  data() {
    return {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      currentDay: 0
    };
  },
  methods: {
    isSelected(index) {
      return this.currentDay == index;
    },
    selectDay(index) {
      if (this.currentDay == index) {
        this.currentDay = -1;
      } else {
        this.currentDay = index;
      }
      this.$emit('day-change', this.currentDay);
    }
  },
  mounted() {
    this.$emit('day-change', this.currentDay);
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/colours';
@import '~styles/mixins';
.day-picker {
  @include transition;
  display: flex;
  background-color: $primary;
  color: $text;
  border-radius: 6px;
  width: 100%;
  box-shadow: 3px 5px 5px 0px rgba(0, 0, 0, 0.2);
}
.day {
  @include transition;
  width: 20%;
  text-align: center;
  padding: 0.5rem 0;
  margin: 1rem 1rem;
  border-radius: 6px;
  background-color: darken($primary, 5);
  &:hover {
    cursor: pointer;
    background-color: darken($blue, 5);
  }
}
.selected {
  background-color: $blue;
  &:hover {
    background-color: $blue;
  }
}
</style>
