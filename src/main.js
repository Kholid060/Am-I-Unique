import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import "./assets/style.css";

import axios from "axios";
const axiosConfig = {
  baseURL: "http://localhost:3000",
  timeout: 20000
};
Vue.prototype.$http = axios.create(axiosConfig);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
