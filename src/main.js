import { createApp } from "vue";
import App from "./App.vue";

import "locomotive-scroll/src/locomotive-scroll.scss";
import "./assets/_index.scss";

const app = createApp(App);

app.mount("#app");
