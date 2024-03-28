<!-- Membuat halaman utama AGV list yang akan menampilkan form dan table -->
<template>
  <div class="container-fluid">
    <div class="row">
      <div class="text-center">
        <h2 class="text-white p-3">Data Station AGV Line Follower</h2>
      </div>
      <AddAGVForm />
      
    </div>
  </div>
</template>

<script>
import AGVTable from "../agv-lidar/components/AGVTable.vue";
import AddAGVForm from "./components/AddAGVForm.vue";
import AGVService from "@/services/agv.service"; // Assuming you have a service for AGV

export default {
  name: "AGV",
  components: {
    AGVTable,
    AddAGVForm,
    AGVService,
  },
  data() {
    return {
      title: "",
      description: "",
      status: "", // Default status to empty string
    };
  },
};
</script>
