<template>
  <div class="fill-height">
    <div class="gui-container">
      <Menu></Menu>
      <el-card class="gui-content">
        <Form></Form>
        <Table></Table>
      </el-card>
    </div>
  </div>
</template>
<script>
import Menu from "../components/GUI/menu";
import Table from "../components/GUI/table";
import Form from "../components/GUI/form";
export default {
  components: { Menu, Table, Form }
};
</script>
<style>
.el-card__body {
  padding: 30px !important;
}

.gui-container {
  font-family: "Open Sans", sans-serif;
  padding: 0 30px;
  min-height: 300px;
}

.gui-content {
  animation: 0.6s ease 0s 1 slideInFromBottom;
  width: 100%;
  min-height: 400px;
}
</style>
