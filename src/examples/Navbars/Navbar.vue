<template>
  <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" :class="this.$store.state.isRTL ? 'top-0 position-sticky z-index-sticky' : ''" v-bind="$attrs" id="navbarBlur" data-scroll="true">
    <div class="py-2 d-flex align-items-center navbar-collapse">
      <breadcrumbs :currentPage="currentRouteName" textWhite="text-white" />
      <div class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4" id="navbar">
        <div class="pe-md-3" :class="this.$store.state.isRTL ? 'me-md-auto' : 'ms-md-auto'">
          <argon-button v-if="currentRouteName === 'Dashboard Agv Lidar' || currentRouteName === 'Dashboard Agv Line Follower'" @click="switchToDashboard">{{ switchButtonDashboardText }}
            <i class="fas fa-sync" style="margin-left: 5px"></i>
          </argon-button>

          <argon-button v-if="currentRouteName === 'AGV Lidar' || currentRouteName === 'AGV Line Follower'" @click="switchToAGV">{{ switchButtonAGVText }}
            <i class="fas fa-sync" style="margin-left: 5px"></i>
          </argon-button>

          <argon-button v-if="currentRouteName === 'Station AGV Lidar' || currentRouteName === 'Station AGV Line Follower'" @click="switchToStation">{{ switchButtonStationText }}
            <i class="fas fa-sync" style="margin-left: 5px"></i>
          </argon-button>
        </div>
        <ul class="navbar-nav justify-content-end">
          <!-- Conditionally render the profile icon if user is logged in -->
          <li v-if="isLoggedIn" class="nav-item d-flex align-items-center">
            <argon-button class="btn-danger" target="_blank" @click="connectToRobot">
              Connect
              <i class="fas fa-wifi" style="margin-left: 5px"></i>
            </argon-button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  
    <!-- add modal -->
    <ip-input v-model:show="modal" modal-classes="modal-lg">
      <template #header>
        <h3 class="modal-title"></h3>
      </template>
      <template #body>
        <div v-if="loadingModal">
          <i class="fa fa-spinner fa-spin"></i> Loading...
        </div>
        <div v-else>
          <form v-if="modal.addIP" :validation-schema="schema">
            <div class="row">
              <!-- IP -->
              <div class="col-6  col-md-12">
                <field-form v-slot="{ field }" v-model="input.ip" type="text" name="ip">
                  <base-input v-bind="field" placeholder="IP Robot" label="IP" required></base-input>
                 
                </field-form>
              </div>
            </div>
          </form>
        </div>
      </template>
      <template #footer>
        <!-- <base-button type="secondary" @click="modal.addIP = false">
          Tutup
        </base-button> -->
       
        <button type="primary" @click="addIP()">
          <span v-if="!loading">Connect the IP</span>
          <span v-else>
            <i class="fa fa-spinner fa-spin"></i> Connecting...
          </span>
        </button>
      </template>
    </ip-input>
</template>

<script>
import Breadcrumbs from "../Breadcrumbs.vue";
import { mapMutations, mapActions } from "vuex";
import Cookies from "js-cookie";
import ArgonButton from "../../components/ArgonButton.vue";
import IpInput from "../../views/components/IpInput.vue"

export default {
  name: "navbar",
  data() {
    return {
      showMenu: false,
      isLoggedIn: !!Cookies.get("user"), // Check if user is logged in based on the presence of user in cookies
      isDashboardAGVLineFollower: false,
      isAGVLineFollower: false,
      isStationLineFollower: false,
      modal: false
    };
  },
  props: ["minNav", "textWhite"],
  created() {
    this.minNav;
  },
  methods: {
    ...mapMutations(["navbarMinimize", "toggleConfigurator"]),
    ...mapActions(["toggleSidebarColor"]),
    connectToRobot() {
      this.modal = true; // Show the modal
      console.log(this.modal);
      // Check if Vue Router is available and navigate to the "Connect" page
      if (this.$router) {
        this.$router.push({ name: 'Connect' });
      } else {
        console.error('Vue Router is not available.');
      }
    },
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
    IpInput
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
