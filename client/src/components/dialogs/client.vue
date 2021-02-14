<template>
  <transition name="scale" appear>
    <form class="client-dialog" v-if="get_edit_add_dialog">
      <div class="title">
        <h1 v-if="Add">Add new user</h1>
        <h1 v-else>Edit user</h1>
      </div>
      <div class="wrapper">
        <div class="names">
          <input
            type="text"
            class="input"
            v-model="selected_client.forename"
            placeholder="Forename"
          />
          <input
            type="text"
            class="input"
            v-model="selected_client.surname"
            placeholder="Surname"
          />
        </div>
        <div class="address">
          <input
            type="text"
            class="input"
            v-model="selected_client.address"
            placeholder="Address"
          />
          <input
            type="text"
            class="input"
            v-model="selected_client.postcode"
            placeholder="postcode"
          />
        </div>
        <div class="tags">
          <input type="text" class="input" placeholder="Add new Comment" />
          <button type="button" class="button">
            <fa-icon icon="plus" />
          </button>
        </div>
        <div class="display">
          <span
            class="tag"
            v-for="(comment, i) in selected_client.comments"
            :key="i"
          >
            <fa-icon icon="times" class="icon" @click="remove_tag(i)" />
            {{ comment }}
          </span>
        </div>
        <div class="tags">
          <input
            type="text"
            class="input"
            placeholder="Add new dietary requirement"
          />
          <button type="button" class="button">
            <fa-icon icon="plus" />
          </button>
        </div>
        <div class="display"></div>
        <button class="button add" v-if="Add">
          <fa-icon icon="user-plus" class="icon" />
          <p>ADD USER</p>
        </button>
      </div>
    </form>
  </transition>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";
export default {
  name: "EditClient",
  props: {
    Add: Boolean
  },
  computed: {
    ...mapGetters(["get_edit_add_dialog", "get_selected_client_index"]),
    ...mapState(["selected_client"])
  },
  methods: {
    ...mapMutations(["set_client"]),
    remove_tag(index, comment = true) {
      let client = { ...this.selected_client };
      if (comment) {
        client.comments.splice(index, 1);
      } else {
        client.dietaryRequirements.splice(index, 1);
      }
      this.set_client({
        index: this.get_selected_client_index,
        client: client
      });
      this.$forceUpdate();
    }
  }
};
</script>

<style lang="scss" scoped>
.client-dialog {
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 2;
  top: 30%;
  background-color: $main-background;
  border-radius: $border-radius;
  color: $text;
  .wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0 0.5rem;
    margin-bottom: 1rem;
  }
  .names,
  .address {
    position: relative;
    display: flex;
    margin-bottom: 1rem;
  }
  .title {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .input {
    position: relative;
    font-size: 1rem;
    color: $text;
    background-color: $secondary-background;
    border-radius: $border-radius;
    border: 1px solid $secondary-background;
    padding: 0 1rem;
    height: 40px;
    text-align: center;
    margin: 0 0.5rem;
    &:hover {
      border: 1px solid $orange;
    }
    &:focus {
      border: 1px solid $green;
    }
    &::placeholder {
      color: darken($text, 20);
    }
  }
  .button {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: $border-radius;
    background-color: $green;
    color: $text;
    @include darken-hover($green);
  }
  .tags {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    .input {
      width: stretch;
      margin-right: 1rem;
    }
    .button {
      height: 40px;
      padding: 0 1.5rem;
    }
  }
  .display {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    min-height: 2rem;
    background-color: $secondary-background;
    margin: 0 0.5rem;
    margin-bottom: 1rem;
    border-radius: $border-radius;
    .tag {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0.5rem;
      padding: 0.5rem;
      background-color: $main-background;
      border-radius: $border-radius;
      .icon {
        position: relative;
        margin: 0 0.5rem;
        &:hover {
          cursor: pointer;
          color: darken($text, 20);
        }
      }
    }
  }
  .add {
    font-size: 1rem;
    .icon {
      margin-right: 0.5rem;
      font-size: 1.25rem;
    }
  }
}
</style>
