<script>
import ArgonButton from "../../components/ArgonButton.vue";
import BaseTableDashboard from "./BaseTableDashboard.vue";
import moment from "moment";

export default {
  name: "ListView",
  data: () => ({
    taskData: [],
    table: {
      columns: ["pose", "x", "y", "z", "w"],
      action: [
        {
          title: "Write",
          event: "write-event",
        },
        {
          title: "Read",
          event: "read-event",
        },
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
          // Parsing time_end dan time_start menggunakan moment
          const timeEnd = item.time_end
            ? moment(item.time_end).format("h:mm:ss a")
            : "";
          const timeStart = moment(item.time_start).format(
            "h:mm:ss a"
          );

          return {
            agv: item.agv.code,
            station_from: item.station_from.code,
            station_to: item.station_to?.code ?? "",
            // Mengubah time_end dan time_start menggunakan moment
            time_end: timeEnd,
            time_start: timeStart,
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
