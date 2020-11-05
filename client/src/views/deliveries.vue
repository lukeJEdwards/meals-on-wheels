<template>
  <div class="main">
    <PrintForm
      v-if="printForm"
      :currentWeek="currentWeek"
      :currentDay="currentDay"
      :deliverList="deliversClients"
    />
    <Bar :refresh="refesh" :backCheck="saveCheck" />
    <div class="top">
      <WeekPicker @week-change="weekHandler" />
      <ButtonIcon icon="save" class="save" @click.native="save()"
        >Save</ButtonIcon
      >
      <ButtonIcon icon="print" @click.native="openPrintForm()"
        >Print</ButtonIcon
      >
    </div>
    <div class="mid">
      <div class="section left">
        <Totals :currentWeek="currentWeek" :currentDay="currentDay" />
        <Delivers
          :currentWeek="currentWeek"
          :currentDay="currentDay"
          @add-deliver="addDeliver"
          @remove-deliver="removeDeliver"
        />
      </div>
      <div class="section right">
        <DayPicker @day-change="dayHandler" />
        <ViewPort
          :currentWeek="currentWeek"
          :currentDay="currentDay"
          @pairing-changed="pairHandler"
          ref="viewport"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { cloneDeep, isEqual } from 'lodash';
export default {
  name: 'Devliveries',
  components: {
    Bar: () => import('../components/bar'),
    ButtonIcon: () => import('../components/button-&-Icon'),
    WeekPicker: () => import('../components/week-picker'),
    DayPicker: () => import('../components/day-picker'),
    Totals: () => import('../components/totals'),
    Delivers: () => import('../components/delivers'),
    ViewPort: () => import('../components/delivieries-week'),
    PrintForm: () => import('../components/printForm')
  },
  data() {
    return {
      currentWeek: {},
      currentDay: -1,
      deliversClients: [],
      cache: {}
    };
  },
  computed: {
    printForm: function() {
      let obj = this.$store.state.formStatus;
      return obj.active && obj.type == 'print';
    }
  },
  methods: {
    weekHandler(week) {
      this.$http
        .get(`/weeks/${week._id}`)
        .then(Response => {
          this.currentWeek = Response.data;
          this.cache = cloneDeep({ ...Response.data });
        })
        .catch(err => console.log(err));
    },
    dayHandler(day) {
      this.currentDay = day;
    },
    pairHandler(pairs) {
      this.deliversClients = pairs;
    },
    removeDeliver(id) {
      console.log(id);
      const index = this.currentWeek.delivers[this.currentDay].delivers.indexOf(
        id
      );
      this.currentWeek.delivers[this.currentDay].delivers.splice(index, 1);
    },
    addDeliver(id) {
      this.currentWeek.delivers[this.currentDay].delivers.push(id);
    },
    refesh() {
      this.weekHandler(this.currentWeek);
    },
    save() {
      this.$http
        .put(`/weeks/${this.currentWeek._id}/${this.currentDay}`, {
          ...this.currentWeek
        })
        .then(Response => {
          if (!('err' in Response.data)) {
            this.$toast.open({
              message: 'Saved!',
              type: 'success',
              position: 'top'
            });
            this.cache = cloneDeep({ ...this.currentWeek });
          }
        });
    },
    saveCheck() {
      return isEqual(this.currentWeek, this.cache);
    },
    openPrintForm() {
      this.$store.commit('formStatus', { active: true, type: 'print' });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/colours';
@import '~styles/mixins';
.main {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.top {
  position: relative;
  display: flex;
  margin: 0 1rem;
  .save {
    margin-right: 1rem;
  }
}
.mid {
  position: relative;
  display: flex;
  margin: 1rem;
  overflow: hidden;
  .section {
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .right {
    width: 70%;
  }
  .left {
    width: 30%;
    margin-right: 1rem;
  }
}
</style>
