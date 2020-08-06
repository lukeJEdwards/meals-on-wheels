<template>
  <div>
    <div class="flex-container cols">
      <div class="buttons mx-1">
        <BackButton />
        <SignOutButton />
      </div>
      <SearchBar :value="filter" @update="filterUpdate" />
      <div class="flex-container titles">
        <p class="ten my-1">Forename</p>
        <p class="ten my-1">Surname</p>
        <p class="twenty my-1">Address</p>
        <p class="ten my-1">Postcode</p>
        <p class="thirty my-1">Comments</p>
        <p class="thirty my-1">Dietary Requirements</p>
      </div>
      <div class="flex-container cols clients">
        <div
          class="flex-container client py-2"
          v-for="(client, i) in clients"
          :key="i"
          :id="client.id"
          @click="Slected($event.currentTarget.id)"
          tabindex="0"
        >
          <p class="ten">{{ client.forename }}</p>
          <p class="ten">{{ client.surname }}</p>
          <p class="twenty">{{ client.address }}</p>
          <p class="ten">{{ client.postcode }}</p>
          <p class="thirty">{{ client.comments }}</p>
          <p class="thirty">{{ client.dietaryRequirements }}</p>
        </div>
        <div class="my-2" v-if="showLoadButton">
          <button
            class="btn load-more px-3"
            type="button"
            @click="LoadMoreClients()"
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignOutButton from '../components/sign-out-button';
import BackButton from '../components/back-button';
import SearchBar from '../components/search-bar';
export default {
  name: 'ClientForm',
  components: {
    SignOutButton,
    BackButton,
    SearchBar
  },
  data() {
    return {
      currentUser: {},
      clients: [],
      startIndex: 0,
      error: '',
      filter: '',
      showLoadButton: true
    };
  },
  watch: {
    filter: function() {
      if (this.filter != '') {
        this.FilterClients();
      } else {
        this.clients = [];
        this.startIndex = 0;
        this.LoadMoreClients();
      }
    }
  },
  methods: {
    filterUpdate(e) {
      this.filter = e.value;
    },
    LoadMoreClients() {
      this.$http
        .get(`clients/${this.startIndex}/${this.startIndex + 15}`)
        .then(Response => {
          Response.data.clientsdata.forEach(client =>
            this.clients.push(client)
          );
          this.showLoadButton = !Response.data.status;
          this.startIndex += 15;
        })
        .catch(e => {
          this.error = e;
          console.log(e);
        });
    },
    FilterClients() {
      this.removeCurrentClient(this.currentUser.id);
      this.$http
        .get(`clients?filter=${this.filter}`)
        .then(Response => {
          this.clients = Response.data;
        })
        .catch(e => {
          this.error = e;
          console.log(e);
        });
    },
    FindUser(id) {
      return this.clients.filter(client => client.id == id)[0];
    },
    removeCurrentClient(id) {
      document.getElementById(id).classList.remove('active-client');
      document.getElementById(id).classList.add('client');
      this.currentUser = {};
    },
    Slected(id) {
      if (this.currentUser.id == id) {
        this.removeCurrentClient(this.currentUser.id);
      } else {
        if (Object.keys(this.currentUser).length > 0) {
          this.removeCurrentClient(this.currentUser.id);
        }
        this.currentUser = this.FindUser(id);
        document.getElementById(id).classList.add('active-client');
        document.getElementById(id).classList.remove('client');
      }
    }
  },
  created() {
    this.LoadMoreClients();
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/utilities';
@import '~styles/mixins';
.buttons {
  @include transition;
  display: flex;
  background-color: $primary;
  border-radius: 50px;
  margin-top: 1rem;
  margin-right: auto;
  width: 20vw;
  min-width: 200px;
}
.titles {
  @include transition;
  width: 90vw;
  text-align: center;
  background-color: $secondary;
  color: $text;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  margin-top: 1rem;
}
.clients {
  @include transition;
  width: 90vw;
  justify-content: flex-start;
  text-align: center;
  background-color: $primary;
  color: $text;
  border-bottom-right-radius: 25px;
  border-bottom-left-radius: 25px;
  height: calc(100vh - 10rem - 40px);
  overflow-y: auto;
  .client {
    &:hover {
      cursor: pointer;
      background: darken($primary, 5);
    }
  }
}
.active-client {
  background-color: $green;
  &:hover {
    cursor: pointer;
    background-color: $green;
  }
}
.ten {
  width: 10%;
}
.twenty {
  width: 20%;
}
.thirty {
  width: 30%;
}
.load-more {
  border: 1px solid $orange;
  &:hover {
    background-color: $orange;
  }
}
</style>
