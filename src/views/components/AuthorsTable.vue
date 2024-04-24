<script>
// import { useListStore } from "../../store/todo";
import { mapState, mapActions } from "pinia";

// import component
import BaseInput from "../components/BaseInput.vue";
import BaseTable from "../components/BaseTable.vue";
import ArgonButton from "../../components/ArgonButton.vue";

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
    taskData: [],
    table: {
      columns: ["agv", "station_from", "station_to", "time_start", "time_end"],
      actions: [
        {
          title: "Handle",
          event: "handle-event",
        },
        {
          title: "Edit",
          event: "edit-event",
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
      "wss://sans-api-service.onrender.com/ws/task/line"
    );

    // Simpan referensi 'this'
    const self = this;

    // Ambil data dari WebSocket
    socket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      
      try {
        // Ubah struktur data
        const modifiedData = data.map((item) => {
          console.log(item,"Adawd");
          return {
            agv: item.agv.code,
            station_from: item.station_from.code,
            station_to: item.station_to?.code ?? '',
            time_end: item?.time_end ?? '',
            time_start: item.time_start,
          };
        });

        // Simpan data yang sudah diubah
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
    BaseInput,
    BaseTable,
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
  <div class="text-center mb-5">
    <h2 class="text-white">Data Station AGV Lidar</h2>
  </div>
  <div class="card">
    <!-- <div class="d-flex justify-between card-header pb-0">
      <h6>Login first, then input your ToDo List here 👇🏻</h6>
    </div> -->

    <div class="card-body px-0 pt-0 pb-2 d-flex flex-column">
      <form
        class="card-header"
        @submit.prevent="($event) => addForm($event)"
        method="post"
        @reset="() => resetForm()"
      >
        <base-input
          v-model="input.title"
          name="Title"
          class="input"
          placeholder="add new"
          required
        ></base-input>
        <br />

        <base-input v-model="input.description" name="Description" class="input" placeholder="description"
          required></base-input>
        <br />

        <input v-model="input.completed" class="completed" type="checkbox" />
        Completed
        <br />

        <div class="button-action">
          <argon-button
            type="reset"
            class="text-center button-cancel"
            color="danger"
            variant="gradient"
            fullWidth
            size="lg"
            >Cancel</argon-button
          >
          <argon-button
            type="submit"
            class="text-center button-submit"
            color="success"
            variant="gradient"
            fullWidth
            size="lg"
            >{{ editing !== false ? "Edit" : "Add" }}</argon-button
          >
        </div>
      </form>

      <!-- <div class="card">
        <div class="card-body px-0 pt-0 pb-2 d-flex flex-column">
          <div class="container">
            <div v-for="(task, index) in taskData" :key="index">
              <h1>
                {{ task.agv.code }}
              </h1>
            </div>
          </div>
        </div>
      </div> -->

      <!-- <div class="container">
        
        <p v-for="(task, index) in taskData" :key="index">
          AGV Code: {{ task.agv.code }}, Station From: {{ task.station_from.code }}, Time Start: {{ task.time_start }}
        </p>
      </div> -->

      <div class="container table-responsive">
        <base-table
          class="table"
          :data="taskData"
          :columns="table.columns"
          :actions="table.actions"
          @handle-row="handleLogEvent"
          @edit-row="handleEditEvent"
          @remove-row="handleRemoveEvent"
        />
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
