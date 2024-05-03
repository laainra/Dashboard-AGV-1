import { defineStore } from "pinia";
import HistoryTasksService from "../services/historytask.service";


const a$history = defineStore({
  id: "history",
  state: () => ({
    historyLineTasks: [],
    historyLidarTasks: [],
  }),
  actions: {
    async a$historyLineTasksData() {
      try {
        const tasks = await HistoryTasksService.HistoryTasksLine();
        this.historyLineTasks = tasks.data;
        console.log(this.historyLineTasks);
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
  // getters: {
  //   showHistoryLineTasks: (state) => state.historyLineTasks,
  //   showHistoryLidarTasks: (state) => state.historyLidarTasks,
  // },
});

export default a$history;
