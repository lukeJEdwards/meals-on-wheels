<template>
  <div class="edit-form" :class="{ close: closed }">
    <ButtonAndIcon
      prefix="fas"
      icon="save"
      class="save btn"
      :transition="false"
      @click.native="save()"
      >Save</ButtonAndIcon
    >
    <fa-icon :icon="['fas', 'times']" class="close-icon m-1" @click="close()" />
    <div class="title">
      <p>Edit client</p>
    </div>
    <div class="info flex-container cols">
      <p class="my-1">Name</p>
      <div class="name">
        <input type="search" class="input mx-1" v-model="client.forename" />
        <input type="search" class="input mx-1" v-model="client.surname" />
      </div>
      <p class="my-1">Address</p>
      <div class="location">
        <input
          type="search"
          class="input mx-1 address"
          v-model="client.address"
        />
        <input
          type="search"
          class="input mx-1 postcode"
          v-model="client.postcode"
        />
      </div>
      <p class="my-1">Comments</p>
      <div class="comments">
        <input
          type="search"
          class="input mx-1"
          v-model="newComment"
          placeholder="add new comment"
          @keydown.enter="addComment()"
        />
        <button type="button" class="btn px-2 mx-1" @click="addComment()">
          Add
        </button>
      </div>
      <div class="tag-group m-1">
        <div class="tag" v-for="(comment, i) in client.comments" :key="i">
          <p>{{ comment }}</p>
          <fa-icon
            :icon="['fas', 'times']"
            :id="i"
            @click="removeComment($event.currentTarget.id)"
          />
        </div>
      </div>
      <p class="my-1">Dietary Requirements</p>
      <div class="comments">
        <input
          type="search"
          class="input mx-1"
          v-model="newRequirement"
          placeholder="add new dietary Requirements"
          @keydown.enter="addRequirement()"
        />
        <button type="button" class="btn px-2 mx-1" @click="addRequirement()">
          Add
        </button>
      </div>
      <div class="tag-group m-1">
        <div
          class="tag"
          v-for="(reqirement, i) in client.dietaryRequirements"
          :key="i"
        >
          <p>{{ reqirement }}</p>
          <fa-icon
            :icon="['fas', 'times']"
            :id="i"
            @click="removeRquirement($event.currentTarget.id)"
          />
        </div>
      </div>
      <div class="felx-conatiner">
        <button type="button" class="btn discard m-1" @click="disgard()">
          reset changes
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneDeep, isEqual } from 'lodash';
export default {
  name: 'EditForm',
  props: {
    client: { type: Object, required: true }
  },
  components: {
    ButtonAndIcon: () => import('./button-&-Icon')
  },
  data() {
    return {
      closed: true,
      newComment: '',
      newRequirement: '',
      cache: {}
    };
  },
  methods: {
    addComment() {
      this.client.comments.push(this.newComment);
      this.newComment = '';
    },
    addRequirement() {
      this.client.dietaryRequirements.push(this.newRequirement);
      this.newRequirement = '';
    },
    removeComment(i) {
      this.client.comments.splice(i, 1);
    },
    removeRquirement(i) {
      this.client.dietaryRequirements.splice(i, 1);
    },
    close() {
      if (isEqual(this.client, this.cache)) {
        this.closed = true;
        setTimeout(() => {
          this.$store.commit('formStatus', { active: false, type: '' });
        }, 750);
      } else {
        this.$parent.SendNotification(
          "Changes have't been saved",
          'warning',
          3000
        );
      }
    },
    save() {
      this.$http
        .put(`clients/${this.client.id}`, { ...this.client })
        .then(Response => {
          if ('complete' in Response.data) {
            this.cache = cloneDeep(this.client);
            this.$parent.refresh();
            this.close();
          } else {
            this.$parent.SendNotification(Response.data, 'warning', 3000);
          }
        })
        .catch(e => {
          this.$parent.SendNotification(e, 'warning', 10000);
        });
    },
    disgard() {
      Object.keys(this.cache).forEach(key => {
        this.client[key] = this.cache[key];
      });
    }
  },
  mounted() {
    this.cache = cloneDeep(this.client);
    setTimeout(() => {
      this.closed = false;
    }, 10);
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/utilities';
@import '~styles/mixins';
.edit-form {
  @include transition;
  position: absolute;
  color: $text;
  background-color: lighten($primary, 10);
  width: 27vw;
  height: 27vw;
  min-width: 450px;
  min-height: 450px;
  margin-top: calc(40vh - 13.5vw);
  margin-left: 36.5vw;
  border-radius: 25px;
  font-size: 1.5rem;
}
.close {
  @include transform(translateY(-100vh));
}
.title {
  text-align: center;
  border-bottom: 2px solid $primary;
  padding-top: 2rem;
}
.close-icon {
  position: absolute;
  &:hover {
    cursor: pointer;
    color: darken($text, 20);
  }
}
.info {
  font-size: 1.25rem;
  height: calc(27vw - 4.5rem);
  justify-content: flex-start;
  overflow-y: auto;
  .input {
    border: 1px solid $orange;
    &:hover {
      border: 1px solid lighten($orange, 10);
    }
  }
}
.name {
  display: flex;
  width: 100%;
  text-align: center;
  justify-content: center;
  .input {
    width: 100%;
    text-align: center;
    text-indent: 0;
  }
}
.location {
  display: flex;
  width: 100%;
  .address {
    width: 75%;
  }
  .postcode {
    width: 25%;
    text-align: center;
    text-indent: 0;
  }
}
.tag-group {
  display: flex;
  width: fill;
  background-color: $secondary;
  border-radius: 15px;
  flex-wrap: wrap;
  .tag {
    display: flex;
    align-items: center;
    font-size: 1rem;
    background-color: $primary;
    border-radius: 25px;
    padding: 0.5rem;
    margin: 1rem;
    text-align: center;
  }
  svg {
    margin: 0 0.5rem;
    &:hover {
      cursor: pointer;
      color: darken($text, 20);
    }
  }
}
.comments {
  display: flex;
  width: 100%;
  .input {
    width: 100%;
  }
  .btn {
    border: 1px solid $green;
    border-radius: 15px;
    &:hover {
      background-color: $green;
    }
  }
}
@media only screen and (max-width: 1600px) {
  .edit-form {
    margin-top: calc(40vh - 225px);
    margin-left: calc(50vw - 225px);
  }
  .info {
    height: calc(450px - 4.5rem);
  }
}
.save {
  position: absolute;
  right: 1rem;
  top: 1rem;
  border: 1px solid $green;
  border-radius: 15px;
  &:hover {
    cursor: pointer;
    background-color: $green;
  }
}
.discard {
  border: none;
  width: 150px;
  background-color: $red;
  &:hover {
    border: 1px solid darken($red, 20);
  }
}
</style>
