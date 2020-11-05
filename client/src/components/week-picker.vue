<template>
  <div class="week-picker">
    <div
      class="arrow left"
      @mousedown="start(-scrollAmount)"
      @mouseup="stop()"
      @mouseleave="stop()"
    >
      <fa-icon icon="chevron-left" class="icon" />
    </div>
    <div class="weeks" ref="weeks">
      <div
        class="week"
        v-for="week in weeks"
        :key="week._id"
        @click="select(week)"
        :class="{ selected: selected(week._id) }"
      >
        {{ week.startDate }} - {{ week.endDate }}
      </div>
    </div>
    <div
      class="arrow right"
      @mousedown="start(scrollAmount)"
      @mouseup="stop()"
      @mouseleave="stop()"
    >
      <fa-icon icon="chevron-left" class="icon" rotation="180" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'weekPicker',
  data() {
    return {
      weeks: [],
      selectedWeek: {},
      scrollAmount: 20
    };
  },
  methods: {
    selected(id) {
      return id == this.selectedWeek._id;
    },
    select(week) {
      if (this.selectedWeek._id == week._id) {
        this.selectedWeek = {};
      } else {
        this.selectedWeek = week;
      }
    },
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
    }
  },
  watch: {
    selectedWeek() {
      this.$emit('week-change', this.selectedWeek);
    }
  },
  mounted() {
    this.$http
      .get('/weeks')
      .then(Response => {
        this.weeks = Response.data;
        this.selectedWeek = Response.data[0];
      })
      .catch(err => console.log(err));
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/colours';
.week-picker {
  position: relative;
  display: flex;
  width: 100%;
  background-color: $primary;
  color: $text;
  border-radius: 6px;
  margin-right: 1rem;
}
.weeks {
  display: flex;
  align-items: center;
  width: 100%;
  overflow-x: hidden;
  .week {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $secondary;
    padding: 0.5rem;
    margin: 0 1rem;
    border-radius: 6px;
    min-width: 200px;
    flex-grow: 1;
    &:hover {
      cursor: pointer;
      background-color: $blue;
    }
  }
  .selected {
    background-color: $blue;
    &:hover {
      cursor: pointer;
      background-color: $blue;
    }
  }
}
.left {
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}
.right {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}
.arrow {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  &:hover {
    cursor: pointer;
    background-color: $secondary;
    .icon {
      color: darken($text, 20);
    }
  }
  .icon {
    font-size: 2rem;
  }
}
</style>
