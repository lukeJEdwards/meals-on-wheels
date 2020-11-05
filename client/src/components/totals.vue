<template>
  <div class="totals">
    <div class="total">
      <p class="title">Weekly Total</p>
      <div class="options">
        <div class="option" v-for="(option, i) in options" :key="i">
          {{ option[0].toUpperCase() }}: {{ weeklyTotal(option) }}
        </div>
      </div>
    </div>
    <div class="total">
      <p class="title">Daily Total</p>
      <div class="options">
        <div class="option" v-for="(option, i) in options" :key="i">
          {{ option[0].toUpperCase() }}: {{ dailyTotal(option) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Totals',
  props: {
    currentWeek: { type: Object, required: true },
    currentDay: { type: Number, required: true }
  },
  computed: {
    haveData() {
      return this.currentDay > -1 && Object.keys(this.currentWeek).length > 0;
    }
  },
  data() {
    return {
      options: ['main', 'veg', 'soup', 'pudding']
    };
  },
  methods: {
    dailyTotal(option) {
      return this.haveData
        ? this.currentWeek.data.reduce(
            (dailyTotal, client) =>
              (dailyTotal += parseInt(client.days[this.currentDay][option])),
            0
          )
        : 'Na';
    },
    weeklyTotal(option) {
      if (this.haveData) {
        let total = 0;
        for (let i = 0; i < 5; i++) {
          total += this.currentWeek.data.reduce(
            (dailyTotal, client) =>
              (dailyTotal += parseInt(client.days[i][option])),
            0
          );
        }
        return total;
      } else {
        return 'Na';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/colours';

.totals {
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: $primary;
  color: $text;
  border-radius: 6px;
  margin-bottom: 1rem;
  .total {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title {
      font-size: 1.25rem;
    }
    .options {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .option {
        background-color: $secondary;
        border-radius: 6px;
        padding: 0.5rem;
        margin: 0.5rem;
      }
    }
  }
}
</style>
