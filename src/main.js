import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "locomotive-scroll/src/locomotive-scroll.scss";
import "./assets/scss/_index.scss";

const app = createApp(App);

app.use(router);

app.mount("#app");
