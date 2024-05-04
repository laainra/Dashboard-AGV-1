<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="d-flex flex-column justify-content-center align-items-center gap-4">
        <div class="card mb-4">
          <div id="map" class="d-flex flex-column justify-content-center align-items-center sm:h-auto md:h-500"
            :class="navigationModeClass">
            <!-- <div class="p-3 w-100">
              <button class=" btn-danger btn-lg w-100" v-if="connected === false" @click="init">Connect GUI To
                Robot</button>
            </div> -->
            <img v-if="!robotConnected" src="src/assets/img/robot-with-pliers.png" style="width: 30%" />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg col-md-4 col-6"> <!-- Mengatur lebar menjadi col-md-4 -->
        <div class="card z-index-2">
          <div class="card-body d-flex justify-content-center align-items-center">
            <div @click="toggleAGV">
              <i v-if="!agvOn" class="fas fa-play-circle fa-5x"></i>
              <i v-else class="fas fa-pause-circle fa-5x"></i>

            </div>
            <div v-if="agvOn">
              <h5>{{ this.speedInput }}</h5>
              <form>
                <label for="speedRange">Set Speed Between 0-255</label>
                <input id="speedRange" type="range" v-model="speedInput" min="0" max="255" @change="setSpeed">
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg col-md-6 col-6">
        <card :title="stats.money.title" :value="stats.money.value" :percentage="stats.money.percentage"
          :iconClass="stats.money.iconClass" :iconBackground="stats.money.iconBackground" :detail="stats.money.detail"
          directionReverse></card>
      </div>
      <div class="col-lg col-md-6 col-12">
        <card :title="stats.users.title" :value="stats.users.value" :percentage="stats.users.percentage"
          :iconClass="stats.users.iconClass" :iconBackground="stats.users.iconBackground" :detail="stats.users.detail"
          directionReverse></card>
      </div>
      <div class="col-lg col-md-6 col-12">
        <card :title="stats.clients.title" :value="stats.clients.value" :percentage="stats.clients.percentage"
          :iconClass="stats.clients.iconClass" :iconBackground="stats.clients.iconBackground"
          :percentageColor="stats.clients.percentageColor" :detail="stats.clients.detail" directionReverse></card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12 mb-lg">
        <!-- line chart -->
        <div class="card z-index-2">
          <gradient-line-chart />
        </div>
      </div>
      <!-- <carousel /> -->
      <!-- <div class="col-lg-2">
        <div class="card z-index-2">
          <div class="card-body d-flex justify-content-center align-items-center">
            <i class="fas fa-power-off fa-3x"></i>
          </div>
        </div>
      </div> -->
    </div>
    <div class="row mt-4">
      <div class="col-lg-12 mb-lg-0 mb-4">
        <div class="card">
          <div class="card-body px-0 pt-1 pb-2 d-flex flex-column">
            <div class="p-3 pb-0 card-header">
              <div class="d-flex justify-content-between">
                <h6 class="mb-2 card-bg">Data Task AGV Lidar</h6>
                <router-link to="/history-lidar-task" class="text-end">See History <i
                    class="fas fa-regular fa-clock"></i></router-link>
              </div>
            </div>
            <authors-table-lidar />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// (Give me code for getting the websocket value)
import Card from "@/examples/Cards/Card.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import Carousel from "./components/Carousel.vue";
import CategoriesCard from "./components/CategoriesCard.vue";
import ROSLIB from "roslib";
import BaseTableDashboard from "./components/BaseTableDashboard.vue";
import AuthorsTableLidar from "./components/AuthorsTableLidar.vue";
import { parse } from "vue/compiler-sfc";

