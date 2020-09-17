<template>
  <div class="base">
    <div class="titles">
      <div class="title name">Forename</div>
      <div class="title name">Surname</div>
      <div class="title address">Address</div>
      <div class="title tag-group" v-if="TooSmall">Comments</div>
      <div class="title tag-group" v-if="TooSmall">Dietary Requirements</div>
    </div>
    <searchBar
      place-holder-text="Search for clients..."
      @search-value="FilterHandler"
    />
    <div class="info">
      <div
        class="row"
        v-for="(client, i) in clients"
        :key="i"
        :class="{ selected: isSelected(i) }"
        @click="selectClient(i)"
      >
        <p class=" name">{{ client.forename }}</p>
        <p class=" name">{{ client.surname }}</p>
        <p class=" address">{{ client.address }}</p>
        <div class=" tag-group" v-if="TooSmall">
          <p v-for="tag in client.comments" :key="tag" class="tag">
            {{ tag }}
          </p>
        </div>
        <div class=" tag-group" v-if="TooSmall">
          <p v-for="tag in client.dietaryRequirements" :key="tag" class="tag">
            {{ tag }}
          </p>
        </div>
      </div>
      <div class="no-clients" v-if="noclients">
        <p>No Clients</p>
      </div>
      <div class="load-more" v-if="showLoadMore">
        <ButtonIcon icon="plus" pulse-on-hover @click.native="getClients()">
          Load More
        </ButtonIcon>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'debounce';
export default {
  name: 'ClientViewPort',
  components: {
    searchBar: () => import('../components/search-bar'),
    ButtonIcon: () => import('../components/button-&-Icon')
  },
  props: {
    currentClient: { type: Object, required: true }
  },
  data() {
    return {
      clients: [],
      startIndex: 0,
      selected: -1,
      windowWidth: window.innerWidth,
      filter: '',
      showLoadMore: true
    };
  },
  computed: {
    TooSmall() {
      return this.windowWidth > 900;
    },
    noclients() {
      return this.clients < 1;
    }
  },
  methods: {
    getClients() {
      this.$http
        .get(`/clients/${this.startIndex}/${this.startIndex + 15}`)
        .then(Response => {
          Response.data.clientsdata.forEach(client =>
            this.clients.push(client)
          );
          this.showLoadMore = !Response.data.status;
          this.startIndex += 15;
        })
        .catch(e => {
          this.$toast.open({
            message: e,
            type: 'error',
            position: 'top'
          });
        });
    },
    isSelected(index) {
      return (
        index == this.selected &&
        this.currentClient.id == this.clients[this.selected].id
      );
    },
    selectClient(index) {
      this.selected == index ? (this.selected = -1) : (this.selected = index);
      this.selected == -1
        ? this.$emit('current-client', {})
        : this.$emit('current-client', this.clients[index]);
    },
    WindowEventListener(e) {
      this.windowWidth = e.currentTarget.innerWidth;
    },
    FilterHandler(value) {
      this.filter = value;
      this.filterClients();
    },
    filterClients: debounce(function() {
      this.clients = [];
      this.filter != '' ? this.getFilterClients() : this.getClients();
    }, 500),
    getFilterClients() {
      this.startIndex = 0;
      this.showLoadMore = false;
      this.$http
        .get(`clients?filter=${this.filter.toLowerCase()}`)
        .then(Response => {
          this.clients = Response.data;
        })
        .catch(e => {
          this.$toast.open({ message: e, type: 'error', position: 'top' });
        });
    },
    refresh() {
      this.startIndex = 0;
      this.clients = [];
      this.showLoadMore = false;
      this.filter != '' ? this.filterClients() : this.getClients();
    }
  },
  mounted() {
    this.getClients();
  },
  created() {
    window.addEventListener('resize', this.WindowEventListener);
  },
  destroyed() {
    window.removeEventListener('resize', this.WindowEventListener);
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
  margin: 0 1rem;
  border-radius: 6px;
  overflow-y: hidden;
  box-shadow: 3px 5px 5px 0px rgba(0, 0, 0, 0.2);
  width: calc(100vw - 2rem);
  height: 100%;
  p:hover {
    cursor: auto;
  }
}
.titles {
  @include transition;
  display: flex;
  background-color: $secondary;
  width: 100%;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  .title {
    padding: 1rem 0;
  }
}
.info {
  @include transition;
  background-color: $primary;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  overflow-y: auto;
  height: 100%;

  .row {
    display: flex;
    padding: 1.5rem 0;
    &:hover {
      cursor: pointer;
      background-color: darken($blue, 5);
    }
  }
  .selected {
    background-color: $blue;
    &:hover {
      background-color: $blue;
    }
  }
}
.name {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 15%;
}
.address {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 20%;
}
.tag-group {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  .tag {
    background-color: darken($primary, 5);
    padding: 0.5rem 1rem;
    border-radius: 6px;
    margin: 0 0.5rem;
  }
}
.load-more {
  display: flex;
  justify-content: center;
  padding: 1rem 0;
}
.no-clients {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.5rem;
}
@media only screen and (max-width: 900px) {
  .name {
    width: 33%;
  }
  .address {
    width: 34%;
  }
}
</style>
