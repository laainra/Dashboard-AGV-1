import { defineStore } from "pinia";
import HistoryTasksService from "../services/historytask.service";


const useHistory = defineStore({
  id: "history",
  state: () => ({
    historyLineTasks: [],
    historyLidarTasks: [],
  }),
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
  },
  
  getters: {
    showHistoryLineTasks: (state) => state.historyLineTasks,
    showHistoryLidarTasks: (state) => state.historyLidarTasks,
  },
});

export default useHistory;
