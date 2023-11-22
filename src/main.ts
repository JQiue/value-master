// import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import TDesign from "tdesign-vue-next";

createApp(App).use(createPinia()).use(router).use(TDesign).mount("#app");
