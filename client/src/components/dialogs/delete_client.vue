<template>
  <transition name="scale" appear>
    <div class="delete-client"></div>
  </transition>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "DeleteClientForm",
  computed: {
    ...mapState(["clients"])
  },
  methods: {
    ...mapMutations(["remove_client"])
  }
};
</script>

<style lang="scss" scoped></style>
