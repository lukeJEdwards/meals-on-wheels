<template>
  <button
    class="icon-btn"
    :class="{
      add: type == 'add',
      edit: type == 'edit',
      delete: type == 'delete',
      default: type == 'default'
    }"
    @mouseenter="start()"
    @mouseleave="stop()"
  >
    <div class="content">
      <fa-icon :icon="['fas', icon]" class="icon" ref="icon" :spin="spin" />
      <div class="text">
        <slot></slot>
      </div>
    </div>
  </button>
</template>

<script>
export default {
  name: 'ButtonAndIcon',
  props: {
    icon: { type: String, required: true },
    rotateOnHover: { type: Boolean, required: false, default: false },
    pulseOnHover: { type: Boolean, required: false, default: false },
    transition: { type: Boolean, required: false, default: true },
    type: { type: String, required: false, default: 'default' },
    spin: { type: Boolean, required: false, default: false }
  },
  data() {
    return {
      angle: 0
    };
  },
  methods: {
    start() {
      this.rotateOnHover ? this.$refs.icon.classList.add('rotate') : null;
      this.pulseOnHover ? this.$refs.icon.classList.add('pluse') : null;
    },
    stop() {
      this.rotateOnHover ? this.$refs.icon.classList.remove('rotate') : null;
      this.pulseOnHover ? this.$refs.icon.classList.remove('pluse') : null;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/mixins';
@import '~styles/colours';

// transistion
.pluse {
  @include transform(scale(1.25, 1.25));
}
.rotate {
  @include transform(rotateZ(-90deg));
}

//formatting
.icon-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  color: $text;
  border: none;
  font-size: 1.25rem;
  box-shadow: 3px 5px 5px 0px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  &:hover {
    cursor: pointer;
  }
}
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
}
.text {
  padding-left: 1rem;
}
.icon {
  @include transition;
}

// colours
.add {
  background-color: $green;
  &:hover {
    background-color: darken($green, 5);
  }
}
.edit {
  background-color: $yellow;
  &:hover {
    background-color: darken($yellow, 5);
  }
}
.delete {
  background-color: $red;
  &:hover {
    background-color: darken($red, 5);
  }
}
.default {
  background-color: $blue;
  &:hover {
    background-color: darken($blue, 5);
  }
}
</style>
