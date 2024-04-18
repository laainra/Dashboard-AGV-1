<template>
  <nav
    class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
    :class="
      this.$store.state.isRTL ? 'top-0 position-sticky z-index-sticky' : ''
    "
    v-bind="$attrs"
    id="navbarBlur"
    data-scroll="true"
  >
    <div class="py-2 d-flex align-items-center navbar-collapse">
      <breadcrumbs :currentPage="currentRouteName" textWhite="text-white" />

      <div
        class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4"
        id="navbar"
      >
        <div
          class="pe-md-3"
          :class="this.$store.state.isRTL ? 'me-md-auto' : 'ms-md-auto'"
        >
          <argon-button
            v-if="
              currentRouteName === 'Dashboard Agv Lidar' ||
              currentRouteName === 'Dashboard Agv Line Follower'
            "
            @click="switchToDashboard"
            >{{ switchButtonDashboardText }}
            <i class="fas fa-sync" style="margin-left: 5px"></i>
          </argon-button>

          <argon-button
            v-if="
              currentRouteName === 'AGV Lidar' ||
              currentRouteName === 'AGV Line Follower'
            "
            @click="switchToAGV"
            >{{ switchButtonAGVText }}
            <i class="fas fa-sync" style="margin-left: 5px"></i>
          </argon-button>

          <argon-button
            v-if="
              currentRouteName === 'Station AGV Lidar' ||
              currentRouteName === 'Station AGV Line Follower'
            "
            @click="switchToStation"
            >{{ switchButtonStationText }}
            <i class="fas fa-sync" style="margin-left: 5px"></i>
          </argon-button>
          <!-- <div class="input-group">
            <span class="input-group-text text-body">
              <i class="fas fa-search" aria-hidden="true"></i>
            </span>
            <input
              type="text"
              class="form-control"
              :placeholder="
                this.$store.state.isRTL ? 'أكتب هنا...' : 'Type here...'
              "
            />
          </div> -->
        </div>

        
        
          <ul class="navbar-nav justify-content-end">
            <!-- Conditionally render the profile icon if user is logged in -->
            <li v-if="isLoggedIn" class="nav-item d-flex align-items-center">
              <argon-button
                :to="{ name: 'Profile' }"
                class="btn-danger"
                target="_blank"
              >
                Connect
                <i class="fas fa-wifi" style="margin-left: 5px"></i>
              </argon-button>
            </li>
            <!-- Conditionally render the sign-in link -->
            <li v-else class="nav-item d-flex align-items-center">
              <argon-button
                :to="{ name: 'Signin' }"
                class="btn-danger"
                target="_blank"
              >
               Connect
               <i class="fas fa-wifi" style="margin-left: 5px"></i>
              </argon-button>
            </li>
            <!-- End of conditional rendering -->
            <!-- <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
              <a
                href="#"
                @click="toggleSidebar"
                class="p-0 nav-link text-white"
                id="iconNavbarSidenav"
              >
                <div class="sidenav-toggler-inner">
                  <i class="sidenav-toggler-line bg-white"></i>
                  <i class="sidenav-toggler-line bg-white"></i>
                  <i class="sidenav-toggler-line bg-white"></i>
                </div>
              </a>
            </li>
            <li class="px-3 nav-item d-flex align-items-center">
              <a class="p-0 nav-link text-white" @click="toggleConfigurator">
                <i class="cursor-pointer fa fa-cog fixed-plugin-button-nav"></i>
              </a>
            </li> -->
          </ul>
        
      </div>
    </div>
  </nav>
</template>

<script>
import Breadcrumbs from "../Breadcrumbs.vue";
import { mapMutations, mapActions } from "vuex";
import Cookies from "js-cookie";
import ArgonButton from "../../components/ArgonButton.vue";

export default {
  name: "navbar",
  data() {
    return {
      showMenu: false,
      isLoggedIn: !!Cookies.get("user"), // Check if user is logged in based on the presence of user in cookies
      isDashboardAGVLineFollower: false,
      isAGVLineFolower: false,
      isStationLineFollower: false,
    };
  },
  props: ["minNav", "textWhite"],
  created() {
    this.minNav;
  },
  methods: {
    ...mapMutations(["navbarMinimize", "toggleConfigurator"]),
    ...mapActions(["toggleSidebarColor"]),

    toggleSidebar() {
      this.toggleSidebarColor("bg-white");
      this.navbarMinimize();
    },

    switchToDashboard() {
      if (this.isDashboardAGVLineFollower) {
        this.$router.push({ name: "Dashboard Agv Lidar" });
        this.isDashboardAGVLineFollower = false;
      } else {
        this.$router.push({ name: "Dashboard Agv Line Follower" });
        this.isDashboardAGVLineFollower = true;
      }
    },

    switchToAGV() {
      if (this.isAGVLineFollower) {
        this.$router.push({ name: "AGV Lidar" });
        this.isAGVLineFollower = false;
      } else {
        this.$router.push({ name: "AGV Line Follower" });
        this.isAGVLineFollower = true;
      }
    },

    switchToStation() {
      if (this.isStationLineFollower) {
        this.$router.push({ name: "Station AGV Lidar" });
        this.isStationLineFollower = false;
      } else {
        this.$router.push({ name: "Station AGV Line Follower" });
        this.isStationLineFollower = true;
      }
    },
  },
  components: {
    Breadcrumbs,
    ArgonButton,
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
    switchButtonDashboardText() {
      return this.currentRouteName === "Dashboard Agv Line Follower"
        ? "Switch to AGV Lidar Dashboard"
        : "Switch to AGV Line Follower Dashboard";
    },
    switchButtonAGVText() {
      return this.currentRouteName === "AGV Line Follower"
        ? "Switch to AGV Lidar"
        : "Switch to AGV Line Follower";
    },
    switchButtonStationText() {
      return this.currentRouteName === "Station AGV Line Follower"
        ? "Switch to AGV Lidar Station"
        : "Switch to AGV Line Follower Station";
    },
  },
};
</script>
