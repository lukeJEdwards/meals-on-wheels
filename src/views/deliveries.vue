<template>
  <div class="main">
    <PrintForm
      :week="currentWeek"
      :day="currentDay"
      v-if="printForm"
      ref="print"
    />
    <Bar
      :refresh="refresh"
      :back-check="checkSave"
      :class="{ freeze: formOpen }"
    />
    <div class="top" :class="{ freeze: formOpen }">
      <WeekPicker @week-change="weekHandler" :check="checkSave" />
      <ButtonIcon
        prefix="fas"
        :icon="saveIcon"
        :spin="spin"
        pulse-on-hover
        class="btn"
        @click.native="save()"
      >
        Save
      </ButtonIcon>
      <ButtonIcon
        prefix="fas"
        icon="print"
        pulse-on-hover
        class="btn print"
        @click.native="openPrint()"
      >
        Print
      </ButtonIcon>
    </div>
    <div class="mid" :class="{ freeze: formOpen }">
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
          @delivery-change="deliverHandler"
          ref="viewport"
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
    DelivieriesWeek: () => import('../components/delivieries-week'),
    PrintForm: () => import('../components/print-form')
  },
  data() {
    return {
      currentWeek: {},
      currentDay: 0,
      delivers: [],
      saveIcon: 'cloud-upload-alt',
      spin: false
    };
  },
  computed: {
    printForm() {
      let obj = this.$store.state.formStatus;
      return obj.active && obj.type == 'print';
    },
    formOpen() {
      let obj = this.$store.state.formStatus;
      return obj.active;
    }
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
    deliverHandler(delivers) {
      this.delivers = delivers;
    },
    refresh() {
      this.$refs.viewport.refresh();
    },
    save() {
      this.saveIcon = 'spinner';
      this.spin = true;
      this.$refs.viewport.save();
      setTimeout(() => {
        this.saveIcon = 'cloud-upload-alt';
        this.spin = false;
      }, 500);
    },
    openPrint() {
      if (this.checkSave()) {
        this.$store.commit('formStatus', { active: true, type: 'print' });
      }
    },
    checkSave() {
      this.$refs.viewport.saveCheck()
        ? null
        : this.$toast.open({
            message: 'please save',
            type: 'warning',
            position: 'top'
          });
      return this.$refs.viewport.saveCheck();
    }
  },
  mounted() {
    this.$refs.print.Update();
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
  margin-top: 0;
  .btn {
    background-color: $blue;
    border: none;
    border-radius: 6px;
    color: $text;
    &:hover {
      cursor: pointer;
    }
  }
  .print {
    margin-left: 1rem;
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
.freeze {
  pointer-events: none;
}
</style>
