<template>
  <div class="base">
    <div class="title">
      Edit Client
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClientEditForm'
};
</script>

<style lang="scss" scoped>
.base {
  @include transition;
  background-color: $primary;
  color: $text;
  border-radius: 6px;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1rem 0;
  font-size: 1.5rem;
  background-color: darken($primary, 5);
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
</style>
