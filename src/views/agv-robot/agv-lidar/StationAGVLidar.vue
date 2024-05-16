<template>
  <div class="text-center mb-5">
    <h2 class="text-white">Data Pose AGV Lidar</h2>
  </div>
  <div class="card">
    <div class="card-body px-0 pt-0 pb-2 d-flex flex-column">
      <form
        class="card-header"
        @submit.prevent="($event) => addForm($event)"
        method="post"
        @reset="resetForm"
      >
        <base-input
          v-model="input.code"
          name="x"
          class="input"
          placeholder="add pose 1"
          required
        ></base-input>
        <br />

        <base-input
          v-model="input.status"
          name="y"
          class="input"
          placeholder="add pose 2"
          required
        ></base-input>
        <br />

        <base-input
          v-model="input.status"
          name="z"
          class="input"
          placeholder="add pose 3"
          required
        ></base-input>
        <br />

        <base-input
          v-model="input.status"
          name="w"
          class="input"
          placeholder="add pose 4"
          required
        ></base-input>
        <br />
        <base-input
          v-model="input.status"
          name="code"
          class="input"
          placeholder="add pose 4"
          required
        ></base-input>
        <br />

        <div class="button-action">
          <argon-button
            type="reset"
            class="text-center button-cancel"
            color="danger"
            variant="gradient"
            fullWidth
            size="lg"
          >
            Cancel
          </argon-button>
          <argon-button
            type="submit"
            class="text-center button-submit"
            color="success"
            variant="gradient"
            fullWidth
            size="lg"
          >
            {{ editing !== null ? "Update" : "Add" }}
          </argon-button>
        </div>
      </form>

      <div class="container table-responsive">
        <base-table
          class="table"
          :columns="table.columns"
          :data="g$getStations"
          @edit-row="handleEditEvent"
          @remove-row="handleRemoveEvent"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import BaseTable from "../../components/BaseTable.vue";
import ArgonButton from "../../../components/ArgonButton.vue";
import BaseInput from "../../components/BaseInput.vue";
import useStationStore from "@/store/station";
import { useToast } from "vue-toastification";

const initialInput = {
  x: "",
  y: "",
  z: "",
  w: "",
  code: "",
};

export default {
  name: "ListViewStationAGVLidar",
  data() {
    return {
      input: { ...initialInput },
      editing: null,
      table: {
        columns: ["x", "y", "z", "w", "code"],
      },
    };
  },
  components: {
    BaseTable,
    ArgonButton,
    BaseInput,
  },
  computed: {
    ...mapState(useStationStore, ["g$getStations", "g$getDetail"]),
  },
  async mounted() {
    await this.a$getStations();
  },
  methods: {
    ...mapActions(useStationStore, [
      "a$addStation",
      "a$getStations",
      "a$editStation",
      "a$deleteStation",
    ]),

    async addForm(event) {
      try {
        event.preventDefault();
        if (this.editing) {
          await this.a$editStation({
            id: this.input._id,
            updatedStationData: this.input,
          });
          const toast = useToast();
          toast.success(`Station ${this.input.code} updated successfully`);
          this.editing = null;
        } else {
          await this.a$addStation({ ...this.input });
          await this.a$getStations();
          const toast = useToast();
          toast.success(`Station ${this.input.code} added successfully`);
        }
        this.resetForm();
      } catch (error) {
        console.error("Failed to add/edit entry:", error);
      }
    },

    handleEditEvent(row) {
      try {
        this.editing = row._id;
        console.log(row._id);
        this.input = { ...row };
      } catch (error) {
        console.error("Failed to prepare edit:", error);
      }
    },

    async handleRemoveEvent(row) {
      const toast = useToast();
      try {
        const idToRemove = row._id;
        await this.a$deleteStation(idToRemove);
        toast.success(`Station with code ${row.code} deleted`);
        if (idToRemove === this.editing) {
          this.editing = null;
        }
      } catch (error) {
        console.error("Failed to remove row:", error);
      }
    },

    resetForm() {
      this.input = { ...initialInput };
    },
  },
};
</script>

<style scoped lang="scss">
.completed {
  margin-bottom: 1.4rem;
}
.button-action {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin: 1rem 0;
}
</style>
