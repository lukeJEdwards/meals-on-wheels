<template>
  <div class="form" :class="{ close: closed }">
    <fa-icon :icon="['fas', 'times']" class="close-icon m-1" @click="close()" />
    <div class="title">
      <p>Add Client</p>
    </div>
    <SearchBar
      class="search-bar"
      :value="filter"
      @update="filterUpdate"
      :height="20"
    />
    <div class="info">
      <div
        class="client"
        v-for="(client, i) in FilteredClients"
        :key="i"
        :id="i"
      >
        <p>{{ client.name }}</p>
        <IconButton
          prefix="fas"
          icon="plus"
          :rotate-on-hover="true"
          :transition="true"
          class="add-icon"
          :id="i"
          @click.native="addClient(client.id)"
          >Add</IconButton
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddClientToWeek',
  components: {
    SearchBar: () => import('../components/search-bar'),
    IconButton: () => import('../components/button-&-Icon')
  },
  data() {
    return {
      filter: '',
      closed: true,
      clients: []
    };
  },
  computed: {
    FilteredClients: function() {
      return this.filter == ''
        ? this.clients
        : this.clients.filter(client =>
            client.name.toLowerCase().includes(this.filter)
          );
    }
  },
  methods: {
    filterUpdate(e) {
      this.filter = e.value;
    },
    close() {
      this.closed = true;
      setTimeout(() => {
        this.$store.commit('formStatus', { active: false, type: '' });
      }, 750);
    },
    getClients() {
      this.$http
        .get('/clients')
        .then(Response => {
          this.clients = Response.data.data;
        })
        .catch(e => this.$parent.SendNotification(e, 'error', 5000));
    },
    addClient(id) {
      this.$emit('add-client', id);
    }
  },
  mounted() {
    setTimeout(() => {
      this.closed = false;
    }, 10);
    this.getClients();
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/colours';
@import '~styles/mixins';
.form {
  @include transition;
  position: absolute;
  color: $text;
  background-color: lighten($primary, 10);
  width: 27vw;
  height: 27vw;
  min-width: 450px;
  min-height: 450px;
  margin-top: calc(40vh - 13.5vw);
  margin-left: 36.5vw;
  border-radius: 25px;
  font-size: 1.5rem;
  z-index: 1;
}
.close {
  @include transform(translateY(-100vh));
}
.title {
  text-align: center;
  border-bottom: 2px solid $primary;
  padding-top: 2rem;
}
.close-icon {
  position: absolute;
  margin: 1rem;
  &:hover {
    cursor: pointer;
    color: darken($text, 20);
  }
}
.search-bar {
  display: flex;
  justify-content: center;
  margin: 0.5rem 0;
}
.add-icon {
  border: 1px solid $green;
  background-color: $green;
  border-radius: 25px;
  height: 40px;
  margin-top: 0.5rem;
  margin-left: auto;
  margin-right: auto;
  color: $text;
  &:hover {
    cursor: pointer;
    border: 1px solid lighten($green, 5);
  }
}
.info {
  font-size: 1.25rem;
  height: calc(27vw - 8rem);
  justify-content: flex-start;
  overflow-y: auto;
  .client {
    display: flex;
    margin-left: 1rem;
    margin-top: 1rem;
    justify-content: center;
    align-items: center;
    p {
      width: 20ch;
      text-align: center;
    }
  }
}

@media only screen and (max-width: 1600px) {
  .form {
    margin-top: calc(40vh - 225px);
    margin-left: calc(50vw - 225px);
  }
  .info {
    height: calc(450px - 8rem);
  }
}
</style>
