<template>
  <div class="add-new-client" :class="{ close: closed }">
    <div class="main-title">
      <fa-icon icon="times" class="icon" @click="close()" />
      {{ info.forename }}
      {{ info.surname }}
    </div>
    <div class="info" v-if="hasInfo">
      <div class="edit-names">
        <input v-model="info.forename" type="text" class="name forename" />
        <input v-model="info.surname" type="text" class="name surname" />
      </div>
      <div class="edit-address">
        <input v-model="info.address" type="text" class="address" />
        <input v-model="info.postcode" type="text" class="pc" />
      </div>
      <form class="tag-group" @submit.prevent="addCommet">
        <div class="title">
          Comments
        </div>
        <div class="input">
          <input v-model="newComment" type="text" class="new" />
          <button type="button" class="btn" @click="addCommet">Add</button>
        </div>
        <div class="tags">
          <div class="tag" v-for="(tag, i) in info.comments" :key="i">
            <fa-icon icon="times" class="icon" @click="removeComment(i)" />
            <span>{{ tag }}</span>
          </div>
        </div>
      </form>
      <form class="tag-group" @submit.prevent="addDr">
        <div class="title">
          Dietary Requirements
        </div>
        <div class="input">
          <input v-model="newDr" type="text" class="new" />
          <button type="button" class="btn" @click="addDr">Add</button>
        </div>
        <div class="tags">
          <div
            class="tag"
            v-for="(tag, i) in info.dietaryRequirements"
            :key="i"
          >
            <fa-icon icon="times" class="icon" @click="removeDr(i)" />
            {{ tag }}
          </div>
        </div>
      </form>
      <div class="save-btn">
        <button type="button" class="btn" @click="save()">
          <span v-if="saved">Save</span>
          <Loading v-if="!saved" />
        </button>
      </div>
    </div>
    <div class="no-client" v-else>
      <p>No Client</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditClient",
  props: {
    info: { type: Object },
  },
  components: {
    Loading: () => import("../search/loading"),
  },
  data() {
    return {
      newComment: "",
      newDr: "",
      closed: true,
      saved: true,
    };
  },
  computed: {
    hasInfo() {
      return Object.keys(this.info).length > 1;
    },
  },
  methods: {
    addCommet() {
      if (this.newComment) {
        this.info.comments.push(this.newComment);
        this.newComment = "";
      }
    },
    removeComment(index) {
      this.info.comments.splice(index, 1);
    },
    addDr() {
      if (this.newDr) {
        this.info.dietaryRequirements.push(this.newDr);
        this.newDr = "";
      }
    },
    removeDr(index) {
      this.info.dietaryRequirements.splice(index, 1);
    },
    close() {
      this.closed = true;
      setTimeout(() => {
        this.$emit("close", this.close);
      }, 500);
    },
    save() {
      this.saved = false;
      this.$axios
        .put(`/clients/${this.info._id}`, { ...this.info })
        .then((Response) => {
          if (Response.data) {
            console.log("saved");
            this.saved = true;
          }
        })
        .catch((e) => console.log(e));
    },
  },
  mounted() {
    setTimeout(() => {
      this.closed = false;
    }, 10);
  },
};
</script>

<style lang="scss" scoped>
.add-new-client {
  @include transition-slow;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: $primary;
  max-width: 30vw;
  width: 100%;
  border-radius: $radius;
  margin-right: 1rem;
  overflow-y: hidden;
  input {
    font-size: clamp(1rem, 2vw, 1.25rem);
    margin: 0 0;
    border-radius: $radius;
    background-color: transparent;
    color: $text;
    border: 1px solid $green;
    padding: 1rem;
    text-align: center;
  }
}
.main-title {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(1rem, 2vw, 1.5rem);
  margin-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid $secondary;
  background-color: $primary;
  border-top-left-radius: $radius;
  width: 100%;
  height: 50px;
  .icon {
    position: absolute;
    top: 0;
    left: 1rem;
    &:hover {
      cursor: pointer;
      color: darken($text, 20);
    }
  }
}
.info {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
  flex-grow: 1;
}
.edit-names {
  position: relative;
  width: 100%;
  display: flex;
  margin-top: 2rem;
  .name {
    position: relative;
    width: 50%;
  }
  .forename {
    margin-left: 1rem;
    margin-right: 0.5rem;
  }
  .surname {
    margin-right: 1rem;
    margin-left: 0.5rem;
  }
}
.no-client {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: clamp(1.5rem, 3vw, 4rem);
}
.edit-address {
  display: flex;
  position: relative;
  margin: 0 1rem;
  margin-top: 2rem;
  .address {
    width: 70%;
    margin-right: 0.5rem;
  }
  .pc {
    width: 30%;
    margin-left: 0.5rem;
  }
}
.tag-group {
  display: flex;
  position: relative;
  flex-direction: column;
  margin: 0 1rem;
  margin-top: 2rem;
  .title {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 0.5rem;
    font-size: clamp(1.25rem, 2vw, 1.5rem);
  }
  .input {
    display: flex;
    width: 100%;
    .new {
      width: 80%;
      margin-right: 1rem;
      text-align: start;
    }
    .btn {
      border-radius: $radius;
      border: 1px solid $blue;
      background-color: transparent;
      color: $text;
      width: 20%;
      &:hover {
        cursor: pointer;
        background-color: $blue;
      }
    }
  }
  .tags {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 1rem;
    background-color: $secondary;
    border-radius: $radius;
    &:last-child {
      margin-bottom: 1rem;
    }
    .tag {
      display: flex;
      position: relative;
      justify-content: center;
      align-items: center;
      border-radius: $radius;
      padding: 0.5rem 1rem;
      margin: 0.5rem;
      height: fit-content;
      background-color: $orange;
      max-width: 25%;
      span {
        width: 100%;
        word-wrap: break-word;
      }
      .icon {
        margin-right: 0.5rem;
        &:hover {
          cursor: pointer;
          color: darken($text, 20);
        }
      }
    }
  }
}
.save-btn {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-bottom: 1rem;
  .btn {
    position: relative;
    border-radius: $radius;
    background-color: $red;
    border: none;
    width: 100%;
    height: 100%;
    color: $text;
    font-size: clamp(1.25rem, 2vw, 1.5rem);
    margin: 0 1rem;
    &:hover {
      cursor: pointer;
      background-color: darken($red, 5);
    }
  }
}
.close {
  width: 0;
}
</style>