export default {
  name: "dashboard-agv-lidar",
  data() {
    return {
      speed: 0,
      speedInput: '',
      ros: null,
      connected: false,
      mapViewer: null,
      mapGridClient: null,
      msg: null,
      agvOn: false,
      stats: {
        on_off: {
          title: "Status Robot",
          value: "fas fa-power-off", // Corrected value assignment
          iconBackground: "fas fa-power-off",
        },
        money: {
          title: "Jumlah Station",
          value: "2",
          percentage: "",
          iconClass: "ni ni-square-pin",
          detail: "Station A & B",
          iconBackground: "bg-gradient-primary",
        },
        users: {
          title: "Jumlah AGV",
          value: "2",
          percentage: "",
          iconClass: "ni ni-delivery-fast",
          iconBackground: "bg-gradient-secondary",
          detail: "Line Follower & Karakuri",
        },
        clients: {
          title: "Kecepatan",
          value: "2km/jam",
          percentage: "",
          iconClass: "ni ni-spaceship",
          percentageColor: "text-danger",
          iconBackground: "bg-gradient-danger",
          detail: "every navigation",
        },
      },
    };
  },

  created() {
    this.socket = new WebSocket(
      "wss://sans-api-service.onrender.com/ws/dashboard/lidar"
    );

    this.socket.onopen = (event) => {
      console.log(event);
      console.log("Successfully connected to the echo websocket server...");
    };

    this.socket.onclose = (event) => {
      if (event.wasClean) {
        alert(
          `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
        );
      } else {
        alert("[close] Connection died");
      }
    };

    this.socket.onerror = (error) => {
      alert(`[error]`);
    };
  },
  // methods: {


  //   toggleAGV() {
  //     this.agvOn = !this.agvOn;

  //     const payload = this.agvOn ? "kecepatan:50" : "kecepatan:0";
  //     const topic = this.agvOn ? "On" : "Off";

  //     this.socket.send(JSON.stringify({ payload, topic }));

  //     console.log(`AGV ${this.agvOn ? 'Nyala' : 'Mati'}`);

  //   },

  //   setSpeed() {
  //     // Parse speedInput as an integer
  //     const speed = parseInt(this.speedInput);

  //     // Create the speed data payload
  //     const speedData = {
  //       payload: "kecepatan:" + speed,
  //       topic: "setSpeed"
  //     };

  //     // Check if the parsed speed is a valid number between 0 and 255
  //     if (!isNaN(speed) && speed >= 0 && speed <= 255) {
  //       // Send the speed data via WebSocket
  //       this.socket.send(JSON.stringify(speedData));
  //       this.speed = speed;
  //       console.log("Speed:", speed);
  //     } else {
  //       console.log('Please enter a valid speed between 0 and 255.');
  //     }

  //     // Clear the speedInput field
  //     this.speedInput = '';
  //   }

  // },
  mounted() {
    // this.ros.on('error', function (error) {
    //   console.log(error);
    // });
    // // Find out exactly when we made a connection.
    // this.ros.on('connection', function () {
    //   console.log('Connection made!');
    // });
    // this.ros.on('close', function () {
    //   console.log('Connection closed.');
    // });
    // this.ros.connect(this.props.rosbridgeAddress);
    // let messageTopic = new ROSLIB.Topic({
    //   ros: this.ros,
    //   name: '/my_array',
    //   messageType: 'std_msgs/String'
    // });
    // messageTopic.subscribe(message => {
    //     console.log(message.data);
    //     this.setState({ msg: message.data });
    // });
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
  },
  components: {
    Card,
    Carousel,
    GradientLineChart,
    BaseTableDashboard,
    AuthorsTableLidar,
  },
};
</script>
<style>
.lidar-row {
  display: flex;
}

.lidar-cell {
  width: 10px;
  height: 10px;
}

.lidar-cell.obstacle {
  background-color: red;
}

.lidar-cell.free {
  background-color: green;
}

.card-bg {
  background: rgb(158, 242, 255);
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
}

.speed-input {
  margin-top: 20px;
}

.speed-input h5 {
  margin-bottom: 10px;
}

.speed-input label {
  display: block;
  margin-bottom: 5px;
}

.speed-input input[type="range"] {
  width: 100%;
  -webkit-appearance: none;
  background-color: #ddd;
  height: 5px;
  border-radius: 5px;
  outline: none;
}

.speed-input input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background-color: #007bff;
  border-radius: 50%;
  cursor: pointer;
}

.speed-input input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background-color: #007bff;
  border-radius: 50%;
  cursor: pointer;
}
</style>
