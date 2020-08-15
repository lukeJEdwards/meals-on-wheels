<template>
  <div>
    <EditForm :client="currentUser" v-if="editform" />
    <DeleteForm :client="currentUser" v-if="deleteform" />
    <AddForm v-if="addform" />
    <div class="flex-container cols main" :class="{ freeze: formOpen }">
      <div class="back-buttons mx-1">
        <BackButton />
        <SignOutButton />
        <fa-icon
          :icon="['fas', 'sync']"
          class="refresh-icon"
          :class="{ rotate: refreshIcon }"
          @click="refresh()"
        />
      </div>
      <SearchBar :value="filter" @update="filterUpdate" class="search" />
      <div class="flex-container titles">
        <p class="ten my-1" :class="{ 'twenty-five': !CheckSize }">Forename</p>
        <p class="ten my-1" :class="{ 'twenty-five': !CheckSize }">Surname</p>
        <p class="twenty my-1" :class="{ 'twenty-five': !CheckSize }">
          Address
        </p>
        <p class="ten my-1" :class="{ 'twenty-five': !CheckSize }">Postcode</p>
        <p class="thirty my-1" v-if="CheckSize">Comments</p>
        <p class="thirty my-1" v-if="CheckSize">Dietary Requirements</p>
      </div>
      <div class="flex-container cols clients">
        <div
          class="flex-container client py-2"
          v-for="(client, i) in clients"
          :key="i"
          :id="client.id"
          :class="{ 'active-client': isClientActive(client.id) }"
          @click="Slected($event.currentTarget.id)"
          tabindex="0"
        >
          <p class="ten" :class="{ 'twenty-five': !CheckSize }">
            {{ client.forename }}
          </p>
          <p class="ten" :class="{ 'twenty-five': !CheckSize }">
            {{ client.surname }}
          </p>
          <p class="twenty" :class="{ 'twenty-five': !CheckSize }">
            {{ client.address }}
          </p>
          <p class="ten" :class="{ 'twenty-five': !CheckSize }">
            {{ client.postcode }}
          </p>
          <div class="thirty tag-group" v-if="CheckSize">
            <p class="tag" v-for="(comment, i) in client.comments" :key="i">
              {{ comment }}
            </p>
          </div>
          <div class="thirty tag-group" v-if="CheckSize">
            <p
              class="tag"
              v-for="(requirement, i) in client.dietaryRequirements"
              :key="i"
            >
              {{ requirement }}
            </p>
          </div>
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
      <div class="flex-container clitent-buttons">
        <ButtonAndIcon
          prefix="fas"
          icon="plus"
          :rotate-on-hover="true"
          class="m-1 btn add-btn"
          @click.native="AddUser()"
        >
          Add Clinet
        </ButtonAndIcon>
        <ButtonAndIcon
          prefix="fas"
          icon="user-edit"
          :pulse-on-hover="true"
          class="m-1 btn edit-btn"
          @click.native="openEditForm()"
        >
          Edit Client
        </ButtonAndIcon>
        <ButtonAndIcon
          prefix="fas"
          icon="minus"
          :rotate-on-hover="true"
          class="m-1 btn delete-btn"
          @click.native="DeleteUser()"
        >
          Delete Client
        </ButtonAndIcon>
      </div>
    </div>
  </div>
</template>

