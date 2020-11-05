<template>
  <div class="main">
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
        :weekId="activeWeek._id"
        @client-change="clientHandler"
        ref="viewport"
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
    ButtonIcon: () => import('../components/button-&-Icon')
  },
  data() {
    return {
      activeWeek: {},
      toggle: false,
      currentClient: {},
      saveIcon: 'cloud-upload-alt',
      spin: false
    };
  },
  computed: {
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
    openEditForm() {
      if (Object.keys(this.currentClient).length > 0) {
        this.$store.commit('formStatus', { active: true, type: 'edit' });
      } else {
        this.$toast.open({
          message: 'Please select a client to edit',
          type: 'warning',
          position: 'top'
        });
      }
    },
    openDeleteForm() {
      if (Object.keys(this.currentClient).length > 0) {
        this.$store.commit('formStatus', { active: true, type: 'delete' });
      } else {
        this.$toast.open({
          message: 'Please select a client to delete',
          type: 'warning',
          position: 'top'
        });
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
