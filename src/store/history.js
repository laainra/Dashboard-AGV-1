import { defineStore } from "pinia";
import HistoryTasksService from "../services/historytask.service";

const useHistoryStore = defineStore({
  id: "history",
  state: () => ({
    historyLineTasks: [],
    historyLidarTasks: [],
  }),

  getters: {
    g$showHistoryLineTasks: (state) => state.historyLineTasks,
    g$showHistoryLidarTasks: (state) => state.historyLidarTasks,
  },

  actions: {
    async a$historyLineTasksData(type) {
      try {
        const tasks = await HistoryTasksService.HistoryTasksLine(type);
        this.historyLineTasks = tasks.data;
        console.log(this.historyLineTasks, "awdaw");
      } catch (error) {
        console.error("Error checking the history line tasks:", error.message);
        throw error;
      }
    },

    async a$historyLidarTasksData() {
      try {
        const tasks = await HistoryTasksService.HistoryTasksLidar();
        this.historyLidarTasks = tasks.data;
        console.log(this.historyLidarTasks);
      } catch (error) {
        console.error("Error checking the history lidar tasks:", error.message);
        throw error;
      }
    },

    async a$deleteHistoryTask(id) {
      try {
        await HistoryTasksService.deleteHistoryTask(id);
        console.log(`tidak terhapus ${id} `)
      } catch (error) {
        console.error(`Error deleting AGV with ID ${id}:`, error.message);
        throw error;
      }
    }
    
  },
});

export default useHistoryStore;