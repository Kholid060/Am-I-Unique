<template>
  <div id="command-history" v-if="history.length != 0">
    <p v-for="(item, i) in history" :key="i">
      <span v-if="item.type == 'command'"
        ><span class="green command-code">guest@am-i-unique:~$</span>
        {{ item.text }}</span
      >
      <span v-else-if="item.type === 'error'" class="red">{{ item.text }}</span>
      <span v-else v-html="item.text"></span>
    </p>
  </div>
</template>
<script>
export default {
  props: {
    history: {
      type: Array
    }
  }
};
</script>
