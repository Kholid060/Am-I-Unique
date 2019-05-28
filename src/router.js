import Vue from "vue";
import Router from "vue-router";
import CLI from "./views/cli.vue";
import GUI from "./views/gui.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "CLI",
      component: CLI
    },
    {
      path: "/gui",
      name: "GUI",
      component: GUI
    }
  ]
});
