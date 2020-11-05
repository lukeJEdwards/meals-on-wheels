<template>
  <div class="clients">
    <TopBar :refresh="refresh" />
    <div class="mid">
      <Viewport @client="getClient" ref="viewport" :windowWidth="windowWidth" />
      <EditClient
        :info="client"
        v-if="openForm.open && openForm.type == 'edit'"
        @close="closeHandler"
      />
    </div>
    <div class="buttons">
      <ControlButton
        icon="plus"
        :clickFunction="AddClient"
        :showIcon="isMobile"
        add
        rotate
        >Add Client</ControlButton
      >
      <ControlButton
        icon="user-edit"
        :clickFunction="EditClient"
        :showIcon="isMobile"
        edit
        pulse
        >Edit Client</ControlButton
      >
      <ControlButton
        icon="times"
        :clickFunction="DeleteClient"
        :showIcon="isMobile"
        deleteClient
        rotate
        >Delete Client</ControlButton
      >
    </div>
  </div>
</template>

<script>
import options from "../notifications/notification-options";
export default {
  name: "Clients",
  components: {
    TopBar: () => import("../components/topbar/top-bar"),
    Viewport: () => import("../components/client-components/view-port"),
    ControlButton: () => import("../components/client-components/control-btn"),
    EditClient: () => import("../components/client-components/edit-client"),
  },
  data() {
    return {
      client: {},
      windowWidth: window.innerWidth,
      openForm: { open: false, type: "" },
    };
  },
  computed: {
    isMobile() {
      return this.windowWidth < 500;
    },
  },
  methods: {
    getClient(info) {
      this.client = info;
    },
    AddClient() {
      this.openForm.open = true;
      this.openForm.type = "add";
    },
    EditClient() {
      if (Object.keys(this.client).length > 1) {
        this.openForm.open = true;
        this.openForm.type = "edit";
      } else {
        this.$toast.warning("Please select a user", options);
      }
    },
    DeleteClient() {
      console.log("Delete");
    },
    windowHandler(e) {
      this.windowWidth = e.currentTarget.innerWidth;
    },
    refresh() {
      this.$refs.viewport.loaded = false;
      this.$refs.viewport.getData();
      console.log(this.$refs.viewport);
    },
    closeHandler(bool) {
      this.openForm.open = bool;
      this.openForm.type = "";
    },
  },
  created() {
    window.addEventListener("resize", this.windowHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.windowHandler);
  },
};
</script>

<style lang="scss" scoped>
.clients {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  color: $text;
}
.mid {
  display: flex;
  position: relative;
  height: 78vh;
  margin-bottom: 1rem;
}
.buttons {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
