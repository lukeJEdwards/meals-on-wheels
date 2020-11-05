<template>
  <div class="search">
    <input
      type="text"
      class="search-input"
      v-model="filter"
      placeholder="Search..."
    />
  </div>
</template>

<script>
export default {
  name: "serach",
  data() {
    return {
      filter: "",
    };
  },
  watch: {
    filter() {
      this.$emit("filter", this.filter);
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
}
.search-input {
  width: 100%;
  background-color: transparent;
  border: 1px solid $secondary;
  font-size: 1.5rem;
  padding: 1rem;
  color: $text;
  &:hover,
  &:focus {
    border: 1px solid $green;
  }
  &::placeholder {
    color: darken($text, 35);
  }
}
</style>
