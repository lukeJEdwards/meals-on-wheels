<template>
  <div class="main">
    <Bar :refresh="refresh" />
    <div class="top">
      <WeekPicker @week-change="weekHandler" />
      <ButtonIcon
        prefix="fas"
        icon="cloud-upload-alt"
        pulse-on-hover
        class="btn"
      >
        Save
      </ButtonIcon>
    </div>
    <div class="mid">
      <div class="left">
        <TotalMeals :current-week="currentWeek" :current-day="currentDay" />
        <Delivers :added-delivers="delivers" />
      </div>
      <div class="right">
        <DayPicker @day-change="dayHandler" />
        <DelivieriesWeek
          :delivers="delivers"
          :current-week="currentWeek"
          :current-day="currentDay"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Devliveries',
  components: {
    Bar: () => import('../components/bar'),
    WeekPicker: () => import('../components/week-picker'),
    ButtonIcon: () => import('../components/button-&-Icon'),
    TotalMeals: () => import('../components/total-meals'),
    Delivers: () => import('../components/delivers'),
    DayPicker: () => import('../components/day-picker'),
    DelivieriesWeek: () => import('../components/delivieries-week')
  },
  data() {
    return {
      currentWeek: {},
      currentDay: 0,
      delivers: []
    };
  },
  methods: {
    weekHandler(week) {
      this.currentWeek = week;
    },
    TotalMealsOptionHandler(option) {
      this.TotalMealsOption = option;
    },
    dayHandler(day) {
      this.currentDay = day;
    },
    refresh() {}
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/colours';
@import '~styles/mixins';
.main {
  @include transition;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}
.top {
  @include transition;
  display: flex;
  margin: 1rem 1rem;
  .btn {
    background-color: $blue;
    border: none;
    border-radius: 6px;
    color: $text;
    &:hover {
      cursor: pointer;
    }
  }
}
.mid {
  @include transition;
  display: flex;
  margin: 0 1rem;
  margin-bottom: 1rem;
  height: 100%;
  overflow: hidden;
  .left {
    @include transition;
    display: flex;
    flex-direction: column;
    width: 25%;
    min-width: 300px;
    height: 100%;
  }
  .right {
    @include transition;
    display: flex;
    flex-direction: column;
    width: 75%;
    height: 100%;
    margin-left: 1rem;
  }
}
</style>
