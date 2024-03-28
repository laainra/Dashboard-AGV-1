<!-- Membuat halaman utama AGV list yang akan menampilkan form dan table -->
<template>
  <div class="container-fluid">
    <div class="row">
      <div class="text-center">
        <h2 class="text-white p-3">Data Station AGV Lidar</h2>
      </div>
      <AddAGVForm />
      <AGVTable />
    </div>
  </div>
</template>

<script>
import AGVTable from "../agv-lidar/components/AGVTable.vue";
import AddAGVForm from "./components/AddAGVForm.vue";
import AGVService from "@/services/agv.service"; // Assuming you have a service for AGV
import useAgvStore from "@/store/agv"; // import the store
//import { mapState } from "pinia";

export default {
  name: "AGV",
  components: {
    AGVTable,
    AddAGVForm,
    AGVService,
  },
  data() {
    return {
      code: "",
      description: "",
      //status: "", // Default status to empty string
    };
  },
  // computed: {
  //   ...mapState(useAgvStore, [g$getAGVs])
  // }, 
  // async mounted(){
    
  // }
};
</script>
