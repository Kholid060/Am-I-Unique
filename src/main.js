import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import "./assets/style.css";

// Element UI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "element-ui/lib/theme-chalk/reset.css";
import locale from "element-ui/lib/locale/lang/en";

Vue.use(ElementUI, { locale });

// Axios
import axios from "axios";
const axiosConfig = {
  baseURL: "https://username-checker-api.herokuapp.com"
};
Vue.prototype.$http = axios.create(axiosConfig);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
