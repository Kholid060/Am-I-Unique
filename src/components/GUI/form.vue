<template>
  <el-form :inline="true" :model="formData">
    <el-form-item>
      <el-select
        clearable
        multiple
        :collapse-tags="true"
        v-model="formData.selectWebsite"
        filterable
        placeholder="Select website"
      >
        <el-option
          v-for="item in siteList"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="form-input">
      <el-input
        clearable
        placeholder="Input username"
        v-model="formData.username"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitData">SUBMIT</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="danger" @click="clearData">CLEAR DATA</el-button>
    </el-form-item>
    <el-form-item class="cli-mode-button">
      <router-link to="/">
        <el-button>CLI Mode</el-button>
      </router-link>
    </el-form-item>
  </el-form>
</template>
<script>
import Bus from "../../utils/bus";
export default {
  data: () => ({
    formData: {
      selectWebsite: [],
      username: ""
    },
    siteList: []
  }),
  methods: {
    clearData() {
      Bus.fire("clearData");
    },
    submitData() {
      if (
        this.formData.username === "" ||
        this.formData.selectWebsite.length === 0
      ) {
        this.$message({
          showClose: true,
          message: "Oops, this is a error message.",
          type: "error"
        });
      } else {
        Bus.fire("checkUsername", {
          username: this.formData.username,
          website: this.formData.selectWebsite
        });
      }
    }
  },
  mounted() {
    this.$http.get("/sites").then(response => {
      this.siteList = response.data.map(site => site.name).sort();
    });
  }
};
</script>
<style>
.cli-mode-button {
  float: right;
  margin: 0 !important;
}

.form-input {
  width: 30% !important;
}

.form-input div {
  width: 100%;
}
</style>
