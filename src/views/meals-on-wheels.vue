<template>
  <div class="main">
    <AddForm
      :added-clients="currentClients"
      v-if="addform"
      @add-client="addClient"
    />
    <EditForm :client="currentClient" v-if="editform" />
    <DeleteForm
      :client="currentClient"
      v-if="deleteform"
      :delete="deleteClient"
    />
    <Sidebar
      @week-change="weekHandler"
      @sidebar-toggle="toggleHandler"
      :class="{ freeze: formOpen }"
    />
    <div class="right" :class="{ shrink: toggle }">
      <div class="top" :class="{ freeze: formOpen }">
        <Bar :refresh="refresh" :back-check="checkForSave" />
        <ButtonIcon
          :icon="saveIcon"
          pulse-on-hover
          @click.native="save()"
          class="save"
          :spin="spin"
        >
          Save
        </ButtonIcon>
      </div>
      <Viewport
        :week-date="activeWeek"
        :current-clients="currentClients"
        @client-change="clientHandler"
        @clients-changed="clientsHandler"
        ref="viewport"
        :class="{ freeze: formOpen }"
      />
      <div class="buttons" :class="{ freeze: formOpen }">
        <ButtonIcon
          icon="plus"
          rotate-on-hover
          type="add"
          @click.native="openAddForm()"
        >
          Add
        </ButtonIcon>
        <ButtonIcon
          icon="user-edit"
          pulse-on-hover
          type="edit"
          @click.native="openEditForm()"
        >
          Edit
        </ButtonIcon>
        <ButtonIcon
          icon="minus"
          pulse-on-hover
          type="delete"
          @click.native="openDeleteForm()"
        >
          Delete
        </ButtonIcon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MealsOnWheels',
  components: {
    Bar: () => import('../components/bar'),
    Sidebar: () => import('../components/side-bar'),
    Viewport: () => import('../components/meals-on-wheels-viewport'),
    ButtonIcon: () => import('../components/button-&-Icon'),
    AddForm: () => import('../components/add-client-week'),
    EditForm: () => import('../components/edit-form-week'),
    DeleteForm: () => import('../components/delete-form')
  },
  data() {
    return {
      activeWeek: {},
      toggle: false,
      currentClient: {},
      currentClients: [],
      saveIcon: 'cloud-upload-alt',
      spin: false
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
    }
  },
  methods: {
    weekHandler(week) {
      this.activeWeek = week;
    },
    toggleHandler(state) {
      this.toggle = state;
    },
    clientHandler(client) {
      this.currentClient = client;
    },
    clientsHandler(clients) {
      this.currentClients = clients;
    },
    openAddForm() {
      this.$store.commit('formStatus', { active: true, type: 'add' });
    },
    addClient(client) {
      client.days = [];
      for (let i = 0; i < 5; i++) {
        client.days.push({
          main: 0,
          veg: 0,
          soup: 0,
          pudding: 0
        });
      }
      this.currentClients.push(client);
      this.$refs.viewport.scrollClients();
    },
    openEditForm() {
      if (Object.keys(this.currentClient).length > 0) {
        this.$store.commit('formStatus', { active: true, type: 'edit' });
      }
    },
    openDeleteForm() {
      if (Object.keys(this.currentClient).length > 0) {
        this.$store.commit('formStatus', { active: true, type: 'delete' });
      }
    },
    deleteClient() {
      this.$refs.viewport.deleteClient();
    },
    refresh() {
      this.$refs.viewport.refresh();
    },
    save() {
      this.saveIcon = 'spinner';
      this.spin = true;
      this.$refs.viewport.save();
      setTimeout(() => {
        this.saveIcon = 'cloud-upload-alt';
        this.spin = false;
      }, 1000);
    },
    checkForSave() {
      this.$refs.viewport.checkForchange()
        ? this.$toast.open({
            message: 'Please save',
            type: 'warning',
            position: 'top'
          })
        : null;
      return !this.$refs.viewport.checkForchange();
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/colours';
@import '~styles/mixins';
.main {
  @include transition;
  display: flex;
  height: 100vh;
}
.right {
  @include transition;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  height: 100%;
  width: calc(100vw - 80px - 2rem);
  .top {
    display: flex;
    align-items: center;
    .save {
      height: 48px;
    }
  }
}
.shrink {
  width: calc(100vw - 400px);
}
.buttons {
  @include transition;
  display: flex;
  margin: 1rem 1rem;
  justify-content: center;
  align-items: center;
  button {
    margin: 0 1rem;
  }
}
.freeze {
  pointer-events: none;
}
</style>
