<!-- Membuat komponen form untuk edit AGV -->
<template>
    <div class="card">
      <form @submit.prevent="editAGV">
        <div class="card-body">
          <div class="form-group">
            <label for="code" class="form-control-label">Code</label>
            <input
              type="text"
              id="code"
              class="form-control"
              v-model="code"
              required
            />
          </div>
          <div class="form-group">
            <label for="description" class="form-control-label">Description</label>
            <input
              type="text"
              id="description"
              class="form-control"
              v-model="description"
              required
            />
          </div>
          <!-- <div class="form-group">
            <label class="form-control-label">Status</label>
            <div>
              <label>
                <input type="radio" v-model="status" value="completed" required />
                Completed
              </label>
            </div>
            <div>
              <label>
                <input type="radio" v-model="status" value="incomplete" required />
                Incomplete
              </label>
            </div>
          </div> -->
          <div class="text-center">
            <button type="submit" class="btn btn-primary">Edit AGV</button>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  // import module AGV service yang berisi API CRUD untuk AGV
  import AGVService from "@/services/agv.service";
  export default {
    // membuat function data untuk manipulasi data dalam komponen
    data() {
      return {
        code: "",
        description: "",
      };
    },
    async mounted() {
      // mengambil data berdasarkan parameter route
      const agvId = this.$route.params.id;
      try {
        const agv = await AGVService.getAGVById(agvId);
        // Mengisi form field dengan data yang diambil
        this.title = agv.title;
        this.description = agv.description;
        this.status = agv.status ? "completed" : "incomplete";
      } catch (error) {
        console.error("Error fetching AGV:", error.message);
      }
    },
    methods: {
      async editAGV() {
        // mendapat id dari parameter route
        const agvId = this.$route.params.id;
        try {
          let updatedAGV = {
            title: this.title,
            description: this.description,
            status: this.status === "completed" ? true : false,
          };
          // Memanggil method editAGV dari AGVService
          const editedAGV = await AGVService.editAGV(agvId, updatedAGV);
          console.log("AGV updated:", editedAGV);
          // Reset form
          this.resetForm();
          // Redirect ke halaman AGV jika berhasil
          this.$router.push("/agv");
        } catch (error) {
          console.error("Error editing AGV:", error.message);
          // mengahndle error
        }
      },
      resetForm() {
        // mengapus field form
        this.title = "";
        this.description = "";
        this.status = "";
      },
    },
  };
  </script>