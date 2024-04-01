<template>
  <div
    class="collapse navbar-collapse w-auto h-auto h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-item
          :url="
            isDashboardAgvLidar
              ? '/dashboard-agv-lidar'
              : '/dashboard-agv-line-follower'
          "
          :class="{
            active: isDashboardAgvLidar
              ? $route.path === '/dashboard-agv-lidar'
              : $route.path === '/dashboard-agv-line-follower',
          }"
          :navText="this.$store.state.isRTL ? 'لوحة القيادة' : 'Dashboard'"
          @click.native="navigateToDashboard()"
        >
          <template v-slot:icon>
            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li v-if="isLoggedIn" class="nav-item">
        <sidenav-item
          :url="isDashboardAgvLidar ? '/agv-lidar' : '/agv-line-follower'"
          :class="{
            active: isDashboardAgvLidar
              ? $route.path === '/agv-lidar'
              : $route.path === '/agv-line-follower',
          }"
          :navText="this.$store.state.isRTL ? 'لوحة القيادة' : 'AGV'"
          @click.native="navigateToAGV()"
        >
          <template v-slot:icon>
            <i class="ni ni-delivery-fast text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
        <sidenav-item
          :url="
            isDashboardAgvLidar
              ? '/station-agv-lidar'
              : '/station-agv-line-follower'
          "
          :class="{
            active: isDashboardAgvLidar
              ? $route.path === '/station-agv-lidar'
              : $route.path === '/station-agv-line-follower',
          }"
          :navText="this.$store.state.isRTL ? 'لوحة القيادة' : 'Station'"
          @click.native="navigateToStation()"
        >
          <template v-slot:icon>
            <i class="ni ni-app text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="mt-3 nav-item">
        <h6
          v-if="this.$store.state.isRTL"
          class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
        >
          صفحات المرافق
        </h6>
        <h6
          v-else
          class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
        >
          ACCOUNT PAGES
        </h6>
      </li>
      <li v-if="isLoggedIn" class="nav-item">
        <sidenav-item
          url="/profile"
          :class="getRoute() === 'profile' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'حساب تعريفي' : 'Profile'"
        >
          <template v-slot:icon>
            <i class="ni ni-single-02 text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li v-if="!isLoggedIn" class="nav-item">
        <sidenav-item
          url="/signin"
          :class="getRoute() === 'signin' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'تسجيل الدخول' : 'Sign In'"
        >
          <template v-slot:icon>
            <i class="ni ni-single-copy-04 text-danger text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li v-if="!isLoggedIn" class="nav-item">
        <sidenav-item
          url="/signup"
          :class="getRoute() === 'signup' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'اشتراك' : 'Sign Up'"
        >
          <template v-slot:icon>
            <i class="ni ni-collection text-info text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li v-if="isLoggedIn" class="nav-item">
        <router-link to="/" class="nav-link" @click="logout">
          <i class="ni ni-user-run text-warning text-sm opacity-10"></i>
          <span v-if="this.$store.state.isRTL">الخروج</span>
          <span v-else>Logout</span>
        </router-link>
      </li>
    </ul>
  </div>
  <div class="pt-3 mx-3 mt-3 sidenav-footer">
    <sidenav-card
      :class="cardBg"
      textPrimary="Need Help?"
      textSecondary="Please check our docs"
    />
  </div>
  <!-- Other menu items -->
  <!-- <li class="nav-item">
        <sidenav-item
          url="/tables"
          :class="getRoute() === 'tables' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'الجداول' : 'Tables'"
        >
          <template v-slot:icon>
            <i class="ni ni-calendar-grid-58 text-warning text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li> -->

  <!-- <li class="nav-item">
        <sidenav-item
          url="/todo"
          :class="getRoute() === 'todo' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'الفواتیر' : 'XXXXXXX'"
        >
          <template v-slot:icon>
            <i class="ni ni-credit-card text-success text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
          url="/todo-form"
          :class="getRoute() === 'todo-form' ? 'active' : ''"
          navText="XXXXXXX"
        >
          <template v-slot:icon>
            <i class="ni ni-world-2 text-danger text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li> -->

  <!-- Sidenav footer -->
</template>

<script>
import SidenavItem from "./SidenavItem.vue";
import Cookies from "js-cookie";

export default {
  name: "SidenavList",
  props: {
    cardBg: String,
  },
  data() {
    return {
      isLoggedIn: !!Cookies.get("user"),
      // Menyimpan informasi tentang jenis dashboard yang sedang ditampilkan
      currentDashboardType: "",
    };
  },
  computed: {
    isDashboardAgvLidar() {
      return this.$route.path === "/dashboard-agv-lidar";
    },
  },
  components: {
    SidenavItem,
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
    navigateToDashboard() {
      // Menavigasi kembali ke dashboard yang sesuai berdasarkan informasi terbaru
      if (this.currentDashboardType === "agv-lidar") {
        this.$router.push("/dashboard-agv-lidar");
      } else {
        this.$router.push("/dashboard-agv-line-follower");
      }
    },
    navigateToAGV() {
      // Menavigasi kembali ke dashboard yang sesuai berdasarkan informasi terbaru
      if (this.currentDashboardType === "agv-lidar") {
        this.$router.push("/agv-lidar");
      } else {
        this.$router.push("/agv-line-follower");
      }
    },
    navigateToStation() {
      // Menavigasi kembali ke dashboard yang sesuai berdasarkan informasi terbaru
      if (this.currentDashboardType === "agv-lidar") {
        this.$router.push("/station-agv-lidar");
      } else {
        this.$router.push("/station-agv-line-follower");
      }
    },

    logout() {
      Cookies.remove("user");
      this.isLoggedIn = false;
      this.$router.push("/");
    },
  },
  watch: {
    // Memperbarui jenis dashboard saat rute berubah
    $route(to, from) {
      if (to.path === "/dashboard-agv-lidar") {
        this.currentDashboardType = "agv-lidar";
      } else if (to.path === "/dashboard-agv-line-follower") {
        this.currentDashboardType = "agv-line-follower";
      }
    },
  },
};
</script>
