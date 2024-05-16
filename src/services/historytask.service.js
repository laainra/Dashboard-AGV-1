import axios from "axios"; 

const API_URL = "https://sans-agv.azurewebsites.net/api";

class HistoryTasksService {
  constructor() {
    this.init();
  }

  init() {
    // interceptor request
    axios.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // interceptor response
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  async deleteHistoryTask(id) {
    console.log("Memanggil API untuk menghapus ID:", id);  // Tambahkan ini untuk debugging
    return axios
      .delete(API_URL + "/task/" + id)
      .then((response) => {
        console.log("Delete History Task:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Delete History Error:", error);
        throw error;
      });
  }
  
  async HistoryTasksLine(type) {
    return axios
      .post(API_URL + "/task/line", {
        start_date: type.start_date,
        end_date: type.end_date,
      })
      .then((response) => {
        console.log("History Line Tasks Response:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("History Line Tasks Error:", error);
        throw error;
      });
  }

  async HistoryTasksLidar(type) {
    return axios
      .post(API_URL + "/task/lidar", {
        start_date: type.start_date,
        end_date: type.end_date,
      })
      .then((response) => {
        console.log("History Lidar Tasks Response:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("History Lidar Tasks Error:", error);
        throw error;
      });
  }
}

export default new HistoryTasksService();
