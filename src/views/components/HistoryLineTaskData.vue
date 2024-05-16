<script>
import { mapState, mapActions } from "pinia";
import useHistoryStore from "@/store/history";
import moment from "moment";
import BaseTableDashboard from "../components/BaseTableDashboard.vue";
import ArgonButton from "../../components/ArgonButton.vue";
import "vue-datepicker-ui/lib/vuedatepickerui.css";
import VueDatepickerUi from "vue-datepicker-ui";
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";

const initialInput = {
  title: "",
  description: "",
  category: "",
  completed: false,
};

export default {
  name: "ListView",
  data: () => ({
    input: { ...initialInput },
    editing: false,
    showHistory: [],
    table: {
      columns: [
        "agv",
        "station_from",
        "station_to",
        "date",
        "time_start",
        "time_end",
      ],
    },
    selectedDate: [
      new Date(),
      new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000),
    ],
  }),

  async mounted() {
    await this.fetchHistoryLineTasks();
    console.log("Ini history data", this.fetchHistoryLineTasks());
  },

  watch: {
    selectedDate(dates) {
      this.fetchHistoryLineTasks(dates);
    },
  },
  components: {
    BaseTableDashboard,
    ArgonButton,
    Datepicker: VueDatepickerUi,
  },
  computed: {
    ...mapState(useHistoryStore, ["g$showHistoryLineTasks"]),
  },
  methods: {
    ...mapActions(useHistoryStore, [
      "a$historyLineTasksData",
      "a$deleteHistoryTask",
    ]),

    async handleRemoveEvent(row) {
      console.log("Row to be removed:", row);
      try {
        const idToRemove = row._id;
        console.log(`hapus: ${idToRemove}`);
        await this.a$deleteHistoryTask(idToRemove);
        await this.fetchHistoryLineTasks();
        this.showToast("History Task Deleted Successfully", "success");
      } catch (error) {
        console.error("Failed to remove row:", error);
      }
    },

    showToast(message, type) {
      const toast = useToast();
      toast(message, { type });
    },

    async fetchHistoryLineTasks(dates = this.selectedDate) {
      try {
        const [start_date, end_date] = dates;
        await this.a$historyLineTasksData({
          start_date,
          end_date,
        });
        this.showHistory = this.transformData(this.g$showHistoryLineTasks);
      } catch (error) {
        console.error("Error fetching history line tasks:", error.message);
        throw error;
      }
    },

    transformData(historyTasks) {
      return historyTasks.map((item) => {
        const timeEnd = item.time_end
          ? moment(item.time_end).format("h:mm:ss a")
          : "";
        const timeStart = moment(item.time_start).format("h:mm:ss a");
        const dateStart = moment(item.time_start).format("MMMM Do YYYY");
        return {
          _id: item._id,
          agv: item.agv.code,
          station_from: item.station_from.code,
          station_to: item.station_to?.code ?? "",
          time_start: timeStart,
          time_end: timeEnd,
          date: dateStart,
        };
      });
    },
  },
};
</script>

<template>
  <div class="container-fluid">
    <div class="text-center mb-5">
      <h2 class="text-white">Data Task AGV Line Follower</h2>
    </div>
    <div class="d-flex justify-content-end align-items-center">
      <div>
        <Datepicker
          range
          v-model="selectedDate"
          lang="en"
          class="mb-3"
          position="right"
        />
      </div>
    </div>

    <div class="card">
      <div class="card-body px-0 pt-0 pb-2 d-flex flex-column">
        <div class="container table-responsive mt-3">
          <div
            v-if="!g$showHistoryLineTasks.length"
            class="text-center text-muted"
          >
            <img
              src="src/assets/img/robot-with-pliers.png"
              style="width: 30%"
            />
            <h3 class="mb-4">Data Not Found</h3>
          </div>
          <base-table-dashboard
            v-else
            class="table"
            :data="showHistory"
            :columns="table.columns"
            :actions="table.actions"
            @remove-row="handleRemoveEvent"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.completed {
  margin-bottom: 1.4rem;
}

.button-action {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-bottom: 1rem;
}
</style>
