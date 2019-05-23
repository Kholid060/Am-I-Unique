<template>
  <div class="home-container">
    <Header></Header>
    <History :history="history"></History>
    <div class="loading" v-if="loading.active">
      <Spinner :data="cliSpinners.dots"></Spinner>
      <span>Fetching username availability in </span
      ><span>{{ loading.name }}</span>
    </div>
    <TextInput></TextInput>
  </div>
</template>
<script>
import History from "../components/history";
import Header from "../components/header";
import TextInput from "../components/input";
import Spinner from "../components/spinner";
import cliSpinners from "cli-spinners";
import Bus from "../bus/";
export default {
  components: { Header, TextInput, History, Spinner },
  data: () => ({
    cliSpinners,
    sites: [],
    history: [],
    loading: {
      active: false,
      name: ""
    }
  }),
  methods: {
    pushData(e) {
      let a = e.text.split(" ");
      if (a[0] === "uname") {
        if (a[1] === "--all" && a.length === 3) {
          this.checkAllSite(a[2]);
        } else if (a[1] === "--s" && a.length === 4) {
          this.checkSpesificSite({ site: a[2], name: a[3] });
        } else {
          this.history.push({
            type: "error",
            text: "invalid command"
          });
        }
      } else if (a[0] === "clear") {
        this.history = [];
      } else {
        this.history.push({
          type: "error",
          text: `'${a[0]}' is not recognized as a command`
        });
      }
    },
    async checkAllSite(name) {
      this.loading.active = true;
      for (let site of this.sites) {
        this.loading.name = site.name;
        try {
          let response = await this.$http.get(`/${site.name}/${name}`);
          let data = response.data;
          let text = data.available
            ? `username on ${site.name} is available`
            : `username on ${site.name} is already taken`;
          this.history.push({
            type: "result",
            text: `<span class="${
              data.available ? "green" : "red"
            }">${text}</span>`
          });
        } catch (e) {
          console.log(e);
        }
      }
    },
    checkSpesificSite(data) {
      let find = this.sites.find(
        e => data.site.toLowerCase() == e.name.toLowerCase()
      );
      if (find === undefined) {
        this.history.push({
          type: "error",
          text: `${data.site} is currently not supported`
        });
      } else {
        this.loading.active = true;
        this.loading.name = data.site;
        this.$http.get(`/${data.site}/${data.name}`).then(response => {
          let data = response.data;
          let text = data.available
            ? `username on ${data.name} is available`
            : `username on ${data.name} is already taken`;
          this.history.push({
            type: "result",
            text: `<span class="${
              data.available ? "green" : "red"
            }">${text}</span>`
          });
          this.loading.active = false;
        });
      }
    }
  },
  mounted() {
    this.$http.get("/sites").then(response => (this.sites = response.data));
  },
  created() {
    Bus.listen("data", this.pushData);
  }
};
</script>
<style>
.home-container {
  height: 100%;
  padding: 20px;
}
</style>
