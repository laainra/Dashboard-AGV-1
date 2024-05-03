import axios from 'axios'; // import axios untuk membuat request HTTP

const API_URL = 'https://sans-api-service.onrender.com/api/task'; // dekalarasi variabel API URL untuk api agv

class HistoryTasksService {
  constructor() {
    this.init();
  }

  init() {
    // interceptor request
    axios.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    // interceptor response
    axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }

  async HistoryTasksLine(type) {
    return axios
    .post(API_URL + "/line", {
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
    .post(API_URL + "/lidar", {
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