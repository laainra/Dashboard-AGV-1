<template>
  <div class="card mb-4">
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center justify-content-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">No</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">ID</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Code</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Description</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7">Actions</th> 
            </tr>
          </thead>
          <tbody>
            <tr v-for="(agv, index) in getAGVs" :key="agv._id">
              <td>{{ index + 1 }}</td>
              <td>{{ agv._id }}</td>
              <td class="text-sm">{{ agv.code }}</td>
              <td class="text-sm">{{ agv.description }}</td>
              <td class="text-center">
                <button class="btn btn-link text-secondary mb-0" @click="editAgv(agv._id)">Edit</button>
                <button class="btn btn-link text-danger mb-0" @click="deleteAgv(agv._id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import useAgvStore from "@/store/agv"; // import the store
import { mapActions } from "pinia";
// Import AgvService if you're using it in deleteAgv method
// import AgvService from "@/services/AgvService";

export default {
  // props: {
  //   data: {
  //     type: Array,
  //     default: () => [],
  //   },
  // },
  // data() {
  //   return {
  //     agvs: [],
  //   };
  // },

  methods: {
    ...mapActions(useAgvStore, ["g$getAGVs", "g$deleteAGV", "g$editAGV"]),

    // async fetchAgvs() {
    //   try {
    //     const agvs = await this.g$getAGVs();
    //     this.agvs = agvs;
    //   } catch (error) {
    //     console.error("Error fetching agvs:", error.message);
    //   }
    // },

    async editAgv(id) {
      try {
        this.$router.push({ name: 'Edit Agv', params: { id } });
      } catch (error) {
        console.error("Error editing agv:", error.message);
      }
    },

    async deleteAgv(id) {
      try {
        await this.g$deleteAGV(id);
        console.error("Delete $AGV CODE Success");
   
      } catch (error) {
        console.error("Error deleting agv:", error.message);
      }
    },

    getStatusClass(status) {
      return status ? "badge badge-sm bg-gradient-success" : "badge badge-sm bg-gradient-primary";
    },

    getAgvStatus(status) {
      return status ? "Completed" : "Incomplete";
    },
  },
  computed: {
    getAGVs(){
      return useAgvStore().getAGVs;
    },
    agvs(){
      return useAgvStore().agvs;
    }
  },
  mounted() {
    useAgvStore().g$getAGVs();
  }
};
</script>
