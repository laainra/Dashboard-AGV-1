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
              <!-- <td class="text-sm">{{ agv.code }}</td> -->
              <td class="text-sm">
                <template v-if="!agv.isEditing">{{ agv.code }}</template>
                <input v-model="agv.newCode" v-else>
              </td>
              <td class="text-sm">
                <template v-if="!agv.isEditing">{{ agv.description }}</template>
                <input v-model="agv.newDescription" v-else>
              </td>
              <td class="text-center">
                <template v-if="!agv.isEditing">
                  <button class="btn btn-link text-secondary mb-0" @click="editAgv(agv)">Edit</button>
                </template>
                <template v-else>
                  <button class="btn btn-link text-secondary mb-0" @click="saveAgv(agv)">Save</button>
                  <button class="btn btn-link text-secondary mb-0" @click="cancelEdit(agv)">Cancel</button>
                </template>
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
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();

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
    async editAgv(agv) {
      agv.isEditing = true;
      agv.newCode = agv.code;
      agv.newDescription = agv.description;

      console.log("Editing AGV:", agv);

      // Verify that isEditing property is set to true
      console.log("After editing, AGV:", agv);

      // Ensure that the state is updated properly
      console.log("Before setting state, AGVs:", useAgvStore().getAGVs);

      // Update state with modified AGV
      // useAgvStore().getAGVs = useAgvStore().g$getAGVs.map(item => {
      //   if (item._id === agv._id) {
      //     return { ...item, isEditing: true };
      //   } else {
      //     return item;
      //   }
      // });

      // Verify that the state is updated properly
      console.log("After setting state, AGVs:", useAgvStore().getAGVs);
},

    async saveAgv(agv) {
      try {
        await this.g$editAGV(agv._id, {
          code: agv.newCode,
          description: agv.newDescription
        });
        agv.isEditing = false;
        $toast.success("AGV edited successfully", { duration: 10000 });
      } catch (error) {
        console.error("Error editing agv:", error.message);
      }
    },

    cancelEdit(agv) {
      agv.isEditing = false;
    },

    async deleteAgv(id) {
      try {
        const agvToDelete = this.agvs.find(agv => agv._id === id);
        if (!agvToDelete) {
          throw new Error(`AGV with ID ${id} not found.`);
        }
        const agvCode = agvToDelete.code;
        await this.g$deleteAGV(id);
        console.log(`AGV with Code ${agvCode} deleted.`);
        $toast.success(`Delete AGV with Code ${agvCode} successfully`, { duration: 10000 });
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
