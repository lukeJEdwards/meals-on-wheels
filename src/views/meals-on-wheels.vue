<template>
  <div class="main">
    <!-- <AddForm /> -->
    <div :class="{ sidebar: sidebarClosed }">
      <Sidebar @WeekChanged="WeekHandler" @close="sidebarHandler" />
    </div>
    <div class="parent" :class="{ grow: sidebarClosed }">
      <div class="top">
        <div class="bar">
          <BackButton v-if="sidebarClosed" />
          <SignOutButton class="sign-out" />
        </div>
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
      <div class="clients">
        <div
          class="client"
          v-for="(client, i) in clientsFilter"
          :key="i"
          :id="i"
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
      <div class="Buttons" :class="{ 'move-middle': sidebarClosed }">
        <ButtonIcon
          prefix="fas"
          icon="plus"
          :rotate-on-hover="true"
          class="my-1 btn add-btn"
          >Add client</ButtonIcon
        >
        <ButtonIcon
          prefix="fas"
          icon="user-edit"
          :pulse-on-hover="true"
          class="my-1 btn save-btn"
          >Edit client</ButtonIcon
        >
        <ButtonIcon
          prefix="fas"
          icon="minus"
          :rotate-on-hover="true"
          class="my-1 btn delete-btn"
          >Remove client</ButtonIcon
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MealsOnWheels',
  components: {
    Sidebar: () => import('../components/side-bar'),
    ButtonIcon: () => import('../components/button-&-Icon'),
    SignOutButton: () => import('../components/sign-out-button'),
    BackButton: () => import('../components/back-button'),
    SearchBar: () => import('../components/search-bar')
    // AddForm: () => import('../components/add-client-week')
  },
  data() {
    return {
      week: {},
      sidebarClosed: true,
      clients: [],
      options: ['main', 'veg', 'soup', 'pudding'],
      selected: {},
      filter: ''
    };
  },
  computed: {
    clientsFilter: function() {
      return this.filter.length == 0
        ? this.clients
        : this.clients.filter(
            client =>
              client.forename.toLowerCase().includes(this.filter) ||
              client.surname.toLowerCase().includes(this.filter)
          );
    }
  },
  methods: {
    WeekHandler(e) {
      // /weeks?date=
      let date = e.start
        .toLocaleDateString('en-GB')
        .split('/')
        .join('-');
      this.$http
        .get(`weeks?date=${date}`)
        .then(Response => {
          this.week = Response.data;
          this.getClients();
        })
        .catch(e => {
          this.SendNotification(e, 'error', 5000);
        });
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
      for (let i = 0; i < this.week.data.length; i++) {
        this.$http
          .get(`/clients/${this.week.data[i].id}`)
          .then(Response => {
            let client = Response.data;
            client.days = this.week.data[i].days;
            this.clients.push(client);
          })
          .catch(e => {
            this.SendNotification(e, 'error', 5000);
          });
      }
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
.Buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(60ch + 5rem);
  @include transition;
  .btn {
    font-size: 1.25rem;
  }
  .add-btn {
    border: 1px solid $green;
    background-color: $green;
  }
  .delete-btn {
    border: 1px solid $red;
    background-color: $red;
    margin-left: 1rem;
  }
  .save-btn {
    border: 1px solid $yellow;
    background-color: $yellow;
    margin-left: 1rem;
  }
}
.move-middle {
  width: 100%;
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
</style>
