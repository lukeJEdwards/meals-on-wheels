<template>
  <div>
    <input
      class="input search-input"
      type="search"
      placeholder="Search for
    client"
      :value="value"
      @input="OnChange"
      :style="{ width: this.height + 'vw' }"
    />
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    value: { type: String, required: true },
    height: { type: Number, required: false, default: 30 }
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
  min-width: 200px;
}
</style>
