<template>
  <div>
    <input
      class="input search-input"
      type="search"
      placeholder="Search for client"
      :value="value"
      @input="OnChange"
    />
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    value: { type: String, required: true }
  },
  methods: {
    OnChange: function(e) {
      this.$emit('update', e.target);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/utilities';
@import '~styles/mixins';
.search-input {
  @include transition;
  background-color: $primary;
  border: none;
  width: 30vw;
  min-width: 200px;
}
</style>
