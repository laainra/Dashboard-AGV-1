import { defineStore } from "pinia";
import AGVService from "../services/agv.service";

const useAgvStore = defineStore({
  id: "agv",
  state: () => ({
    agvs: [],
  }),
  getters: {
    getAGVs(state) {
      return state.agvs;
    },
    getDetail: ({ agvs }) => {
      return (index) => agvs[index];
    },
  },
  actions: {
    async g$addAGV(agvData) {
      try {
        await AGVService.addAGV(agvData);
        await this.g$getAGVs();
      } catch (error) {
        console.error("Error adding AGV:", error.message);
        throw error;
      }
    },

    async g$getAGVs() {
      try {
        const agvs = await AGVService.getAGVs();
        this.agvs = agvs.data;
      } catch (error) {
        console.error("Error fetching AGV list:", error.message);
        throw error;
      }
    },

    async g$editAGV({ id, updatedAGVData }) {
      try {
        //const updatedAgv = await AGVService.editAGV(id, updatedAGVData);
        await AGVService.updateAGV(id, updatedAGVData);
        // await this.g$getAGVs();
        const index = this.agvs.findIndex((agv) => agv._id === id);
        if (index !== -1) {
          this.agvs[index] = updatedAGVData;
        }
        // const index = this.agvs.findIndex(agv => agv._id === id);
        // if (index !== -1) {
        //   Object.assign(this.agvs[index], updatedAGVData);
        //   // Set isEditing to false
        //   this.agvs[index].isEditing = false;
        // }
      } catch (error) {
        console.error("Error editing AGV:", error.message);
        throw error;
      }
    },

    async g$deleteAGV(id) {
      try {
        await AGVService.deleteAGV(id);
        const index = this.agvs.findIndex((agv) => agv._id === id);
        if (index !== -1) {
          this.agvs.splice(index, 1); // Menghapus elemen dari array dengan mempertahankan urutan
        }
        console.log(`AGV with ID ${id} deleted.`);
      } catch (error) {
        console.error(`Error deleting AGV with ID ${id}:`, error.message);
        throw error;
      }
    },

    async g$getAGVById(id) {
      try {
        return await AGVService.getAGVById(id);
      } catch (error) {
        console.error("Error getting AGV by id:", error.message);
        throw error;
      }
    },
  },
});

export default useAgvStore;
