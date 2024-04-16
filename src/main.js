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
import ROSLIB from "roslib";

const appInstance = createApp(App);
appInstance.use(createPinia());
appInstance.use(store);
appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.mount("#app");
appInstance.use(Toast, { timeout: 1500 });
appInstance.use(ToastPlugin);

// Create ros object to communicate over your Rosbridge connection
const ros = new ROSLIB.Ros({ url: "ws://localhost:9090" });

// When the Rosbridge server connects, fill the span with id "status" with "successful"
ros.on("connection", () => {
    console.log("Connection");
});

// When the Rosbridge server experiences an error, fill the "status" span with the returned error
ros.on("error", (error) => {
    console.log("Error");
  
});

// When the Rosbridge server shuts down, fill the "status" span with "closed"
ros.on("close", () => {
    console.log("Close");
});

// Create a listener for /my_topic
const my_topic_listener = new ROSLIB.Topic({
    ros,
    name: "/my_topic",
    messageType: "std_msgs/String",
  });
  
  // When we receive a message on /my_topic, add its data as a list item to the "messages" ul
  my_topic_listener.subscribe((message) => {
    console.log(message)
  });