import { createApp } from "vue";
import { createPinia } from 'pinia';
import App from "./App.vue";
import store from "./store";
import axios from 'axios';
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import ArgonDashboard from "./argon-dashboard";
import { createRouter, createWebHistory } from 'vue-router';
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const appInstance = createApp(App);
appInstance.use(createPinia());
appInstance.use(store);
appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.mount("#app");
appInstance.use(Toast, { timeout: 1500 });
appInstance.use(ToastPlugin);