<script>
import SignOutButton from '../components/sign-out-button';
import BackButton from '../components/back-button';
import SearchBar from '../components/search-bar';
import EditForm from '../components/edit-form';
import DeleteForm from '../components/delete-form';
import ButtonAndIcon from '../components/button-&-Icon';
import AddForm from '../components/add-form';
export default {
  name: 'ClientForm',
  components: {
    SignOutButton,
    BackButton,
    SearchBar,
    EditForm,
    ButtonAndIcon,
    DeleteForm,
    AddForm
  },
  data() {
    return {
      currentUser: {},
      isActive: false,
      clients: [],
      startIndex: 0,
      filter: '',
      showLoadButton: true,
      refreshIcon: false,
      windowWidth: window.innerWidth
    };
  },
  computed: {
    editform: function() {
      let obj = this.$store.state.formStatus;
      return obj.active && obj.type == 'edit';
    },
    deleteform: function() {
      let obj = this.$store.state.formStatus;
      return obj.active && obj.type == 'delete';
    },
    addform() {
      let obj = this.$store.state.formStatus;
      return obj.active && obj.type == 'add';
    },
    formOpen() {
      return this.$store.state.formStatus.active;
    },
    CheckSize() {
      return this.windowWidth > 1000;
    }
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
          console.log(Response);
          if ('clientsdata' in Response.data) {
            Response.data.clientsdata.forEach(client =>
              this.clients.push(client)
            );
            this.showLoadButton = !Response.data.status;
            this.startIndex += 15;
          } else {
            this.SendNotification(Response.data, 'error', 3000);
          }
        })
        .catch(e => {
          this.SendNotification(e, 'error', 10000);
        });
    },
    FilterClients() {
      this.showLoadButton = false;
      this.removeCurrentClient(this.currentUser.id);
      this.$http
        .get(`clients?filter=${this.filter}`)
        .then(Response => {
          this.clients = Response.data;
        })
        .catch(e => {
          this.SendNotification(e, 'error', 10000);
        });
    },
    FindUser(id) {
      return this.clients.filter(client => client.id == id)[0];
    },
    removeCurrentClient() {
      if (Object.keys(this.currentUser).length > 0) {
        document
          .getElementById(this.currentUser.id)
          .classList.remove('active-client');
        document.getElementById(this.currentUser.id).classList.add('client');
      }
      this.currentUser = {};
    },
    Slected(id) {
      if (id != this.currentUser.id) {
        this.currentUser = this.FindUser(id);
        this.isActive = true;
      } else {
        this.isActive = false;
        this.currentUser = {};
      }
    },
    isClientActive(id) {
      return this.isActive && this.currentUser.id == id;
    },
    SendNotification(m, t, d = 2000, dis = true, p = 'top') {
      this.$toast.open({
        message: m,
        type: t,
        position: p,
        duration: d,
        pauseOnHover: true,
        dismissible: dis
      });
    },
    openEditForm() {
      if (Object.keys(this.currentUser).length > 0) {
        this.$store.commit('formStatus', { active: true, type: 'edit' });
      } else {
        this.SendNotification('Please select a client', 'warning');
      }
    },
    refresh() {
      this.clients = [];
      this.refreshIcon = true;
      this.showLoadButton = false;
      if (this.filter.length > 0) {
        this.FilterClients();
      } else {
        this.startIndex = 0;
        this.LoadMoreClients();
      }
      setTimeout(() => {
        this.refreshIcon = false;
        this.showLoadButton = this.filter.length < 1;
      }, 750);
    },
    DeleteUser() {
      if (Object.keys(this.currentUser).length > 0) {
        this.$store.commit('formStatus', { active: true, type: 'delete' });
      } else {
        this.SendNotification('Please select a client', 'warning');
      }
    },
    AddUser() {
      this.$store.commit('formStatus', { active: true, type: 'add' });
    },
    ResizeHandler(e) {
      this.windowWidth = e.target.innerWidth;
    }
  },
  created() {
    window.addEventListener('resize', this.ResizeHandler);
    this.LoadMoreClients();
  },
  destroyed() {
    window.removeEventListener('resize', this.ResizeHandler);
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/utilities';
@import '~styles/mixins';
.back-buttons {
  @include transition;
  display: flex;
  background-color: $primary;
  border-radius: 50px;
  margin-top: 1rem;
  margin-right: auto;
  width: 20vw;
  min-width: 200px;
  align-items: center;
  .refresh-icon {
    color: $text;
    font-size: 1.25rem;
    margin-left: auto;
    margin-right: 1rem;
    &:hover {
      cursor: pointer;
      color: darken($text, 10);
    }
  }
}
.rotate {
  @include transition;
  @include transform(rotate(360deg));
}
.main {
  align-items: flex-start;
}
.search {
  @include transition;
  width: 90vw;
  display: flex;
  align-content: center;
  justify-content: center;
  margin-left: 5vw;
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
  margin-left: 5vw;
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
  height: calc(100vh - 12rem - 80px);
  overflow-y: auto;
  margin-left: 5vw;
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
    background-color: $green !important;
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
.twenty-five {
  width: 25%;
}
.load-more {
  border: 1px solid $orange;
  &:hover {
    background-color: $orange;
  }
}
.clitent-buttons {
  width: 90vw;
  justify-content: flex-start;
  margin-left: 5vw;
  .btn {
    font-size: 1rem;
  }
  .add-btn {
    background-color: $green;
    border: 1px solid $green;
  }
  .edit-btn {
    background-color: $orange;
    border: 1px solid $orange;
  }
  .delete-btn {
    background-color: $red;
    border: 1px solid $red;
  }
}
.freeze {
  pointer-events: none;
}
.tag-group {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  .tag {
    display: inline-block;
    padding: 0.5rem 1rem;
    margin-left: 1rem;
    margin-bottom: 1rem;
    border-radius: 25px;
    background-color: $secondary;
  }
}
</style>
