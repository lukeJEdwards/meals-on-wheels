<template>
  <div class="form"></div>
</template>

<script>
export default {
  name: 'AddClientToWeek'
};
</script>

<style lang="scss" scoped>
@import '~styles/colours';
.form {
  position: absolute;
  color: $text;
  background-color: lighten($primary, 10);
  width: 27vw;
  height: 27vw;
  min-width: 450px;
  min-height: 450px;
  margin-top: calc(40vh - 13.5vw);
  margin-left: 36.5vw;
  border-radius: 25px;
  font-size: 1.5rem;
  z-index: 1;
}
.info {
  font-size: 1.25rem;
  height: calc(27vw - 4.5rem);
  justify-content: flex-start;
  overflow-y: auto;
  .input {
    border: 1px solid $green;
    &:hover {
      border: 1px solid lighten($green, 10);
    }
  }
}
@media only screen and (max-width: 1600px) {
  .add-form {
    margin-top: calc(40vh - 225px);
    margin-left: calc(50vw - 225px);
  }
  .info {
    height: calc(450px - 4.5rem);
  }
}
</style>
