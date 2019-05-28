<template>
  <el-row class="gui-menu">
    <div class="gui-menu-title">
      <img src="../../assets/logo.png" width="40px" />
      <h1>Am I Unique</h1>
    </div>
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

.gui-menu-title img {
  vertical-align: sub;
  margin-right: 10px;
}

.gui-menu-title {
  display: inline-block;
}

.gui-menu-title h1 {
  display: inline-block;
  color: white;
  margin: 0;
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
