<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg col-md-4 col-6">
            <div class="card d-flex flex-column">
              <p class="font-weight-bold px-3 py-1 m-2 text-sm">
                CONTROL & ATUR KECEPATAN
              </p>
              <div
                class="card-body d-flex justify-content-around align-items-center mb-1 p-1"
              >
                <div @click="toggleAGV" class="pointer">
                  <i v-if="!agvOn" class="fas fa-play-circle fa-3x"></i>
                  <i v-else class="fas fa-pause-circle fa-3x"></i>
                </div>
                <div>
                  <h5>{{ this.speedInput }}</h5>
                  <input
                    id="speedRange"
                    type="range"
                    v-model="speedInput"
                    min="0"
                    max="200"
                    @change="setSpeed"
                    class="w-100"
                  />
                </div>
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
                    <router-link to="/history-line-task" class="text-end"
                      >See History <i class="fas fa-regular fa-clock"></i
                    ></router-link>
                  </div>
                </div>
                <authors-table-line-follower />
              </div>
            </div>
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
import AuthorsTableLineFollower from "./components/AuthorsTableLineFollower.vue";
import useHistory from "@/store/history";

import US from "@/assets/img/icons/flags/US.png";
import DE from "@/assets/img/icons/flags/DE.png";
import GB from "@/assets/img/icons/flags/GB.png";
import BR from "@/assets/img/icons/flags/BR.png";
import axios from "axios";

export default {
  name: "dashboard-agv-line-follower",
  data() {
    return {
      speed: 0,
      speedInput: 50,
      agvOn: localStorage.getItem("agvOn") === "true",
      totalSpeed: 0, // Menyimpan total kecepatan
      speedCount: 0, // Menyimpan jumlah penghitungan kecepatan
      stats: {
        on_off: {
          title: "Status Robot",
          value: "fas fa-power-off", // Corrected value assignment
          iconBackground: "fas fa-power-off",
        },
        money: {
          title: "Jumlah Station",
          value: "0",
          percentage: "",
          iconClass: "ni ni-square-pin",
          detail: "Station",
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
          title: "Rata-Rata Nilai PWM",
          value: "0 ",
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
      "wss://sans-agv.azurewebsites.net/ws/dashboard/line"
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

    this.fetchAGVData();
    this.fetchStationData();
  },
  methods: {
    toggleAGV() {
      this.agvOn = !this.agvOn;
      localStorage.setItem("agvOn", this.agvOn);
      const payload = this.agvOn ? "kecepatan:50" : "kecepatan:0";
      const topic = this.agvOn ? "On" : "Off";

      this.socket.send(JSON.stringify({ payload, topic }));

      console.log(`AGV ${this.agvOn ? "Nyala" : "Mati"}`);
    },
    // Method lain seperti sebelumnya
    setSpeed() {
      // Parse speedInput as an integer
      const speed = parseInt(this.speedInput);

      // Create the speed data payload
      const speedData = {
        payload: "kecepatan:" + speed,
        topic: "setSpeed",
      };

      if (!isNaN(speed) && speed >= 0 && speed <= 255) {
        this.socket.send(JSON.stringify(speedData));
        this.speed = speed;

        // Menghitung total kecepatan dan jumlah penghitungan kecepatan
        this.totalSpeed += speed;
        this.speedCount++;

        // Menghitung rata-rata kecepatan
        const averageSpeed = this.totalSpeed / this.speedCount;

        // Mengupdate nilai rata-rata kecepatan pada stats.money.value
        this.stats.clients.value = averageSpeed.toFixed(2); // Menampilkan nilai dengan dua desimal

        // Tampilkan rata-rata kecepatan pada console
        console.log("Average Speed:", averageSpeed);
      } else {
        console.log("Please enter a valid speed between 0 and 255.");
      }
    },

    fetchAGVData() {
      axios
        .get("https://sans-agv.azurewebsites.net/api/agv")
        .then((response) => {
          const agvData = response.data.data;
          if (agvData.length === 0) {
            // Jika data AGV kosong, atur detail ke "AGV"
            this.stats.users.detail = "AGV";
          } else {
            // Set nilai total AGV ke dalam properti stats.users.value
            this.stats.users.value = agvData.length.toString();

            // Membuat array untuk menyimpan kode AGV
            const agvDetails = agvData.map((agv) => agv.code);

            // Periksa apakah jumlah AGV lebih dari 2
            if (agvDetails.length > 2) {
              // Ambil AGV pertama dan kedua
              const firstTwoAGVs = agvDetails.slice(0, 2);
              // Ambil AGV ketiga dan seterusnya
              const remainingAGVs = agvDetails.slice(2);
              // Gabungkan AGV-AGV pertama dan kedua
              const formattedDetail = `${firstTwoAGVs.join(", ")} & ${
                remainingAGVs[0]
              }`;
              // Set detail AGV
              this.stats.users.detail = formattedDetail;
            } else {
              // Jika jumlah AGV kurang dari atau sama dengan 2, format detail AGV dengan "&"
              this.stats.users.detail = agvDetails.join(" & ");
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching AGV data:", error);
        });
    },

    fetchStationData() {
      axios
        .get("https://sans-agv.azurewebsites.net/api/station")
        .then((response) => {
          const stationData = response.data.data;
          if (stationData.length === 0) {
            // Jika data stasiun kosong, atur detail ke "Station"
            this.stats.money.detail = "Station";
          } else {
            // Mengatur nilai total stasiun ke properti stats.money.value
            this.stats.money.value = stationData.length.toString();

            // Membuat array untuk menyimpan kode stasiun beserta kata "station"
            const stationDetails = stationData.map((station) => station.code);

            // Periksa apakah jumlah stasiun lebih dari 2
            if (stationDetails.length > 2) {
              // Ambil stasiun pertama dan kedua
              const firstTwoStations = stationDetails.slice(0, 2);
              // Ambil stasiun ketiga dan seterusnya
              const remainingStations = stationDetails.slice(2);
              // Gabungkan stasiun-stasiun pertama dan kedua
              const formattedDetail = `${firstTwoStations.join(", ")} & ${
                remainingStations[0]
              }`;
              // Set detail stasiun
              this.stats.money.detail = formattedDetail;
            } else {
              // Jika jumlah stasiun kurang dari atau sama dengan 2, format detail stasiun dengan "&"
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

.pointer {
  cursor: pointer;
}
</style>
