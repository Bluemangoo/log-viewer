import { createApp } from "vue";
import "./style.css";
import "vue-virtual-scroller/index.css";
import App from "./App.vue";
import "./data/ws.ts";
import VueVirtualScroller from "vue-virtual-scroller";

createApp(App).use(VueVirtualScroller).mount("#app");
