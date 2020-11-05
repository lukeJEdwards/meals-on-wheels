<template>
  <div class="base">
    <div class="title">
      Deliverers
    </div>
    <div class="delivers">
      <div class="deliver" v-for="deliver in delivers" :key="deliver._id">
        <p>{{ deliver.name }}</p>
        <ButtonIcon
          icon="times"
          v-if="added(deliver._id)"
          type="delete"
          class="btn"
          @click.native="removeDeliver(deliver._id)"
          >Remove</ButtonIcon
        >
        <ButtonIcon
          icon="plus"
          type="add"
          rotateOnHover
          v-else
          class="btn"
          @click.native="addDeliver(deliver._id)"
        >
          Add
        </ButtonIcon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Delivers',
  components: {
    ButtonIcon: () => import('../components/button-&-Icon')
  },
  props: {
    currentWeek: { type: Object, required: true },
    currentDay: { type: Number, required: true }
  },
  data() {
    return {
      delivers: []
    };
  },
  computed: {
    haveData() {
      return this.currentDay > -1 && Object.keys(this.currentWeek).length > 0;
    },
    deliversIds() {
      return this.currentWeek.delivers[this.currentDay].delivers;
    }
  },
  methods: {
    added(id) {
      if (this.haveData) {
        return this.deliversIds.includes(id);
      }
    },
    addDeliver(id) {
      this.$emit('add-deliver', id);
    },
    removeDeliver(id) {
      this.$emit('remove-deliver', id);
    }
  },
  mounted() {
    this.$http
      .get('/delivers')
      .then(Response => (this.delivers = Response.data))
      .catch(err => console.log(err));
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/colours';
@import '~styles/mixins';
.base {
  display: flex;
  flex-direction: column;
  position: relative;
  height: inherit;
  overflow-y: hidden;
  background-color: $primary;
  border-radius: 6px;
  color: $text;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid $secondary;
  }
}
.delivers {
  display: flex;
  position: relative;
  flex-direction: column;
  overflow-y: auto;
  flex-grow: 1;
  .deliver {
    display: flex;
    align-items: center;
    margin: 1rem;
    p {
      width: 40%;
      font-size: clamp(1rem, 1.5vw, 1.5rem);
    }
    .btn {
      flex-grow: 1;
    }
  }
}
</style>
