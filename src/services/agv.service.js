import axios from "axios";

const API_URL = "https://sans-agv.azurewebsites.net/api";

class AGVService {
  constructor() {
    this.init();
  }

  init() {
    // interceptor request
    axios.interceptors.request.use(
      (config) => {
        config.headers["Access-Control-Allow-Origin"] = "*";
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

  async addAGV(agv) {
    return axios
      .post(API_URL + "/agv", {
        code: agv.code,
        type: agv.type,
        description: agv.description,
        ip: agv.ip,
      })
      .then((response) => {
        console.log("Add AGV Response:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Add AGV Error:", error);
        throw error;
      });
  }

  async getAGVs() {
    try {
      const response = await axios.get(API_URL + "/agv");
      console.log("Read AGV Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Read AGV Error:", error);
      throw error;
    }
  }

  async updateAGV(id, updatedAGVData) {
    return axios
      .put(API_URL + "/agv/" + id, updatedAGVData)
      .then((response) => {
        console.log("Update AGV Response:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Update AGV Error:", error);
        throw error;
      });
  }

  async deleteAGV(id) {
    return axios
      .delete(API_URL + "/agv/" + id)
      .then((response) => {
        console.log("Delete AGV Response:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Delete AGV Error:", error);
        throw error;
      });
  }
}

export default new AGVService();