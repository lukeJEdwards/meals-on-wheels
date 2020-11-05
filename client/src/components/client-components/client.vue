<template>
  <div class="client" :class="{ selected: selected }" @click="clicked">
    <Loading v-if="!loaded" />
    <div class="name" :class="{ small: !large }">{{ info.forename }}</div>
    <div class="name" :class="{ small: !large }">{{ info.surname }}</div>
    <div class="address" :class="{ small: !large }">{{ info.address }}</div>
    <div class="pc" :class="{ small: !large }">{{ info.postcode }}</div>
    <div class="tag-group" v-if="large">
      <div class="tag" v-for="(tag, i) in info.comments" :key="i">
        <span>{{ tag }}</span>
      </div>
    </div>
    <div class="tag-group" v-if="large">
      <span>{{ info.dietaryRequirements }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "client",
  props: {
    id: String,
    selected: Boolean,
    large: Boolean,
  },
  components: {
    Loading: () => import("../search/loading"),
  },
  data() {
    return {
      info: {},
      loaded: false,
    };
  },
  methods: {
    clicked() {
      this.$emit("click", this.info);
    },
  },
  mounted() {
    this.$axios
      .get(`/clients/${this.id}`)
      .then((Response) => {
        this.info = Response.data;
        this.loaded = true;
      })
      .catch((e) => console.log(e));
  },
};
</script>

<style lang="scss" scoped>
.client {
  display: flex;
  position: relative;
  width: 100%;
  padding: 2rem 0;
  font-size: 1.25rem;
  text-align: center;
  &:hover {
    cursor: pointer;
    background-color: $blue;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: clamp(0.8rem, 2vw, 1.25rem);
  }
  .name {
    width: 12%;
  }
  .pc {
    width: 11%;
  }
  .address {
    width: 20%;
  }
  .tag-group {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: 22%;
    flex-wrap: wrap;
    .tag {
      background-color: darken($primary, 5);
      padding: 0.5rem 1rem;
      border-radius: 6px;
      margin: 0.5rem;
      max-width: 100%;
      span {
        word-break: break-all;
      }
    }
  }
  .small {
    width: 25%;
  }
}
.selected {
  background-color: $green;
  &:hover {
    cursor: pointer;
    background-color: $green;
  }
}
</style>
