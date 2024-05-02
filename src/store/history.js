import { defineStore } from "pinia";
import HistoryLineTaskData from "../views/components/HistoryLineTaskData.vue";
import historytaskService from "../services/historytask.service";


const a$history = defineStore({
  id: "history",
  state: () => ({
    historyTasks: [],
  }),
  actions: {
    async a$historyLineTasksData() {
      try {
        const tasks = await historytaskService.HistoryTasksLine();
        this.historyTasks = tasks.data;
        console.log(this.historyTasks);
      } catch (error) {
        console.error("Error checking the history line tasks:", error.message);
        throw error;
      }
    },

    async a$historyLidarTasksData() {
        try {
          const tasks = await historytaskService.HistoryTasksLidar();
          this.historyTasks = tasks.data;
          console.log(this.historyTasks);
        } catch (error) {
          console.error("Error checking the history lidar tasks:", error.message);
          throw error;
        }
      },
  },
  getters: {
    
  },
});

export default a$history;
