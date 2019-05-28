<template>
  <div class="home-container">
    <Header></Header>
    <History :history="history"></History>
    <div class="loading" v-if="loading.active">
      <Spinner :data="cliSpinners.dots"></Spinner>
      <span>👨‍💻 Fetching username availability in </span
      ><span class="green">{{ loading.name }}</span>
    </div>
    <router-link to="/gui">
      <el-button type="info" class="gui-button">GUI Mode</el-button>
    </router-link>
    <TextInput></TextInput>
  </div>
</template>
<script>
import History from "../components/CLI/history";
import Header from "../components/CLI/header";
import TextInput from "../components/CLI/input";
import Spinner from "../components/CLI/spinner";
import cliSpinners from "cli-spinners";
import Bus from "../utils/bus";
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
    pushData(userInputData) {
      this.history.push(userInputData);
      let splitInputData = userInputData.text.split(" ");
      if (splitInputData[0] === "uname") {
        if (splitInputData[1] === "--all" && splitInputData.length === 3) {
          this.checkAllSite(splitInputData[2]);
        } else if (splitInputData[1] === "--s" && splitInputData.length === 4) {
          this.checkSpesificSite({
            site: splitInputData[2],
            name: splitInputData[3]
          });
        } else if (
          splitInputData[1] === "--help" &&
          splitInputData.length === 2
        ) {
          this.history.push({
            type: "result",
            text:
              '<p><span class="green font-weight-medium"> uname --all [username] </span> Check username availability on all 100+ popular website</p><p><span class="green font-weight-medium"> uname --s (website) [username] </span> Check username availability on spesific website</p><p><span class="green font-weight-medium"> uname sites </span> get all supported website list</p>'
          });
        } else if (
          splitInputData[1] === "sites" &&
          splitInputData.length === 2
        ) {
          let sites = this.sites.map(e => e.name);
          this.history.push({
            type: "result",
            text: sites.join(", ")
          });
        } else {
          this.history.push({
            type: "error",
            text: "invalid command"
          });
        }
      } else if (splitInputData[0] === "clear") {
        this.history = [];
      } else {
        this.history.push({
          type: "error",
          text: `'${splitInputData[0]}' is not recognized as a command`
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
          let text = this.isAvailableText(data.available, name, site.name);
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
    isAvailableText(isAvailable, name, website) {
      return isAvailable
        ? `✔️ "${name}" on ${website} is available`
        : `❌ "${name}" on ${website} is already taken`;
    },
    checkSpesificSite(data) {
      let isWebsiteSupported = this.sites.find(
        e => data.site.toLowerCase() == e.name.toLowerCase()
      );
      if (isWebsiteSupported === undefined) {
        this.history.push({
          type: "error",
          text: `${data.site} is currently not supported`
        });
      } else {
        this.loading.active = true;
        this.loading.name = data.site;
        this.$http.get(`/${data.site}/${data.name}`).then(response => {
          let res = response.data;
          let text = this.isAvailableText(res.available, data.name, data.site);
          this.history.push({
            type: "result",
            text: `<span class="${
              res.available ? "green" : "red"
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
    Bus.listen("userInput", this.pushData);
  }
};
</script>
<style>
.gui-button {
  position: absolute;
  right: 5%;
  top: 5%;
}
.home-container {
  font-family: "Roboto Mono", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #c5c8c6;
  height: calc(100vh - 10px);
  padding: 0 20px;
  padding-top: 10px;
  overflow-y: auto;
}
</style>
