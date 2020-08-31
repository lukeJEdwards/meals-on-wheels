<template>
  <div
    ref="menu"
    v-if="Show"
    :style="{ left: this.LeftOffSet + 'px', top: this.TopOffSet + 'px' }"
    id="context-menu"
    v-click-outside="close"
    class="context-menu"
  >
    <div
      class="menu-item"
      :class="{ disable: clientEmpty }"
      @click="EditUser()"
    >
      <fa-icon :icon="['fas', 'user-edit']" class="icon" />
      Edit client
    </div>
    <div
      class="menu-item"
      :class="{ disable: clientEmpty }"
      @click="DeleteUser()"
    >
      <fa-icon :icon="['fas', 'minus']" class="icon" />
      Delete client
    </div>
    <div class="menu-item" @click="AddUser()">
      <fa-icon :icon="['fas', 'plus']" class="icon" />
      Add client
    </div>
    <hr />
    <div class="menu-item">
      <fa-icon :icon="['fas', 'copy']" class="icon" />
      Copy
    </div>
    <div class="menu-item">
      <fa-icon :icon="['fas', 'paste']" class="icon" />
      Past
    </div>
  </div>
</template>

<script>
import { isEmpty } from 'lodash';
export default {
  name: 'ContextMenu',
  props: {
    client: { type: Object, required: false, default: Object },
    edituser: { type: Function, required: true },
    deleteuser: { type: Function, required: true },
    adduser: { type: Function, required: true }
  },
  computed: {
    clientEmpty: function() {
      return isEmpty(this.client);
    }
  },
  data() {
    return {
      Show: false,
      TopOffSet: 0,
      LeftOffSet: 0,
      Width: window.innerWidth,
      height: window.innerHeight,
      elementHeight: 275,
      elementWidth: 150
    };
  },
  methods: {
    close() {
      this.Show = false;
    },
    contextMenuHandler(e) {
      e.preventDefault();
      this.TopOffSet = e.pageY;
      this.LeftOffSet = e.pageX;
      if (e.pageY + this.elementHeight > this.height) {
        this.TopOffSet = e.pageY - this.elementHeight;
      }
      if (e.pageX + this.elementWidth > this.Width) {
        this.LeftOffSet = e.pageX - this.elementWidth;
      }
      this.Show = true;
    },
    WindowHandler(e) {
      this.Width = e.target.innerWidth;
      this.height = e.target.innerHeight;
    },
    GetHeight() {
      this.$refs.menu.clientHeight;
    },
    EditUser() {
      this.edituser();
      this.close();
    },
    DeleteUser() {
      this.deleteuser();
      this.close();
    },
    AddUser() {
      this.adduser();
      this.close();
    }
  },
  created() {
    window.addEventListener('contextmenu', this.contextMenuHandler);
    window.addEventListener('resize', this.WindowHandler);
  },
  destroyed() {
    window.removeEventListener('contextmenu', this.contextMenuHandler);
    window.removeEventListener('resize', this.WindowHandler);
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/colours';
hr {
  margin: 2px 0;
  border-color: #555;
}
.context-menu {
  position: absolute;
  z-index: 1;
  width: 150px;
  background-color: #1a1b1b;
  color: #eee;
  border-radius: 5px;
  .menu-item {
    padding: 1rem 0.5rem;
    &:hover {
      cursor: pointer;
      background-color: #555;
    }
  }
  .menu-item:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .menu-item:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
}
.disable {
  pointer-events: none;
  color: $disable;
}
.icon {
  display: inline-block;
  margin-right: 5px;
}
</style>
