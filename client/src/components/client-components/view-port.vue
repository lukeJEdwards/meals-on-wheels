<template>
  <div class="view-port" ref="viewport">
    <div class="titles">
      <div class="name" :class="{ small: !large }">Forename</div>
      <div class="name" :class="{ small: !large }">Surname</div>
      <div class="address" :class="{ small: !large }">Address</div>
      <div class="pc" :class="{ small: !large }">Postcode</div>
      <div class="tag-group" v-if="large">Comments</div>
      <div class="tag-group" v-if="large">Dietary Requirements</div>
    </div>
    <Search @filter="filterUpdate" />
    <Loading v-if="!loaded" />
    <div class="clients" v-if="loaded">
      <Client
        v-for="client in clients"
        :id="client._id"
        :key="client._id"
        :selected="selected(client._id)"
        @click="select"
        :large="large"
      />
    </div>
  </div>
</template>

<script>
import { debounce } from "debounce";
export default {
  name: "ViewPort",
  components: {
    Search: () => import("../search/search"),
    Loading: () => import("../search/loading"),
    Client: () => import("./client"),
  },
  props: {
    windowWidth: { type: Number, required: true },
  },
  data() {
    return {
      clients: [],
      loaded: false,
      filter: "",
      width: -1,
      selectedClient: {
        _id: "",
      },
    };
  },
  computed: {
    large() {
      return this.width > 1000;
    },
  },
  watch: {
    filter() {
      this.loaded = false;
      this.getData();
    },
    windowWidth() {
      this.width = this.$refs.viewport.clientWidth;
    },
  },
  methods: {
    filterUpdate(filter) {
      this.filter = filter;
    },
    selected(id) {
      return this.selectedClient._id == id;
    },
    select(info) {
      console.log(info);
      this.selectedClient._id == info._id
        ? (this.selectedClient = { _id: "" })
        : (this.selectedClient = info);
      this.$emit("client", this.selectedClient);
    },
    getData: debounce(function() {
      this.$axios
        .get(`/clients?filter=${this.filter}`)
        .then((Response) => {
          this.clients = Response.data;
          this.loaded = true;
        })
        .catch((err) => console.log(err));
    }, 1500),
  },
  mounted() {
    this.getData();
    this.width = this.$refs.viewport.clientWidth;
  },
};
</script>

<style lang="scss" scoped>
.view-port {
  @include transition-slow;
  display: flex;
  position: relative;
  flex-direction: column;
  background-color: $primary;
  margin: 0 1rem;
  margin-bottom: 1rem;
  border-radius: $radius;
  height: 100%;
  min-width: 280px;
  width: 100%;
  overflow: hidden;
  .clients {
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
}
.titles {
  display: flex;
  background-color: $secondary;
  border-top-left-radius: $radius;
  border-top-right-radius: $radius;
  width: 100%;
  div {
    padding: 1rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    justify-content: center;
    font-size: clamp(0.8rem, 2.5vw, 1.5rem);
  }
  .name {
    width: 12.5%;
  }
  .pc {
    width: 10%;
  }
  .address {
    width: 20%;
  }
  .tag-group {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 22.5%;
    .tag {
      background-color: darken($primary, 5);
      padding: 0.5rem 1rem;
      border-radius: 6px;
      margin: 0 0.5rem;
    }
  }
  .small {
    width: 25%;
  }
}
</style>
