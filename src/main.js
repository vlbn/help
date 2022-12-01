import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import "bulma";
import "locomotive-scroll/src/locomotive-scroll.scss";
import "./assets/scss/_index.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
