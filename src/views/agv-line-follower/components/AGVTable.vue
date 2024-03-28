<!-- Membuat komponen table untuk menampilkan agv dari database -->
<template>
  <table>
    <thead>
      <tr>
        <th
          class="text-uppercase text-sm font-weight-bolder"
        >
          No
        </th>
        <th
          class="text-uppercase text-sm font-weight-bolder"
        >
          Code
        </th>
        <th
          class="text-uppercase text-sm font-weight-bolder"
        >
          Description
        </th>
        <!-- <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Status
              </th>-->
        <th
          class="text-uppercase text-sm font-weight-bolder text-center ps-2"
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
</template>

<script>
import useAgvStore from "@/store/agv"; // import module agv service yang berisi method API CRUD untuk Agv
import { mapActions } from "pinia";

export default {
  // inisiasi data agvs denga array kosong
  data() {
    return {
      // Menghapus deklarasi agvs di sini, karena data akan diambil dari store
    };
  },
  computed: {
    agvs() {
      return useAgvStore().agvs; // Mengambil data agvs dari store
    },
  },
  methods: {
    ...mapActions(useAgvStore, ["g$getAGVs", "g$addAGV"]), // Menambahkan method addAGV dari store
    async addAgv() {
      try {
        // Lakukan operasi penambahan AGV
        await useAgvStore().g$addAGV({
          code: this.code,
          description: this.description,
        });
        // Setelah penambahan berhasil, ambil kembali data AGVs dari store
        await useAgvStore().g$getAGVs();
        // Reset form atau lakukan tindakan lain yang diperlukan
        this.resetForm();
      } catch (error) {
        console.error("Error adding AGV:", error.message);
      }
    },
    // Metode lainnya ...
  },
  created() {
    // Ambil data AGV saat komponen dibuat
    useAgvStore().g$getAGVs();
  },
};
</script>
