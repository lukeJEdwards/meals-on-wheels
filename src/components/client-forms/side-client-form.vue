<template>
  <div class="client-form" :class="{ open: open, close: !open }">
    <div class="title">
      {{ title }}
    </div>
    <AddForm v-if="addForm" />
  </div>
</template>

<script>
export default {
  name: 'SideClientForm',
  components: {
    AddForm: () => import('./add-form')
  },
  computed: {
    addForm() {
      return this.type == 'add';
    },
    title() {
      if (this.type == 'add') {
        return 'Add new client';
      }
      if (this.type == 'edit') {
        return 'Edit client';
      } else {
        return 'Delete client';
      }
    }
  },
  props: {
    type: { type: String, required: true },
    open: { type: Boolean, required: true }
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/mixins';
@import '~styles/colours';
.client-form {
  @include transition;
  margin-right: 1rem;
  overflow-y: hidden;
  height: 100%;
}
.open {
  width: 30vw;
}
.close {
  opacity: 0;
  width: 0vw;
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
  color: $text;
}
</style>
