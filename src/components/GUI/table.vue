<template>
  <el-table
    border
    v-loading="isLoadData"
    :data="displayData"
    style="width: 100%; margin-top: 9px;"
  >
    <template slot="empty">
      <p>Data is empty</p>
    </template>
    <el-table-column label="Website" prop="website" align="center">
    </el-table-column>
    <el-table-column label="Username" prop="username" align="center">
    </el-table-column>
    <el-table-column align="center">
      <template slot="header" slot-scope="scope">
        <p>Availability</p>
      </template>
      <template slot-scope="scope">
        <el-button type="success" v-if="scope.row.available" size="medium"
          >Available</el-button
        >
        <el-button type="danger" v-else size="medium">Not Available</el-button>
      </template>
    </el-table-column>
    <el-table-column align="center">
      <template slot="header" slot-scope="scope">
        <el-input v-model="search" placeholder="Type to search website" />
      </template>
      <template slot-scope="scope">
        <el-link
          :href="!scope.row.available ? scope.row.link : null"
          :disabled="!scope.row.available"
          class="open-link"
          target="_blank"
          :underline="false"
        >
          <el-button type="primary" :disabled="scope.row.available" size="mini"
            >Open</el-button
          >
        </el-link>
        <el-button type="danger" size="mini" @click="handleDelete(scope.$index)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import Bus from "../../utils/bus";
export default {
  data() {
    return {
      isLoadData: false,
      tableData: [],
      search: ""
    };
  },
  methods: {
    handleDelete(index) {
      this.tableData.splice(index, 1);
    },
    async fetchData(fireData) {
      this.isLoadData = true;
      for (let site of fireData.website) {
        try {
          let response = await this.$http.get(`/${site}/${fireData.username}`);
          let data = response.data;
          this.tableData.push({
            website: data.name,
            link: data.url,
            username: fireData.username,
            available: data.available
          });
        } catch (e) {
          console.log(e);
        }
      }
      this.isLoadData = false;
    }
  },
  computed: {
    displayData() {
      return this.tableData.filter(
        data =>
          !this.search ||
          data.website.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  created() {
    Bus.listen("checkUsername", this.fetchData);
    Bus.listen("clearData", () => (this.tableData = []));
  }
};
</script>
<style>
.open-link {
  margin-right: 6px;
}
.el-table {
  border-radius: 5px;
}
.el-table__row div {
  text-transform: capitalize;
}
</style>
