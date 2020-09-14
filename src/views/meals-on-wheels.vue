<template>
  <div class="main">
    <AddForm v-if="addform" @add-client="AddClient" ref="addClient" />
    <DeleteForm v-if="deleteform" :client="selected" :delete="DeleteClient" />
    <EditForm v-if="editform" :client="selected" />
    <ContextMenu
      :client="selected"
      :edituser="ShowEditForm"
      :deleteuser="ShowDeleteForm"
      :adduser="ShowAddForm"
    />
    <div :class="{ sidebar: sidebarClosed }">
      <Sidebar @WeekChanged="WeekHandler" @close="sidebarHandler" />
    </div>
    <div class="parent" :class="{ grow: sidebarClosed, freeze: formOpen }">
      <div class="top">
        <div class="bar">
          <BackButton v-if="sidebarClosed" :check="CheckSave" />
          <SignOutButton class="sign-out" :check="CheckSave" />
          <fa-icon
            :icon="['fas', 'sync']"
            class="refresh-icon"
            :class="{ spin: refresh }"
            @click="refreshMethod()"
          />
        </div>
        <ButtonIcon
          :icon="saveicon"
          prefix="fas"
          :pulse-on-hover="true"
          :spin="spin"
          class="btn save-btn"
          @click.native="Save()"
        >
          Save
        </ButtonIcon>
        <SearchBar :value="filter" @update="filterUpdate" class="search" />
      </div>
      <div class="title">
        <div class="section info">
          <div class="forename">Forename</div>
          <div class="surname">Surname</div>
          <div class="address">Address</div>
        </div>
        <div class="section days">
          <div class="day">Mon</div>
          <div class="day">Tue</div>
          <div class="day">Wed</div>
          <div class="day">Thu</div>
          <div class="day">Fri</div>
        </div>
      </div>
      <div class="clients" id="clients">
        <div
          class="client"
          v-for="(client, i) in clientsFilter"
          :key="i"
          :id="client.id"
          :class="{ selected: IsSelected(client.id) }"
          @click="Selected(client.id)"
        >
          <div class="section info">
            <div class="forename">{{ client.forename }}</div>
            <div class="surname">{{ client.surname }}</div>
            <div class="address">{{ client.address }}</div>
          </div>
          <div class="section days">
            <div
              class="day tag-group"
              v-for="(day, j) in client.days"
              :key="j"
              :id="i"
            >
              <div class="tag">M: {{ day.main }}</div>
              <div class="tag">V: {{ day.veg }}</div>
              <div class="tag">S: {{ day.soup }}</div>
              <div class="tag">P: {{ day.pudding }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="buttons" :class="{ move: !sidebarClosed }">
        <ButtonIcon
          prefix="fas"
          icon="plus"
          :rotate-on-hover="true"
          class="add-btn btn"
          @click.native="ShowAddForm()"
        >
          Add Client
        </ButtonIcon>
        <ButtonIcon
          prefix="fas"
          icon="user-edit"
          :pulse-on-hover="true"
          class="edit-btn btn"
          @click.native="ShowEditForm()"
        >
          edit Client
        </ButtonIcon>
        <ButtonIcon
          prefix="fas"
          icon="minus"
          :rotate-on-hover="true"
          class="delete-btn btn"
          @click.native="ShowDeleteForm()"
        >
          delete Client
        </ButtonIcon>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneDeep, isEqual } from 'lodash';
