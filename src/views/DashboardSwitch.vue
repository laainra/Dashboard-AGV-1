<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
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
                    <h6 class="mb-2 card-bg">Data Station AGV Line Follower</h6>
                    <router-link to="/history-line-task" class="text-end"
                      >See History <i class="fas fa-regular fa-clock"></i></router-link>
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
