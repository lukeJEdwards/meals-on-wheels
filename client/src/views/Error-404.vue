<template>
  <div class="error">
    <BackButton class="btn" />
    <div class="code">
      404
    </div>

    <div class="message" style="padding: 10px;">
      NOT FOUND
    </div>
  </div>
</template>

<script>
export default {
  name: "Error404",
  components: {
    BackButton: () =>
      import(
        /* webpackChunkName: "backBtn" */ "../components/topbar/back-button"
      ),
  },
};
</script>

<style lang="scss" scoped>
.error {
  position: relative;
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100vh;
  background-color: $primary;
  color: $disable;
}
.btn {
  position: absolute;
  top: 1rem;
  left: 1rem;
}
.code {
  border-right: 3px solid;
  font-size: 55px;
  padding: 0 10px 0 10px;
  text-align: center;
}

.message {
  font-size: 40px;
  text-align: center;
}
</style>
