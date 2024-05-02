<script>
import ArgonButton from "../../components/ArgonButton.vue";
import BaseTableDashboard from "./BaseTableDashboard.vue";

export default {
  name: "ListView",
  data: () => ({
    taskData: [],
    table: {
      columns: ["agv", "station_from", "station_to", "time_start", "time_end"],
      action: [
        {
          title: "Remove",
          event: "remove-event",
        },
      ],
    },
  }),

  created() {
    const socket = new WebSocket(
      "wss://sans-api-service.onrender.com/ws/task/lidar"
    );

    const self = this;

    socket.onmessage = function (event) {
      const data = JSON.parse(event.data);

      try {
        const modifiedData = data.map((item) => {
          console.log(item, "Adawd");
          return {
            agv: item.agv.code,
            station_from: item.station_from.code,
            station_to: item.station_to?.code ?? "",
            time_end: item?.time_end ?? "",
            time_start: item.time_start,
          };
        });

        self.taskData = modifiedData;
      } catch (error) {
        console.error("Failed to parse incoming WebSocket message:", error);
      }
      console.log("Received data from WebSocket:", data);
    };

    socket.onopen = function (event) {
      console.log(event);
      console.log("Successfully connected to the echo websocket server...");
    };

    socket.onclose = function (event) {
      if (event.wasClean) {
        alert(
          `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
        );
      } else {
        alert("[close] Connection died");
      }
    };

    socket.onerror = function (error) {
      alert(`[error]`);
    };
  },
  components: {
    BaseTableDashboard,
    ArgonButton,
  },
  // computed: {
  //   ...mapState(useListStore, ["getList", "getDetail"]),
  // },
  // async mounted() {
  //   await this.a$list();
  // },
  // methods: {
  //   ...mapActions(useListStore, ["a$list", "a$add", "a$edit", "a$delete"]),

  //   async handleEditEvent(row) {
  //     try {
  //       this.editing = row.id;
  //       this.input = { ...row };
  //     } catch (error) {
  //       console.error("Failed to prepare edit:", error);
  //     }
  //   },

  //   async addForm(event) {
  //     try {
  //       event.preventDefault();
  //       if (this.editing) {
  //         await this.a$edit({ id: this.input.id, data: this.input });
  //       } else {
  //         await this.a$add({ ...this.input });
  //       }

  //       this.resetForm();
  //     } catch (error) {
  //       console.error("Failed to add/edit entry:", error);
  //     }
  //   },

  //   async handleRemoveEvent(row) {
  //     try {
  //       await this.a$delete(row.id);
  //     } catch (error) {
  //       console.error("Failed to remove row:", error);
  //     }
  //   },

  //   resetForm() {
  //     this.input = { ...initialInput };
  //     this.editing = false;
  //   },
  // },
};
</script>

<template>
  <div class="container table-responsive">
    <div class="d-flex justify-content-between p-2">
      <h6 class="mb-2">Data AGV Lidar</h6>
      <router-link to="/tables" class="text-end">See details
        <i class="fa-solid fa-clock-rotate-left"></i>
      </router-link>
    </div>
    <base-table-dashboard
      class="table"
      :data="taskData"
      :columns="table.columns"
      :actions="table.action"
      @remove-row="handleRemoveEvent"
    />
  </div>
</template>
