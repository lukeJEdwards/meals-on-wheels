<template>
  <div></div>
</template>

<script>
export default {
  name: "DatePicker",
  data() {
    return {
      selectedDate: this.getMonday(new Date()),
      dates: [selectedDate]
    };
  },
  methods: {
    getMonday(d) {
      d = new Date(d);
      var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
      return new Date(d.setDate(diff));
    }
  }
};
</script>

<style lang="scss" scoped></style>
