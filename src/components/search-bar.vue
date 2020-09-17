<template>
  <div class="search-input">
    <input
      type="search"
      v-model="value"
      :placeholder="placeHolderText"
      class="input"
    />
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    placeHolderText: {
      type: String,
      required: false,
      default: 'Search...'
    }
  },
  data() {
    return {
      value: ''
    };
  },
  watch: {
    value: function() {
      this.$emit('search-value', this.value);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/colours';
.search-input {
  background-color: $primary;
  border: 1px solid darken($primary, 5);
  padding: 0.5rem 0;
  .input {
    color: $text;
    background-color: $primary;
    border: none;
    width: 100%;
    font-size: 1.25rem;
    padding: 0.5rem 0;
    text-indent: 10px;
  }
  .input::placeholder {
    color: darken($text, 10);
  }
}
</style>
