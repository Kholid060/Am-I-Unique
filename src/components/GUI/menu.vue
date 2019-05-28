<template>
  <el-row class="gui-menu">
    <h1 class="gui-menu-title">Am I Unique</h1>
    <a
      href="https://github.com/Kholid060/Am-I-Unique"
      target="_blank"
      class="fork-button"
    >
      <img src="../../assets/github.png" width="20px" />
      <span>Fork me</span>
    </a>
  </el-row>
</template>
<style>
.fork-button img {
  vertical-align: bottom;
}
.fork-button span {
  color: #1d1f21;
  font-weight: 600;
  margin-left: 8px;
  font-size: 14px;
}
.fork-button {
  border-radius: 3px;
  float: right;
  background-color: white;
  padding: 10px 15px;
}

.gui-menu-title {
  display: inline-block;
  color: white;
  font-size: 24px;
  font-weight: 600;
  cursor: default;
}
.gui-menu {
  color: white;
  padding: 20px;
  height: 75px;
}
</style>
