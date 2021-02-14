<template>
  <div class="viewport">
    <div class="titles">
      <div class="title name">Forename</div>
      <div class="title name">Surname</div>
      <div class="title address">Address</div>
      <div class="title postcode">Postcode</div>
      <div class="title tag-group">Comment</div>
      <div class="title tag-group">Dietary requirements</div>
    </div>
    <div class="search">
      <fa-icon icon="search" class="icon" />
      <input
        v-model="filter"
        type="text"
        class="search-input"
        placeholder="Search..."
      />
    </div>
    <div class="data">
      <div class="rows">
        <Row
          v-for="client in get_filtered_clietns"
          :key="client._id"
          :client="client"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { debounce } from "debounce";
export default {
  name: "ClientViewport",
  components: {
    Row: () => import("./client_row")
  },
  computed: {
    ...mapState(["clients"]),
    ...mapGetters(["get_filtered_clietns"]),
    filter: {
      get() {
        return this.$store.state.filter;
      },
      set: debounce(function(value) {
        this.$store.commit("set_filter", value);
      }, 500)
    }
  }
};
</script>

<style lang="scss" scoped>
.viewport {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 90vw;
  color: $text;
  margin: 1rem 0;
  height: 100%;
  overflow: hidden;
  .name {
    width: 10%;
  }
  .address {
    width: 20%;
  }
  .postcode {
    width: 10%;
  }
  .tag-group {
    width: 25%;
  }
}
.titles {
  position: relative;
  display: flex;
  background-color: $secondary-background;
  border-top-left-radius: $border-radius;
  border-top-right-radius: $border-radius;

  .title {
    position: relative;
    display: flex;
    justify-content: center;
    padding: 1rem 0;
  }
}
.search {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90vw;
  border-bottom: 3px solid $secondary-background;
  background-color: $main-background;
  .icon {
    font-size: 1.25rem;
    padding: 0 1rem;
  }
  .search-input {
    position: relative;
    padding: 1rem;
    border: none;
    background-color: $main-background;
    width: 100%;
    color: $text;
    font-size: 1.25rem;
    &::placeholder {
      color: darken($text, 20);
    }
  }
}
.data {
  position: relative;
  display: flex;
  background-color: $main-background;
  overflow: auto;
  border-bottom-left-radius: $border-radius;
  border-bottom-right-radius: $border-radius;
  height: 100%;
  .rows {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: transparent;
}
::-webkit-scrollbar {
  width: 10px;
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  background-clip: content-box;
  border-radius: 10px;
  background-color: rgb(206, 206, 206);
}
</style>
