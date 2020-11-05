<template>
  <div class="main">
    <AddForm v-if="addform" />
    <EditForm :client="currentClient" v-if="editform" />
    <DeleteForm
      :client="currentClient"
      :delete="DeleteClient"
      v-if="deleteform"
    />
    <Bar :refresh="refresh" :class="{ freeze: formOpen }" />
    <div class="mid" :class="{ freeze: formOpen }">
      <ClientViewport
        @current-client="currentClientHandler"
        ref="viewPort"
        :current-client="currentClient"
      />
    </div>
    <div class="buttons" :class="{ freeze: formOpen }">
      <ButtonIcon
        icon="plus"
        rotate-on-hover
        type="add"
        @click.native="openAddUser()"
      >
        Add
      </ButtonIcon>
      <ButtonIcon
        icon="user-edit"
        pulse-on-hover
        type="edit"
        @click.native="openEditUser()"
      >
        Edit
      </ButtonIcon>
      <ButtonIcon
        icon="minus"
        pulse-on-hover
        type="delete"
        @click.native="openDeleteUser()"
      >
        Delete
      </ButtonIcon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClientForm',
  components: {
    Bar: () => import('../components/bar'),
    ClientViewport: () => import('../components/client-viewport'),
    ButtonIcon: () => import('../components/button-&-Icon'),
    AddForm: () => import('../components/add-form'),
    EditForm: () => import('../components/edit-form'),
    DeleteForm: () => import('../components/delete-form')
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
  data() {
    return {
      currentClient: {},
      form: '',
      openSideForm: false
    };
  },
  methods: {
    currentClientHandler(client) {
      this.currentClient = client;
    },
    refresh() {
      this.$refs.viewPort.refresh();
    },
    openAddUser() {
      this.$store.commit('formStatus', { active: true, type: 'add' });
    },
    openEditUser() {
      if (Object.keys(this.currentClient).length > 0) {
        this.$store.commit('formStatus', { active: true, type: 'edit' });
      } else {
        this.SendNotification('Please select a client', 'warning');
      }
    },
    openDeleteUser() {
      if (Object.keys(this.currentClient).length > 0) {
        this.$store.commit('formStatus', { active: true, type: 'delete' });
      } else {
        this.SendNotification('Please select a client', 'warning');
      }
    },
    DeleteClient() {
      this.$http
        .delete(`clients/${this.currentClient._id}`)
        .then(Response => {
          if (!('err' in Response.data)) {
            this.refresh();
            this.currentClient = {};
          } else {
            this.SendNotification(Response.data, 'warning', 3000);
          }
        })
        .catch(e => {
          this.SendNotification(e, 'warning', 10000);
        });
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/mixins';
.freeze {
  pointer-events: none;
}
.main {
  @include transition;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.mid {
  display: flex;
  overflow-y: hidden;
  height: 100%;
}
.buttons {
  @include transition;
  display: flex;
  margin: 1rem 1rem;
  justify-content: center;
  align-items: center;
  width: calc(100vw - 2rem);
  button {
    margin: 0 1rem;
  }
}
</style>
