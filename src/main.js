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
//   this.ros = new ROSLIB.Ros({
  //     url: 'ws://' + window.location.hostname + ':9090',
  //   });

  //   this.ros.on('connection', () => {
  //     this.connected = true;
  //     console.log('Connection to ROSBridge established');
  //   });
  //   this.ros.on('error', (error) => {
  //     console.log('Something went wrong when trying to connect');
  //     console.log(error);
  //   });
  //   this.ros.on('close', () => {
  //     this.connected = false;
  //     console.log('Connection to ROSBridge was closed');
  //   });

  //   this.mapViewer = new ROS2D.Viewer({
  //     divID: 'map',
  //     width: 400,
  //     height: 400,
  //   });

  //   this.mapGridClient = new ROS2D.OccupancyGridClient({
  //     ros: this.ros,
  //     rootObject: this.mapViewer.scene,
  //     continuous: true,
  //   });

  //   this.mapGridClient.on('change', () => {
  //     this.mapViewer.scaleToDimensions(this.mapGridClient.currentGrid.width, this.mapGridClient.currentGrid.height);
  //   });