export default {
  name: 'MealsOnWheels',
  components: {
    Sidebar: () => import('../components/side-bar'),
    SignOutButton: () => import('../components/sign-out-button'),
    BackButton: () => import('../components/back-button'),
    SearchBar: () => import('../components/search-bar'),
    ContextMenu: () => import('../components/context-menu'),
    AddForm: () => import('../components/add-client-week'),
    DeleteForm: () => import('../components/delete-form'),
    EditForm: () => import('../components/edit-form-week'),
    ButtonIcon: () => import('../components/button-&-Icon')
  },
  data() {
    return {
      week: {},
      sidebarClosed: true,
      clients: [],
      options: ['main', 'veg', 'soup', 'pudding'],
      selected: {},
      filter: '',
      refresh: false,
      cache: {},
      saveicon: 'cloud-upload-alt'
    };
  },
  computed: {
    clientsFilter() {
      return this.filter.length == 0
        ? this.clients
        : this.clients.filter(
            client =>
              client.forename.toLowerCase().includes(this.filter) ||
              client.surname.toLowerCase().includes(this.filter)
          );
    },
    addform() {
      let obj = this.$store.state.formStatus;
      return obj.active && obj.type == 'add';
    },
    deleteform() {
      let obj = this.$store.state.formStatus;
      return obj.active && obj.type == 'delete';
    },
    editform() {
      let obj = this.$store.state.formStatus;
      return obj.active && obj.type == 'edit';
    },
    formOpen() {
      return this.$store.state.formStatus.active;
    },
    NeedToSave() {
      return !isEqual(this.cache, this.week);
    },
    spin() {
      if (this.saveicon == 'spinner') {
        return true;
      }
      return false;
    }
  },
  methods: {
    WeekHandler(e) {
      // /weeks?date=
      if (e != null) {
        let date = e.start
          .toLocaleDateString('en-GB')
          .split('/')
          .join('-');
        this.$http
          .get(`weeks?date=${date}`)
          .then(Response => {
            this.week = Response.data;
            this.cache = cloneDeep(this.week);
            this.getClients();
          })
          .catch(e => {
            this.SendNotification(e, 'error', 5000);
          });
      }
    },
    sidebarHandler(e) {
      this.sidebarClosed = e;
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
    getClients() {
      this.clients = [];
      this.week.data.forEach(client => {
        this.$http.get(`/clients/${client.id}`).then(Response => {
          if (!('error' in Response.data)) {
            Response.data.days = client.days;
            this.clients.push(Response.data);
          }
        });
      });
    },
    HasMain(id, day) {
      let client = this.clients.filter(client => client.id == id)[0];
      return (
        client.days[day].main > 1 ||
        client.days[day].veg > 1 ||
        client.days[day].soup > 1
      );
    },
    IsSelected(id) {
      return this.selected.id == id;
    },
    Selected(id) {
      if (id != this.selected.id) {
        this.selected = this.clients.filter(client => client.id == id)[0];
      } else {
        this.selected = {};
      }
    },
    filterUpdate(e) {
      this.filter = e.value;
    },
    refreshMethod() {
      this.refresh = true;
      this.$http
        .get(`weeks?date=${this.week.startDate}`)
        .then(Response => {
          this.week = Response.data;
          this.cache = cloneDeep(this.week);
          this.getClients();
        })
        .catch(e => {
          this.SendNotification(e, 'error', 5000);
        });
      setTimeout(() => {
        this.refresh = false;
      }, 750);
    },
    ShowAddForm() {
      this.$store.commit('formStatus', { active: true, type: 'add' });
    },
    ShowEditForm() {
      if (Object.keys(this.selected).length > 0) {
        this.$store.commit('formStatus', { active: true, type: 'edit' });
      } else {
        this.SendNotification('Please select a client', 'warning');
      }
    },
    ShowDeleteForm() {
      if (Object.keys(this.selected).length > 0) {
        this.$store.commit('formStatus', { active: true, type: 'delete' });
      } else {
        this.SendNotification('Please select a client', 'warning');
      }
    },
    AddClient(e) {
      let found = false;
      this.clients.forEach(client => {
        if (client.id == e) {
          this.SendNotification('Client alread added', 'warning', 3500);
          found = true;
        }
      });
      if (!found) {
        this.$refs.addClient.close();
        this.$http
          .get(`/clients/${e}`)
          .then(Response => {
            let daysArray = [];
            for (let i = 0; i < 5; i++) {
              daysArray.push({ main: 0, pudding: 0, soup: 0, veg: 0 });
            }
            this.week.data.push({ days: daysArray, id: e });
            let client = Response.data;
            client.days = daysArray;
            this.clients.push(client);
            this.Selected(e);
            this.Save();
            setTimeout(() => {
              let div = document.getElementById('clients');
              div.scrollTop = div.scrollHeight;
            }, 10);
          })
          .catch(e => this.SendNotification(e, 'error', 5000));
      }
    },
    DeleteClient() {
      this.$http
        .delete('/weeks', {
          data: {
            WeekStartDate: this.week.startDate,
            ClientId: this.selected.id
          }
        })
        .then(Response => {
          if ('message' in Response.data) {
            this.SendNotification('Client deleted from week', 'success', 3500);
            this.refreshMethod();
            this.selected = {};
          } else {
            this.SendNotification(Response.data.error, 'error', 3500);
          }
        })
        .catch(e => this.SendNotification(e, 'error', 5000));
    },
    Save() {
      this.saveicon = 'spinner';
      this.$http
        .put('/weeks', { ...this.week })
        .then(Response => {
          if ('complete' in Response.data) {
            setTimeout(() => {
              this.SendNotification('Saved!', 'success', 3500);
              this.cache = cloneDeep(this.week);
              this.saveicon = 'cloud-upload-alt';
            }, 1000);
          } else {
            this.SendNotification(Response.data, 'warning', 3500);
            this.saveicon = 'cloud-upload-alt';
          }
        })
        .catch(e => {
          this.SendNotification(e, 'error', 3500);
          this.saveicon = 'cloud-upload-alt';
        });
    },
    CheckSave() {
      if (this.NeedToSave) {
        this.SendNotification('Please save changes', 'warning', 3500);
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/utilities';
@import '~styles/mixins';

.main {
  @include transition;
  width: 100vw;
  display: flex;
}
.freeze {
  pointer-events: none;
}
.sidebar {
  @include transition;
  width: 80px;
}
.parent {
  @include transition;
  position: absolute;
  top: 0;
  right: 0;
  max-width: calc(100vw - 400px);
  width: fill;
  height: 100vh;
  display: flex;
  align-content: center;
  flex-direction: column;
  overflow: hidden;
}
.grow {
  max-width: calc(100vw - 80px);
}
.title {
  display: flex;
  width: inherit;
  margin-right: 2rem;
  margin-left: 2rem;
  background-color: $secondary;
  color: $text;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
}
.clients {
  @include transition;
  scroll-behavior: smooth;
  display: flex;
  width: inherit;
  flex-direction: column;
  margin-right: 2rem;
  margin-left: 2rem;
  background-color: $primary;
  color: $text;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  height: 100vh;
  overflow: auto;
  .client:nth-child(even) {
    background-color: lighten($primary, 5);
  }
  .client {
    @include transition;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      cursor: pointer;
      background-color: darken($primary, 5);
    }
  }
}
.selected {
  background-color: $green !important;
}
.section {
  display: flex;
  margin: 1rem 0;
}
.days {
  width: 60%;
  .day {
    display: flex;
    width: 20%;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    text-align: center;
  }
  .input {
    border: 1px solid $green;
    text-align: center;
    width: 40px;
    text-indent: 0;
    margin-right: 0.5rem;
  }
}
.info {
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    display: flex;
    justify-content: center;
    align-content: center;
    text-align: center;
  }
  .forename {
    padding: 0 0.5rem;
    width: 20%;
  }
  .surname {
    padding: 0 0.5rem;
    width: 20%;
  }
  .address {
    padding: 0 0.5rem;
    width: 60%;
  }
}
.top {
  display: flex;
  width: 100%;
  align-items: center;
}
.bar {
  display: flex;
  align-items: center;
  margin: 1rem 2rem;
  width: 400px;
  background-color: $primary;
  border-radius: 25px;
  .sign-out {
    margin-left: 1rem;
  }
}
.tag-group {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  font-size: 1rem;
  .tag {
    display: inline-block;
    padding: 0.5rem 1rem;
    margin-left: 1rem;
    margin-bottom: 1rem;
    border-radius: 25px;
    background-color: $secondary;
  }
}
.search {
  @include transition;
  display: flex;
  align-content: center;
  margin-left: auto;
  margin-right: 2rem;
}
.buttons {
  @include transition;
  display: flex;
  margin: 1rem 2rem;
  justify-content: center;
  align-items: center;
  width: calc(100vw - 80px - 4rem);
  .btn {
    font-size: 1.25rem;
    margin-right: 1rem;
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
.move {
  width: 65ch;
}
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
.spin {
  @include transition;
  @include transform(rotate(360deg));
}
.save-btn {
  border: 1px solid $blue;
  background-color: $blue;
  border-radius: 15px;
  font-size: 1.25rem;
  height: 50px;
  min-width: 150px;
}
</style>
