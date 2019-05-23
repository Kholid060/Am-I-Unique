<template>
  <div class="spinner-frames">
    <span
      class="spinner-frame"
      v-for="(frame, i) in frames"
      :key="i"
      v-if="currentFrame === i"
      >{{ frame }}
    </span>
  </div>
</template>
<script>
export default {
  props: ["data", "fps"],
  data() {
    return {
      currentFrame: 0
    };
  },
  mounted() {
    window.setInterval(() => {
      this.currentFrame++;
      if (this.currentFrame >= this.frameCount) {
        this.currentFrame = 0;
      }
    }, this.interval);
  },
  computed: {
    frameCount() {
      return this.data.frames.length;
    },
    frames() {
      return this.data.frames;
    },
    interval() {
      return this.data.interval;
    }
  }
};
</script>
<style>
.spinner-frames {
  display: inline;
  vertical-align: middle;
  font-size: 22px;
  color: #24a64b;
  margin-left: 10px;
}
</style>
