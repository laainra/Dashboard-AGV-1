<script>
// import { useListStore } from "../../store/todo";
import { mapState, mapActions } from "pinia";
import useHistory from "@/store/history";
import moment from "moment";
// import component
import BaseInput from "../components/BaseInput.vue";
import BaseTableDashboard from "../components/BaseTableDashboard.vue";
import ArgonButton from "../../components/ArgonButton.vue";
import "vue-datepicker-ui/lib/vuedatepickerui.css";
import VueDatepickerUi from "vue-datepicker-ui";

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
      columns: ["agv", "station_from", "station_to", "time_start", "time_end"],
      actions: [
        {
          title: "Remove",
          event: "remove-event",
        },
      ],
    },
    selectedDate: [
      new Date(),
      new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000),
    ],
  }),

  created() {
    // Panggil fungsi untuk mendapatkan data dari backend saat komponen dibuat
    this.fetchHistoryLineTasks();
    console.log("Ini history data", this.fetchHistoryLineTasks());
  },
  watch: {
    selectedDate(dates) {
      // Panggil fungsi untuk mendapatkan data baru ketika tanggal dipilih berubah
      this.fetchHistoryLineTasks(dates);
    },
  },
  components: {
    BaseTableDashboard,
    ArgonButton,
    Datepicker: VueDatepickerUi,
  },
  computed: {
    ...mapState(useHistory, ["showHistoryLineTasks"]),
  },
  methods: {
    ...mapActions(useHistory, ["a$historyLineTasksData", "a$deleteHistoryTask"]),
    handleRemoveEvent(id) {
      try {
        this.a$deleteHistoryTask(id); // Call the delete action from your Pinia store
        console.log("Delete History Task Successfully");
      } catch (error) {
        console.error("Failed to remove row:", error);
      }
    },
    async fetchHistoryLineTasks(dates = this.selectedDate) {
      try {
        const [start_date, end_date] = dates;
        await this.a$historyLineTasksData({
          start_date,
          end_date,
        });
        // ini yang iubah
        this.showHistory = this.transformData(this.showHistoryLineTasks);
      } catch (error) {
        console.error("Error fetching history line tasks:", error.message);
        throw error;
      }
    },
    transformData(historyTasks) {
      // Lakukan transformasi data di sini
      return historyTasks.map((item) => {
        // Parsing time_end dan time_start menggunakan moment
        const timeEnd = item.time_end
          ? moment(item.time_end).format("MMMM Do YYYY, h:mm:ss a")
          : "";
        const timeStart = moment(item.time_start).format(
          "MMMM Do YYYY, h:mm:ss a"
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
    },
  },

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
  <div class="container-fluid">
    <div class="text-center mb-5">
      <h2 class="text-white">Data Task AGV Line Follower</h2>
      <div class="d-flex justify-content-center">
        <Datepicker
          range
          v-model="selectedDate"
          lang="en"
          class="mb-3"
          position="center"
        />
      </div>
    </div>

    <div class="card">
      <!-- <div class="d-flex justify-between card-header pb-0">
        <h6>Login first, then input your ToDo List here 👇🏻</h6>
      </div> -->

      <div class="card-body px-0 pt-0 pb-2 d-flex flex-column">
        <div class="container table-responsive mt-3">
          <div
            v-if="!showHistoryLineTasks.length"
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
