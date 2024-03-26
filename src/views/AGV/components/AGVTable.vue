<!-- Membuat komponen table untuk menampilkan agv dari database -->
<template>
  <div class="card mb-4">
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center justify-content-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                No
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Code
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Description
              </th>
              <!-- <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Status
              </th>-->
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2"
              >
                Actions
              </th> 
            </tr>
          </thead>
          <tbody>
            <!-- Membuat looping untuk menampilkan data perbaris -->
            <tr v-for="(agv, index) in agvs" :key="agv.id">
              <td>{{ index + 1 }}</td>
              <td class="text-sm">{{ agv.code }}</td>
              <td class="text-sm">{{ agv.description }}</td>
              <!-- <td class="text-sm">
                <span :class="getStatusClass(agv.status)">{{
                  getAgvStatus(agv.status)
                }}</span>
              </td> -->
              <td class="text-center">
                <!-- button edit -->
                <button
                  class="btn btn-link text-secondary mb-0"
                  @click="editAgv(agv.id)"
                >
                  Edit
                </button>
                 <!-- button hapus -->
                <button
                  class="btn btn-link text-danger mb-0"
                  @click="deleteAgv(agv.id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import useAgvStore from "@/store/agv"; // import module agv service yang berisi method API CRUD untuk Agv
import { mapActions } from "pinia";

export default {
  // inisiasi data agvs denga array kosong
  data() {
    return {
      agvs: [],
    };
  },
  created() {
    this.fetchAgvs();
  },
  methods: {
    // membuat method untuk mengambil semua data agv dari database

    ...mapActions(useAgvStore, ["g$getAGVs"]),
    async fetchAgvs() {
      try {
        // Memanggil method readAgv  dari AgvService 
        const agvs = await useAgvStore.g$getAGVs;
        // mengupdate data agv dengan data yang di fetch 
        this.agvs = agvs;
      } catch (error) {
        console.error("Error fetching agvs:", error.message);
      }
    },
    // Method untuk edirect ke halaman edit agv dengan membawa id sbg parameter
    async editAgv(id) {
      try {
        
        this.$router.push({ name: 'Edit Agv', params: { id } });
      } catch (error) {
        console.error("Error editing agv:", error.message);
      }
    },
    // method untuk menghapus agv
    async deleteAgv(id) {
      try {
        // memanggil method deleteAgv method dari AgvService 
        await AgvService.deleteAgv(id);
        console.error("Delete Success");
        // Refresh list setelah sukses mengahpus
        this.fetchAgvs();
      } catch (error) {
        console.error("Error deleting agv:", error.message);
      }
    },
    getStatusClass(status) {
      return status
        ? "badge badge-sm bg-gradient-success"
        : "badge badge-sm bg-gradient-primary";
    },
    getAgvStatus(status) {
      return status ? "Completed" : "Incomplete";
    },
  },
};
</script>