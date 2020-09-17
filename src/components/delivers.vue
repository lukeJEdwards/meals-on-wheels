<template>
  <div class="base">
    <div class="title">Delivers</div>
    <div class="delivers">
      <div class="deliver" v-for="(deliver, i) in delivers" :key="i">
        <p>{{ deliver }}</p>
        <ButtonIcon
          v-if="!added(i)"
          icon="plus"
          rotate-on-hover
          class="btn add"
          type="add"
          @click.native="add(i)"
        >
          Add
        </ButtonIcon>
        <ButtonIcon
          v-if="added(i)"
          icon="minus"
          pulse-on-hover
          class="btn remove"
          type="delete"
          @click.native="remove(i)"
        >
          remove
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
    addedDelivers: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data() {
    return {
      delivers: []
    };
  },
  methods: {
    add(index) {
      this.addedDelivers.push(this.delivers[index]);
    },
    remove(index) {
      let found = this.addedDelivers.indexOf(this.delivers[index]);
      this.addedDelivers.splice(found, 1);
    },
    added(index) {
      return (
        this.addedDelivers.filter(deliver => deliver == this.delivers[index])
          .length > 0
      );
    }
  },
  mounted() {
    this.$http
      .get('/delivers')
      .then(Response => {
        this.delivers = Response.data.delivers.concat(Response.data.volunteers);
      })
      .catch(e => {
        this.$toast.open({ message: e, type: 'error', position: 'top' });
      });
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/colours';
@import '~styles/mixins';
.base {
  @include transition;
  display: flex;
  flex-direction: column;
  color: $text;
  box-shadow: 3px 5px 5px 0px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  background-color: $primary;
  margin-top: 1rem;
  height: 100%;
  overflow: hidden;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  padding: 1rem 0;
}
.delivers {
  display: flex;
  flex-direction: column;
  overflow: auto;
  .deliver {
    display: flex;
    justify-content: center;
    margin: 0.5rem 0;
    height: 100%;
    p {
      width: 15ch;
    }
  }
}
.btn {
  color: $text;
  border: none;
  border-radius: 6px;
  width: 125px;
  &:hover {
    cursor: pointer;
  }
}
.add {
  background-color: $green;
}
.remove {
  background-color: $red;
}
</style>
