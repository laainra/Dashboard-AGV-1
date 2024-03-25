<!-- Membuat halaman utama AGV list yang akan menampilkan form dan table -->
<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h2>AGV List</h2>
        <div class="col-12">
          <h3>Add New AGV</h3>
        </div>
      </div>
      <AddAGVForm  />
      <AGVTable />
    </div>
  </div>
</template>

<script>
import AGVTable from "../AGV/components/AGVTable.vue";
import AddAGVForm from "./components/AddAGVForm.vue";
import AGVService from "@/services/agv.service"; // Assuming you have a service for AGV

export default {
  name: "AGV",
  components: {
    AGVTable,
    AddAGVForm,
    AGVService
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