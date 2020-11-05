<template>
  <div class="base" :class="{ close: closed }">
    <div class="title">
      <fa-icon :icon="['fas', 'times']" class="icon" @click="close()" />
      Add client
    </div>
    <Searchbar @search-value="FilterHandler" />
    <div class="results">
      <div class="no-results" v-if="noResults">
        <p>no clients found</p>
      </div>
      <div class="no-results" v-if="noSearch">
        <p>please search for a client</p>
      </div>
      <div v-if="noArray">
        <div class="client" v-for="(client, i) in clients" :key="i">
          <div class="name">{{ client.forename }}</div>
          <div class="name">{{ client.surname }}</div>
          <ButtonIcon
            :icon="getButtonIcon(i)"
            pulse-on-hover
            :type="getButtonType(i)"
            :class="{ Added: Added(i) }"
            @click.native="AddClient(i)"
            >{{ Added(i) ? 'Added' : 'Add' }}</ButtonIcon
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'debounce';
export default {
  name: 'AddForm',
  components: {
    Searchbar: () => import('../components/search-bar'),
    ButtonIcon: () => import('../components/button-&-Icon')
  },
  computed: {
    noSearch() {
      return this.filter == '';
    },
    noArray() {
      return this.clients instanceof Array;
    }
  },
  props: {
    addedClients: { type: Array, required: false, default: () => [] }
  },
  data() {
    return {
      clients: [],
      filter: '',
      noResults: false,
      closed: true
    };
  },
  watch: {
    filter: function() {
      this.filter == '' ? (this.clients = []) : this.getClients();
    }
  },
  methods: {
    FilterHandler(value) {
      this.filter = value;
    },
    getClients: debounce(function() {
      this.$http
        .get(`clients?filter=${this.filter.toLowerCase()}`)
        .then(Response => {
          this.clients = Response.data;
          this.clients.length < 1
            ? (this.noResults = true)
            : (this.noResults = false);
        })
        .catch(e => {
          this.$toast.open({ message: e, type: 'error', position: 'top' });
        });
    }, 500),
    Added(index) {
      return (
        this.addedClients.filter(
          client => client._id == this.clients[index]._id
        ).length > 0
      );
    },
    getButtonType(index) {
      return this.Added(index) ? 'default' : 'add';
    },
    getButtonIcon(index) {
      return this.Added(index) ? 'check-circle' : 'plus';
    },
    close() {
      this.closed = true;
      setTimeout(() => {
        this.$store.commit('formStatus', { active: false, type: '' });
      }, 750);
    },
    AddClient(index) {
      this.$emit('add-client', this.clients[index]);
    }
  },
  mounted() {
    setTimeout(() => {
      this.closed = false;
    }, 10);
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/colours';
@import '~styles/mixins';
.base {
  @include transition;
  position: absolute;
  display: flex;
  flex-direction: column;
  color: $text;
  background-color: lighten($primary, 10);
  width: 27vw;
  height: 27vw;
  min-width: 450px;
  min-height: 450px;
  margin-top: calc(40vh - 13.5vw);
  margin-left: 36.5vw;
  border-radius: 6px;
  font-size: 1.5rem;
  overflow: hidden;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
}
.icon {
  position: absolute;
  left: 0;
  top: 0;
  margin: 1rem;
  &:hover {
    cursor: pointer;
    color: darken($text, 10);
  }
}
.results {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  flex-grow: 1;
  overflow-y: auto;
  height: 10px;
}
.client {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  margin: 1rem 0.5rem;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.no-results {
  display: flex;
  justify-content: center;
  margin: auto 0;
  align-items: center;
}
.Added {
  pointer-events: none;
}
.close {
  @include transform(translateY(-100vh));
}
</style>
