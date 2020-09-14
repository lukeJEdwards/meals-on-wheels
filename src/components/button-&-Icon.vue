<template>
  <button
    type="button"
    @mouseenter="Start"
    @mouseleave="End"
    :class="{ 'minus-button': isMinus }"
  >
    <fa-icon
      :icon="[prefix, icon]"
      :id="icon"
      :spin="spin"
      :class="{
        rotate: HoverIsRotate,
        pluse: HoverIsPulse,
        'minus-rotate': MinusRotate,
        minus: isMinus,
        icon: !isMinus,
        transition: transition
      }"
    />
    <fa-icon
      :icon="[prefix, icon]"
      :id="icon"
      class="minus"
      v-if="isMinus"
      :class="{
        'anti-minus-rotate': MinusRotate,
        minus: isMinus
      }"
    />

    <div><slot></slot></div>
  </button>
</template>

<script>
export default {
  name: 'ButtonAndIcon',
  props: {
    prefix: { type: String, required: true },
    icon: { type: String, required: true },
    rotateOnHover: { type: Boolean, required: false, default: false },
    pulseOnHover: { type: Boolean, required: false, default: false },
    transition: { type: Boolean, required: false, default: true },
    spin: { type: Boolean, required: false, default: false }
  },
  data() {
    return {
      hovered: false
    };
  },
  computed: {
    isMinus() {
      return this.icon == 'minus';
    },
    HoverIsRotate() {
      return this.hovered && this.rotateOnHover && !this.isMinus;
    },
    MinusRotate() {
      return this.hovered && this.isMinus;
    },
    HoverIsPulse() {
      return this.hovered && this.pulseOnHover;
    }
  },
  methods: {
    Start() {
      this.hovered = true;
    },
    End() {
      this.hovered = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/mixins';
.icon {
  @include transition;
  font-size: 1rem;
  padding: 0.5rem 1rem;
}
.minus {
  @include transition;
  position: absolute;
  left: 1rem;
  font-size: 1rem;
}
.minus-button {
  padding: 0.5rem 0;
  padding-left: calc(2rem + 14px);
  padding-right: 1rem;
}
button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 3px 5px 5px 0px rgba(0, 0, 0, 0.2);
  div {
    padding-right: 1rem;
  }
}
.transition {
  @include transition;
}
.rotate {
  @include transform(rotate(-90deg));
}
.pluse {
  @include transform(scale(1.25, 1.25));
}
.minus-rotate {
  @include transform(rotate(45deg));
}
.anti-minus-rotate {
  @include transform(rotate(-45deg));
}
</style>
