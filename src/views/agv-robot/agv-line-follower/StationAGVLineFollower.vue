<template>
  <div class="text-center mb-5">
    <h2 class="text-white">Data Station AGV Line Follower</h2>
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
          name="Code"
          class="input"
          placeholder="add station code"
          required
        ></base-input>
        <br />

        <base-input
          v-model="input.status"
          name="Status"
          class="input"
          placeholder="add status"
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
          :data="getStations"
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
  code: "",
  status: "",
};

export default {
  name: "ListViewStationAGVLineFollower",
  data() {
    return {
      input: { ...initialInput },
      editing: null,
      table: {
        columns: ["code", "status"],
      },
    };
  },
  components: {
    BaseTable,
    ArgonButton,
    BaseInput,
  },
  computed: {
    ...mapState(useStationStore, ["getStations", "getDetail"]),
  },
  mounted() {
    useStationStore().g$getStations();
  },
  methods: {
    ...mapActions(useStationStore, [
      "g$addStation",
      "g$editStation",
      "g$deleteStation",
    ]),

    async addForm(event) {
      try {
        event.preventDefault();
        if (this.editing) {
          await this.g$editStation({
            id: this.input._id,
            updatedStationData: this.input,
          });
          const toast = useToast();
          toast.success(`Station ${this.input.code} updated successfully`);
          this.editing = null;
        } else {
          await this.g$addStation({ ...this.input });
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
        const idToRemove = row._id; // Simpan id yang akan dihapus
        await this.g$deleteStation(idToRemove);
        toast.success(`Station with code ${row.code} deleted`);
        if (idToRemove === this.editing) {
          // Gunakan id yang disimpan untuk memeriksa
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
