import { defineStore } from 'pinia';
import AGVService from '../services/agv.service';

export const useAgvStore = defineStore({
  id: 'agv',
  state: () => ({
    agvs: [],
  }),
  actions: {
    async createAGV(agvData) {
      try {
        const newAgv = await AGVService.createAGV(agvData);
        this.agvs.push(newAgv);
      } catch (error) {
        console.error('Error creating AGV:', error.message);
        throw error;
      }
    },
    async readAGV() {
      try {
        const agvs = await AGVService.readAGV();
        this.agvs = agvs.data; // Assuming the response contains a 'data' field with the AGV array
      } catch (error) {
        console.error('Error fetching AGV list:', error.message);
        throw error;
      }
    },
    async editAGV({ id, updatedAGVData }) {
      try {
        //const updatedAgv = await AGVService.editAGV(id, updatedAGVData);
        await AGVService.editAGV(id, updatedAGVData);
        const index = this.agvs.findIndex(agv => agv.id === id);
        if (index !== -1) {
          //this.agvs[index] = updatedAgv;
          this.agvs[index] = updatedAgvData;
        }
      } catch (error) {
        console.error('Error editing AGV:', error.message);
        throw error;
      }
    },
    async deleteAGV(id) {
      try {
        await AGVService.deleteAGV(id);
        this.agvs = this.agvs.filter(agv => agv.id !== id);
      } catch (error) {
        console.error('Error deleting AGV:', error.message);
        throw error;
      }
    },
    async getAGVById(id) {
      try {
        return await AGVService.getAGVById(id);
      } catch (error) {
        console.error('Error getting AGV by id:', error.message);
        throw error;
      }
    },
  },
});