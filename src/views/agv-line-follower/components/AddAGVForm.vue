<template>
  <div class="">
    <div class="card card-body px-0 pt-0 pb-2 d-flex flex-column">
      <form
        class="card-header"
        role="form"
        method="post"
        @submit.prevent="() => addAGV()"
      >
        <div class="form-group">
          <label for="code" class="label form-control-label">Code</label>
          <input type="text" id="code" class="input" v-model="code" required />
        </div>
        <div class="form-group">
          <label for="description" class="label form-control-label"
            >Description</label
          >
          <input
            type="text"
            id="description"
            class="input"
            v-model="description"
            required
          />
        </div>

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
      <div class="container table-responsive">
        <AGVTable class="table" />
      </div>
    </div>
  </div>
</template>

<script>
import useAgvStore from "@/store/agv"; // import module AGV service yang berisi method API CRUD untuk AGV// import module Auth service yang berisi method API CRUD untuk Auth
import { mapActions } from "pinia"; // import mapActions untuk mengakses method dari store
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import AGVTable from "./AGVTable.vue";
import ArgonButton from "../../../components/ArgonButton.vue";

const $toast = useToast();
export default {
  components: {
    AGVTable,
    ArgonButton,
  },
  // membuat function data untuk manipulasi data dalam komponen
  data() {
    return {
      code: "",
      description: "",
      // status: "",
    };
  },
  methods: {
    // membut method untuk mengambil data dari form kemudian disimpan di database melalui API dari AGV service
    ...mapActions(useAgvStore, ["g$addAGV"]),
    async addAGV() {
      try {
        await this.g$addAGV({
          code: this.code,
          description: this.description,
        });
        $toast.success("Add AGV Success!", { duration: 10000 });
        this.resetForm();
      } catch (error) {
        console.log(error);
        $toast.error("Failed to add AGV");
      }
    },
    resetForm() {
      // method untuk mereset isi form
      this.code = "";
      this.description = "";
    },
  },
};
</script>

<style scoped>
.button-action {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-bottom: 1rem;
}

.label {
  color: #000000;
  font-size: 14px;
}
</style>
