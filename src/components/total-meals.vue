<template>
  <div class="base">
    <div class="sections">
      <div class="section">
        <div class="title">Weekly meals</div>
        <div class="info">
          <div class="row">
            <div class="option">main: {{ getTotalWeeklyOption('main') }}</div>
            <div class="option">veg: {{ getTotalWeeklyOption('veg') }}</div>
          </div>
          <div class="row">
            <div class="option">soup:{{ getTotalWeeklyOption('soup') }}</div>
            <div class="option">
              pudding: {{ getTotalWeeklyOption('pudding') }}
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="title">Daily meals</div>
        <div class="info">
          <div class="row">
            <div class="option">main: {{ getTotalDailyOption('main') }}</div>
            <div class="option">veg: {{ getTotalDailyOption('veg') }}</div>
          </div>
          <div class="row">
            <div class="option">soup:{{ getTotalDailyOption('soup') }}</div>
            <div class="option">
              pudding: {{ getTotalDailyOption('pudding') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TotalMeals',
  props: {
    currentWeek: {
      type: Object,
      required: false,
      default: () => {
        return {};
      }
    },
    currentDay: {
      type: Number,
      required: false,
      default: () => 0
    }
  },
  methods: {
    getTotalWeeklyOption(option) {
      return this.HaveWeekData()
        ? this.currentWeek.data.reduce(
            (WeeklyTotal, client) =>
              (WeeklyTotal += client.days.reduce(
                (dailyTotal, day) => (dailyTotal += day[option]),
                0
              )),
            0
          )
        : 'Na';
    },
    getTotalDailyOption(option) {
      return this.HaveWeekData()
        ? this.currentWeek.data.reduce(
            (dailyTotal, client) =>
              (dailyTotal += client.days[this.currentDay][option]),
            0
          )
        : 'Na';
    },
    HaveWeekData() {
      return Object.keys(this.currentWeek).length > 0;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/colours';
@import '~styles/mixins';
.base {
  @include transition;
  display: flex;
  flex-direction: column;
  color: $text;
  background-color: $primary;
  box-shadow: 3px 5px 5px 0px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  margin-right: 1rem;
  width: 100%;
}
.title {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  font-size: 1.5rem;
}
.sections {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 1rem;
  .title {
    font-size: 1.25rem;
    margin: 0.5rem 0;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .row {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .option {
    display: flex;
    min-width: 10ch;
    margin: 0.5rem;
    padding: 0.5rem;
    width: 25%;
    justify-content: center;
    align-items: center;
    background-color: darken($primary, 5);
    border-radius: 6px;
  }
}
</style>
