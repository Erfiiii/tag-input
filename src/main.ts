import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";
import { initServer } from "@/server";
initServer();
createApp(App).mount("#app");
