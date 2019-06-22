import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import { auth } from "@/firebase/init";

Vue.config.productionTip = false;

let app = null;

// to load only when auth data is loaded
auth.onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});
