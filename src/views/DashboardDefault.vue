<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="d-flex flex-column justify-content-center align-items-center gap-4">
        <div class="card mb-4">
          <div id="map" class="d-flex flex-column justify-content-center align-items-center
          sm:h-auto md:h-500" :class="navigationModeClass">
            <!-- <div class="p-3 w-100">
              <button class=" btn-danger btn-lg w-100" v-if="connected === false" @click="init">Connect GUI To
                Robot</button>
            </div> -->
            <img v-if="!robotConnected" src="src/assets/img/robot-with-pliers.png" style="width: 30%;" />
          </div>
        </div>
      </div>

      <div class="col-lg col-md-6">
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
      <div class="col-lg-7 mb-lg">
        <!-- line chart -->
        <div class="card z-index-2">
          <gradient-line-chart />
        </div>
      </div>
      <div class="col-lg-5">
        <carousel />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-lg-12 mb-lg-0 mb-4">
        <div class="card">
          <div class="p-3 pb-0 card-header">
            <div class="d-flex justify-content-between">
              <h6 class="mb-2">Data Station AGV Lidar</h6>
              <router-link to="/tables" class="text-end">See details</router-link>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table align-items-center">
              <tbody>
                <tr v-for="(sale, index) in sales" :key="index">
                  <td class="w-30">
                    <div class="px-2 py-1 d-flex align-items-center">
                      <div>
                        <img :src="sale.flag" alt="Country flag" />
                      </div>
                      <div class="ms-4">
                        <p class="mb-0 text-xs font-weight-bold">
                          Country:
                        </p>
                        <h6 class="mb-0 text-sm">{{ sale.country }}</h6>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="text-center">
                      <p class="mb-0 text-xs font-weight-bold">Sales:</p>
                      <h6 class="mb-0 text-sm">{{ sale.sales }}</h6>
                    </div>
                  </td>
                  <td>
                    <div class="text-center">
                      <p class="mb-0 text-xs font-weight-bold">Value:</p>
                      <h6 class="mb-0 text-sm">{{ sale.value }}</h6>
                    </div>
                  </td>
                  <td class="text-sm align-middle">
                    <div class="text-center col">
                      <p class="mb-0 text-xs font-weight-bold">Bounce:</p>
                      <h6 class="mb-0 text-sm">{{ sale.bounce }}</h6>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- <div class="col-lg-5">
            <categories-card />
          </div> -->
    </div>
  </div>


</template>
<script>
// (Give me code for getting the websocket value)
import Card from "@/examples/Cards/Card.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import Carousel from "./components/Carousel.vue";
import CategoriesCard from "./components/CategoriesCard.vue";
import ROSLIB from 'roslib';


import US from "@/assets/img/icons/flags/US.png";
import DE from "@/assets/img/icons/flags/DE.png";
import GB from "@/assets/img/icons/flags/GB.png";
import BR from "@/assets/img/icons/flags/BR.png";

export default {
  name: "dashboard-agv-lidar",
  data() {
    return {
      ros: null,
      connected: false,
      mapViewer: null,
      mapGridClient: null,
      msg: null,
      stats: {

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
          title: "Kecepatan Rata-Rata",
          value: "2km/jam",
          percentage: "",
          iconClass: "ni ni-spaceship",
          percentageColor: "text-danger",
          iconBackground: "bg-gradient-danger",
          detail: "every navigation",
        },
        // sales: {
        //   title: "Lama Penggunaan",
        //   value: "10 hours",
        //   percentage: "",
        //   iconClass: "ni ni-watch-time",
        //   iconBackground: "bg-gradient-warning",
        //   detail: "Since 07 March 2024",
        // },
      },
      sales: {
        us: {
          country: "United States",
          sales: 2500,
          value: "$230,900",
          bounce: "29.9%",
          flag: US,
        },
        germany: {
          country: "Germany",
          sales: "3.900",
          value: "$440,000",
          bounce: "40.22%",
          flag: DE,
        },
        britain: {
          country: "Great Britain",
          sales: "1.400",
          value: "$190,700",
          bounce: "23.44%",
          flag: GB,
        },
        brasil: {
          country: "Brasil",
          sales: "562",
          value: "$143,960",
          bounce: "32.14%",
          flag: BR,
        },
      },
    };
  },
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
    GradientLineChart,
    Carousel,
    CategoriesCard,
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
</style>