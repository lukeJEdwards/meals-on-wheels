<template>
  <div class="loading">
    <fa-icon icon="spinner" spin class="icon" />
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style lang="scss" scoped>
.loading {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  .icon {
    font-size: 4rem;
  }
}
</style>
