<template>
  <nav
    class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
    :class="{
      'top-0 position-sticky z-index-sticky': $store.state.isRTL
    }"
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
          :class="$store.state.isRTL ? 'me-md-auto' : 'ms-md-auto'"
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
              currentRouteName === 'Pose AGV Lidar' ||
              currentRouteName === 'Station AGV Line Follower'
            "
            @click="switchToStation"
          >{{ switchButtonStationText }}
            <i class="fas fa-sync" style="margin-left: 5px"></i>
          </argon-button>
        </div>
        <ul class="navbar-nav justify-content-end">
          <!-- Conditionally render the profile icon if user is logged in -->
          <li
            v-if="isLoggedIn && !isDashboardAGVLineFollower"
            class="nav-item d-flex align-items-center"
          >
            <argon-button
              class="btn-danger"
              target="_blank"
              @click="connectToRobot"
            >
              Connect
              <i class="fas fa-wifi" style="margin-left: 5px"></i>
            </argon-button>
          </li>
          <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
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
        </ul>
      </div>
    </div>
  </nav>

  <!-- add modal -->
  <ip-input
    v-model:show="modal.connectIP"
    modal-classes="modal-lg"
    @hidden="clearInputs"
  >
    <template #header>
      <p class="modal-title">Connect Your AGV Here</p>
    </template>
    <template #body>
      <form :validation-schema="schema">
        <div class="mb-3">
          <h6>Available of AGV</h6>
          <multi-select
            v-model="input.code"
            :options="g$ddListAGV"
            label="name"
            track-by="id"
            placeholder="Select AGV"
            :show-labels="false"
          />
        </div>
        <base-input
          v-model="input.ip"
          label="ip"
          name="IP Address"
          track-by="id"
          placeholder="Select IP"
          :show-labels="false"
          disabled
        />
      </form>
      <p>Isi data AGV terlebih dahulu untuk menampilkan list AGV</p>
    </template>
    <template #footer>
      <argon-button class="success" @click="addIP()">
        <span v-if="!loading">Connect the IP</span>
        <span v-else>
          <i class="fa fa-spinner fa-spin"></i> Connecting...
        </span>
      </argon-button>
    </template>
  </ip-input>
</template>

<script>
import Breadcrumbs from "../Breadcrumbs.vue";
import { mapActions, mapState } from "pinia";
import { mapMutations } from "vuex";
import useDropDownStore from "@/store/dropdown";
import Cookies from "js-cookie";
import ArgonButton from "../../components/ArgonButton.vue";
import IpInput from "../../views/components/IpInput.vue";
import MultiSelect from "vue-multiselect";
import BaseInput from "../../views/components/BaseInput.vue";
import "@/assets/css/vue-multiselect.min.css";

export default {
  name: "navbar",
  data() {
    return {
      showMenu: false,
      isLoggedIn: !!Cookies.get("user"),
      isDashboardAGVLineFollower: false,
      isAGVLineFollower: false,
      isStationLineFollower: false,
      modal: {
        connectIP: false,
      },
      input: {
        code: [],
        ip: "",
      },
    };
  },
  props: ["minNav", "textWhite"],
  created() {
    this.a$ddDataAGV();
    this.minNav;
  },
  methods: {
    ...mapMutations(["navbarMinimize"]),
    ...mapActions(useDropDownStore, ["a$ddDataAGV"]),
    clearInputs() {
      this.input.code = [];
      this.input.ip = "";
    },
    connectToRobot() {
      try {
        this.a$ddDataAGV();
        this.modal.connectIP = true;
      } catch (error) {
        console.error("Error fetching AGV data:", error.message);
      }
    },
    toggleSidebar() {
      this.$store.commit("navbarMinimize");
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
        this.$router.push({ name: "Pose AGV Lidar" });
        this.isStationLineFollower = false;
      } else {
        this.$router.push({ name: "Station AGV Line Follower" });
        this.isStationLineFollower = true;
      }
    },
    addIP() {
      // Your logic to add IP
    },
  },
  components: {
    Breadcrumbs,
    ArgonButton,
    IpInput,
    MultiSelect,
    BaseInput,
  },
  watch: {
    "input.code": function (newVal) {
      console.log("New value:", newVal);
      if (newVal.ip) {
        this.input.ip = newVal.ip;
      } else {
        this.input.ip = "";
      }
    },
  },
  computed: {
    ...mapState(useDropDownStore, ["g$ddListAGV"]),
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
