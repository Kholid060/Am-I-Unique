<template>
  <div id="app">
    <div class="background" :style="{ height: backgroundHeight }"></div>
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>
<script>
export default {
  computed: {
    backgroundHeight() {
      return this.$route.name === "CLI" ? "100%" : "250px";
    }
  }
};
</script>
<style>
.background {
  background-color: #1d1f21;
  min-height: 250px;
  width: 100%;
  position: absolute;
  z-index: -1;
  transition: all 0.5s ease;
}
#app {
  height: 100%;
  width: 100%;
  font-size: 14px;
}
</style>
