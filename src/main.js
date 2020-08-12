// vue
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// sass
import "./assets/scss/_index.scss";

Vue.config.productionTip = false;

var vm = new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

global.vm = vm;
