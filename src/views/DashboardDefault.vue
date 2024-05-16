<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg col-6">
        <div class="card d-flex flex-row align-items-center">
          <div>
            <p class="font-weight-bold px-3 text-sm">JOYSTICK CONTROL</p>
            <h5
              v-if="status === 'start'"
              class="font-weight-bold px-3 text-uppercase text-start"
            >
              Start
            </h5>
            <h5
              v-else-if="status === 'stop'"
              class="font-weight-bold px-3 text-uppercase text-danger"
            >
              Stop
            </h5>
            <h5
              v-else-if="status === 'move'"
              class="font-weight-bold px-3 text-move"
            >
              {{ direction }}
            </h5>
          </div>
          <div class="card-body p-3">
            <Joystick
              :size="85"
              base-color="#FFDDDD"
              stick-color="#FF6565"
              :throttle="85"
              @start="start"
              @stop="stop"
              @move="move"
            />
          </div>
        </div>
      </div>
      <div class="col-lg col-md-6 col-6">
        <card
          :title="stats.money.title"
          :value="stats.money.value"
          :percentage="stats.money.percentage"
          :iconClass="stats.money.iconClass"
          :iconBackground="stats.money.iconBackground"
          :detail="stats.money.detail"
          directionReverse
        ></card>
      </div>
      <div class="col-lg col-md-6 col-12">
        <card
          :title="stats.users.title"
          :value="stats.users.value"
          :percentage="stats.users.percentage"
          :iconClass="stats.users.iconClass"
          :iconBackground="stats.users.iconBackground"
          :detail="stats.users.detail"
          directionReverse
        ></card>
      </div>
      <div class="col-lg col-md-6 col-12">
        <card
          :title="stats.clients.title"
          :value="stats.clients.value"
          :percentage="stats.clients.percentage"
          :iconClass="stats.clients.iconClass"
          :iconBackground="stats.clients.iconBackground"
          :percentageColor="stats.clients.percentageColor"
          :detail="stats.clients.detail"
          directionReverse
        ></card>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 mb-lg mb-3">
        <div class="card">
          <div class="card-body px-0 pt-1 pb-2 d-flex flex-column">
            <div class="pb-0 card-header">
              <div class="d-flex justify-content-between">
                <h6 class="mb-2 card-bg">Data Pose AGV Lidar</h6>
                <!-- <router-link to="/history-line-task" class="text-end">
                  See History <i class="fas fa-regular fa-clock"></i>
                </router-link> -->
              </div>
            </div>
            <authors-table-lidar-pose />
          </div>
        </div>
      </div>
      <!-- <div class="col-lg-5">
        <carousel />
      </div> -->
    </div>

    <div class="row">
      <div class="col-lg-12 mb-lg mb-3">
        <div class="card">
          <div class="card-body px-0 pt-1 pb-2 d-flex flex-column">
            <div class="pb-0 card-header">
              <div class="d-flex justify-content-between">
                <h6 class="mb-2 card-bg">Data Task AGV Lidar</h6>
                <router-link to="/history-line-task" class="text-end">
                  See History <i class="fas fa-regular fa-clock"></i>
                </router-link>
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
import Card from "@/examples/Cards/Card.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import Carousel from "./components/Carousel.vue";
import CategoriesCard from "./components/CategoriesCard.vue";
import ROSLIB from "roslib";
import BaseTableDashboard from "./components/BaseTableDashboard.vue";
import AuthorsTableLidar from "./components/AuthorsTableLidar.vue";
import AuthorsTableLidarPose from "./components/AuthorsTableLidarPose.vue";
import Joystick from "vue-joystick-component";
import axios from "axios";
import { useToast } from 'vue-toast-notification';

export default {
  name: "dashboard-agv-lidar",
  data() {
    return {
      status: "", // Menambahkan status
      direction: "", // Menambahkan direction
      speed: 0,
      speedInput: "",
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
          title: "Jumlah Pose",
          value: "0",
          percentage: "",
          iconClass: "ni ni-square-pin",
          detail: "Pose",
          iconBackground: "bg-gradient-primary",
        },
        users: {
          title: "Jumlah AGV",
          value: "0",
          percentage: "",
          iconClass: "ni ni-delivery-fast",
          iconBackground: "bg-gradient-secondary",
          detail: "AGV",
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
      const toast = useToast()
      console.log(event);
      toast.success("Successfully connected to the echo websocket server...");
    };

    this.socket.onclose = (event) => {
      const toast = useToast()
      if (event.wasClean) {
        toast.warning(
          `Connection closed cleanly, code=${event.code} reason=${event.reason}`
        );
      } else {
        toast.danger("Connection died");
      }
    };

    this.socket.onerror = (error) => {
      alert(`[error]`);
    };

    this.fetchPoseData();
    this.fetchAGVData();
  },
  methods: {
    start() {
      console.log("start");
      this.status = "start"; // Update status on start
    },
    stop() {
      console.log("stop");
      this.status = "stop"; // Update status on stop
    },
    move({ x, y, direction, distance }) {
      console.log("move", { x, y, direction, distance });
      this.direction = direction; // Update direction
      this.status = "move"; // Update status on move
    },
    fetchAGVData() {
      axios
        .get("https://sans-agv.azurewebsites.net/api/agv")
        .then((response) => {
          const agvData = response.data.data;
          if (agvData.length === 0) {
            this.stats.users.detail = "AGV";
          } else {
            this.stats.users.value = agvData.length.toString();
            const agvDetails = agvData.map((agv) => agv.code);
            if (agvDetails.length > 2) {
              const firstTwoAGVs = agvDetails.slice(0, 2);
              const remainingAGVs = agvDetails.slice(2);
              const formattedDetail = `${firstTwoAGVs.join(", ")} & ${
                remainingAGVs[0]
              }`;
              this.stats.users.detail = formattedDetail;
            } else {
              this.stats.users.detail = agvDetails.join(" & ");
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching AGV data:", error);
        });
    },
    fetchPoseData() {
      axios
        .get("https://sans-agv.azurewebsites.net/api/pose")
        .then((response) => {
          const stationData = response.data.data;
          if (stationData.length === 0) {
            this.stats.money.detail = "Station";
          } else {
            this.stats.money.value = stationData.length.toString();
            const stationDetails = stationData.map((station) => station.code);
            if (stationDetails.length > 2) {
              const firstTwoStations = stationDetails.slice(0, 2);
              const remainingStations = stationDetails.slice(2);
              const formattedDetail = `${firstTwoStations.join(", ")} & ${
                remainingStations[0]
              }`;
              this.stats.money.detail = formattedDetail;
            } else {
              this.stats.money.detail = stationDetails.join(" & ");
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching Station data:", error);
        });
    },
  },
  components: {
    Card,
    Carousel,
    GradientLineChart,
    BaseTableDashboard,
    AuthorsTableLidar,
    AuthorsTableLidarPose,
    Joystick,
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

.text-start {
  color: green;
}

.text-move {
  color: orange;
}
</style>
