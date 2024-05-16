<script>
import ArgonButton from "../../components/ArgonButton.vue";
import BaseTableDashboard from "./BaseTableDashboard.vue";
import moment from "moment";

export default {
  name: "ListView",
  data: () => ({
    taskData: [],
    table: {
      columns: ["agv", "station_from", "station_to", "time_start", "time_end"],
    },
  }),

  created() {
    const socket = new WebSocket("wss://sans-agv.azurewebsites.net/ws/task/line");
    const self = this;

    socket.onmessage = function (event) {
      const data = JSON.parse(event.data);

      try {
        const modifiedData = data.map((item) => {
          const timeEnd = item.time_end ? moment(item.time_end) : null;
          const timeStart = moment(item.time_start);

          const duration = timeEnd && timeEnd.isValid() && timeStart.isValid()
            ? timeEnd.diff(timeStart, 'seconds')
            : null;

          return {
            agv: item.agv.code,
            station_from: item.station_from.code,
            station_to: item.station_to?.code ?? "",
            time_end: timeEnd ? timeEnd.format("h:mm:ss a") : "",
            time_start: timeStart.format("h:mm:ss a"),
            duration: duration,
          };
        });

        self.taskData = modifiedData;

        // Menghitung kecepatan rata-rata
        self.calculateAverageSpeed(modifiedData);
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
        alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
      } else {
        alert("[close] Connection died");
      }
    };

    socket.onerror = function (error) {
      alert(`[error] ${error.message}`);
    };
  },
  methods: {
    calculateAverageSpeed(data) {
      const distance = 10; // Misalkan jarak antar stasiun adalah 10 meter
      let totalSpeed = 0;
      let count = 0;

      data.forEach((item) => {
        if (item.duration !== null && item.duration > 0) {
          const speed = distance / item.duration;
          totalSpeed += speed;
          count++;
        }
      });

      const averageSpeed = count > 0 ? (totalSpeed / count).toFixed(2) : 0;
      console.log(`Kecepatan rata-rata: ${averageSpeed} m/s`);
      this.$emit('average-speed', averageSpeed);
    },
  },
  components: {
    BaseTableDashboard,
    ArgonButton,
  },
};
</script>

<template>
  <div class="container table-responsive">
    <base-table-dashboard
      class="table"
      :data="taskData"
      :columns="table.columns"
      :actions="table.action"
      @remove-row="handleRemoveEvent"
    />
  </div>
</template>
