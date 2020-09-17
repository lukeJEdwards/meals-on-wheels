<template>
  <div class="base">
    <div>
      <div class="titles">
        <div class="section">Weekly meals</div>
        <div class="section">Daliy meals</div>
      </div>
      <div class="info">
        <div class="section">
          <div class="option" v-for="(option, i) in options" :key="i">
            {{ option[0].toUpperCase() }}: {{ getTotalWeeklyOption(option) }}
          </div>
        </div>
        <div class="section">
          <div
            class="option"
            v-for="(option, i) in options"
            :key="options.length + i"
          >
            {{ option[0].toUpperCase() }}: {{ getTotalDailyOption(option) }}
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
  data() {
    return {
      options: ['main', 'veg', 'soup', 'pudding'],
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    };
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
    },
    resizeHander(e) {
      this.windowHeight = e.currentTarget.innerHeight;
      this.windowWidth = e.currentTarget.innerWidth;
    }
  },
  mounted() {
    window.addEventListener('resize', this.resizeHander);
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeHander);
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
  align-items: center;
  font-size: 1.25rem;
  padding: 0.5rem 0;
}
.titles {
  display: flex;
  font-size: 1.25rem;
  padding: 0.25rem 0;
}
.section {
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.info {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  .option {
    display: flex;
    background-color: darken($primary, 5);
    padding: 0.25rem 0.5rem;
    margin: 0.5rem;
    border-radius: 6px;
  }
}
</style>
