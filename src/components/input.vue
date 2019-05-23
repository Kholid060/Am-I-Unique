<template>
  <div class="input-container">
    <span class="green command-code">guest@am-i-unique:~$</span>
    <input
      autofocus
      type="text"
      @keyup.enter="pushHistory"
      @keyup.page-up="recentHandle"
      v-model="text"
      class="command-input"
    />
  </div>
</template>
<script>
import Bus from "../bus/";
export default {
  data: () => ({
    text: "",
    last: ""
  }),
  methods: {
    previous(e) {
      if (e.key === "ArrowUp") {
        this.last ? (this.text = this.last) : null;
      }
    },
    pushHistory() {
      if (this.text !== "") {
        this.last = this.text;
        let data = {
          type: "command",
          text: this.text
        };
        Bus.fire("data", data);
        this.text = "";
      }
    },
    recentHandle(e) {
      console.log(e);
      this.text = this.recent[this.recent.length - 1];
    }
  },
  created() {
    window.addEventListener("keyup", this.previous);
  }
};
</script>
<style>
.command-code {
  cursor: default;
}
#command-history {
  height: auto;
}
.command-input {
  outline: none;
  background-color: transparent;
  margin: 0;
  width: 80%;
  font: inherit;
  border: none;
  color: inherit;
  height: 25px;
  margin-left: 10px;
}
</style>
