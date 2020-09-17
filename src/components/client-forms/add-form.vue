<template>
  <div class="base">
    <div class="info">
      <div class="name">
        <p>Forename</p>
        <input v-model="forename" type="search" />
      </div>
      <div class="name">
        <p>Surname</p>
        <input v-model="surname" type="search" />
      </div>
      <div class="address">
        <p>Address</p>
        <input v-model="address" type="search" />
      </div>
      <div class="address">
        <p>Postcode</p>
        <input v-model="postcode" type="search" class="pc" maxlength="7" />
      </div>
      <div class="tag-input">
        <p>Comments</p>
        <input v-model="currentComment" type="search" />
        <button type="button" @click="addComment()">Add</button>
      </div>
      <div class="tag-group">
        <div class="tag" v-for="comment in comments" :key="comment">
          <fa-icon :icon="['fas', 'times']" class="icon" />
          {{ comment }}
        </div>
      </div>
      <div class="tag-input">
        <p>Requirements</p>
        <input v-model="currentDr" type="search" />
        <button type="button">Add</button>
      </div>
      <div class="tag-group">
        <div class="tag" v-for="r in dr" :key="r">
          <fa-icon :icon="['fas', 'times']" class="icon" />
          {{ r }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClientAddForm',
  data() {
    return {
      forename: '',
      surname: '',
      address: '',
      postcode: '',
      currentComment: '',
      comments: [
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test',
        'test'
      ],
      currentDr: '',
      dr: ['test', 'test', 'test', 'test', 'test', 'test', 'test', 'test']
    };
  },
  methods: {
    addComment() {
      this.comments.push(this.currentComment);
      this.currentComment = '';
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/colours';
@import '~styles/mixins';
.base {
  @include transition;
  background-color: $primary;
  color: $text;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  overflow: hidden;
  height: inherit;
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-size: 1.25rem;
  overflow-y: auto;
  height: inherit;
  input {
    font-size: 1.25rem;
    background-color: transparent;
    color: $text;
    border: 1px solid $green;
    border-radius: 6px;
    text-indent: 10px;
    padding: 0.25rem 0;
  }
  p {
    width: 12ch;
  }
}
.name {
  display: flex;
  align-items: center;
  margin: 1rem;
}
.address {
  display: flex;
  align-items: center;
  margin: 1rem;
  .pc {
    text-align: center;
    text-indent: 0;
    width: 10ch;
    text-transform: uppercase;
  }
}
.tag-input {
  display: flex;
  align-items: center;
  margin: 1rem;
  button {
    border: 1px solid $green;
    padding: 0.5rem 1rem;
    background-color: $green;
    color: $text;
    border-radius: 6px;
    margin-left: 1rem;
    &:hover {
      cursor: pointer;
      border: 1px solid lighten($green, 5);
    }
  }
}
.tag-group {
  display: flex;
  flex-wrap: wrap;
  &:last-child {
    padding-bottom: 1rem;
  }
  .tag {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 1rem;
    background-color: lighten($primary, 5);
    border-radius: 6px;
    margin: 2rem;
    .icon {
      color: $text;
      margin-right: 0.5rem;
      &:hover {
        cursor: pointer;
        color: darken($text, 20);
      }
    }
  }
}
</style>
