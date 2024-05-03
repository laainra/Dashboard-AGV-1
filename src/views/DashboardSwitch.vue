<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
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
              :iconClass="stats.money.iconClass" :iconBackground="stats.money.iconBackground"
              :detail="stats.money.detail" directionReverse></card>
          </div>
          <div class="col-lg col-md-6 col-12">
            <card :title="stats.users.title" :value="stats.users.value" :percentage="stats.users.percentage"
              :iconClass="stats.users.iconClass" :iconBackground="stats.users.iconBackground"
              :detail="stats.users.detail" directionReverse></card>
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
              <div class="card-body px-0 pt-1 pb-2 d-flex flex-column">
                <div class="pb-0 card-header">
                  <div class="d-flex justify-content-between">
                    <h6 class="mb-2 card-bg">Data Task AGV Line Follower</h6>
                    <router-link to="/history-line-task" class="text-end">See History <i
                        class="fas fa-regular fa-clock"></i></router-link>
                  </div>
                </div>
                <authors-table-line-follower />
              </div>
            </div>
          </div>
          <!-- <div class="col-lg-5">
              <categories-card />
            </div> -->
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
import AuthorsTableLineFollower from "./components/AuthorsTableLineFollower.vue";

import US from "@/assets/img/icons/flags/US.png";
import DE from "@/assets/img/icons/flags/DE.png";
import GB from "@/assets/img/icons/flags/GB.png";
import BR from "@/assets/img/icons/flags/BR.png";

export default {
  name: "dashboard-agv-line-follower",
  data() {
    return {
      speed: 0,
      speedInput: '',
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
          title: "Kecepatan Rata-Rata",
          value: "2km/jam",
          percentage: "",
          iconClass: "ni ni-spaceship",
          percentageColor: "text-danger",
          iconBackground: "bg-gradient-danger",
          detail: "every navigation",
        },
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
  methods: {

    toggleAGV() {
      this.agvOn = !this.agvOn;

      const payload = this.agvOn ? "kecepatan:50" : "kecepatan:0";
      const topic = this.agvOn ? "On" : "Off";

      this.socket.send(JSON.stringify({ payload, topic }));

      console.log(`AGV ${this.agvOn ? 'Nyala' : 'Mati'}`);

    },

    setSpeed() {
      // Parse speedInput as an integer
      const speed = parseInt(this.speedInput);

      // Create the speed data payload
      const speedData = {
        payload: "kecepatan:" + speed,
        topic: "setSpeed"
      };

      // Check if the parsed speed is a valid number between 0 and 255
      if (!isNaN(speed) && speed >= 0 && speed <= 255) {
        // Send the speed data via WebSocket
        this.socket.send(JSON.stringify(speedData));
        this.speed = speed;
        console.log("Speed:", speed);
      } else {
        console.log('Please enter a valid speed between 0 and 255.');
      }

      // Clear the speedInput field
      this.speedInput = '';
    }

  },
  components: {
    Card,
    GradientLineChart,
    Carousel,
    CategoriesCard,
    AuthorsTableLineFollower,
  },
};
</script>

<style scoped>
.rotate-card {
  transition: transform 0.5s ease;
}

.rotate-card.rotate {
  transform: rotateY(180deg);
}

.card-bg {
  background: rgb(158, 242, 255);
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
}
</style>
