<template>
  <div class="bar">
    <BackButton :check="backCheck" />
    <SignOutButton :check="backCheck" />
    <fa-icon
      :icon="['fas', 'sync']"
      class="refresh-icon"
      :class="{ spin: iconSpin }"
      @click="newRefresh()"
    />
  </div>
</template>

<script>
export default {
  name: 'Bar',
  components: {
    BackButton: () => import('../components/back-button'),
    SignOutButton: () => import('../components/sign-out-button')
  },
  props: {
    refresh: { type: Function, required: false, default: () => {} },
    backCheck: {
      type: Function,
      required: false,
      default: () => true
    }
  },
  methods: {
    newRefresh() {
      this.refresh();
      this.iconSpin = true;
      setTimeout(() => {
        this.iconSpin = false;
      }, 750);
    }
  },
  data() {
    return { iconSpin: false };
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/colours';
@import '~styles/mixins';
.bar {
  @include transition;
  display: flex;
  align-items: center;
  background-color: $primary;
  color: $text;
  border-radius: 6px;
  box-shadow: 3px 5px 5px 0px rgba(0, 0, 0, 0.2);
  margin: 1rem;
  width: 20vw;
  min-width: 250px;
}
.refresh-icon {
  margin-right: 2rem;
  margin-left: auto;
  font-size: 1.5rem;
  &:hover {
    cursor: pointer;
    color: darken($text, 10);
  }
}
.spin {
  @include transition;
  @include transform(rotate(360deg));
}
</style>
