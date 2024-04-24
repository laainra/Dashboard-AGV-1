import axios from "axios"; // import axios untuk membuat request HTTP

const API_URL = "https://sans-api-service.onrender.com/api"; // dekalarasi variabel API URL untuk api agv

class AGVService {
  constructor() {
    this.init();
  }

  init() {
    // interceptor request
    axios.interceptors.request.use(
      (config) => {
        config.headers['Access-Control-Allow-Origin'] = '*';
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
  // membuat method untuk membuat request api post untuk menambahkan agv ke database

  async addAGV(agv) {
    return axios
      .post(API_URL + "/agv", {
        code: agv.code,
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
  //   // membuat method untuk membuat request api get untuk membaca semua data agv dari database
  //   async readAGV() {
  //     try {
  //       const response = await axios.get(API_URL);
  //       console.log('AGV list retrieved:', response.data);
  //       return response.data;
  //     } catch (error) {
  //       console.error('Error reading AGV list:', error.message);
  //       throw error;
  //     }
  //   }
  //   // membuat method untuk membuat request api put untuk mengedit data agv dari database berdasarkan id
  //   async editAGV(id, updatedAGVData) {
  //     try {
  //       const response = await axios.put(`${API_URL}${id}`, updatedAGVData);
  //       console.log('AGV edited:', response.data);
  //       return response.data;
  //     } catch (error) {
  //       console.error('Error editing AGV:', error.message);
  //       throw error;
  //     }
  //   }
  //   // membuat method untuk membuat request api delete untuk menghapus data agv dari database
    // async deleteAGV(id) {
    //   try {
    //     const response = await axios.delete(`${API_URL}${id}`);
    //     console.log('AGV deleted:', response.data);
    //     return response.data;
    //   } catch (error) {
    //     console.error('Error deleting AGV:', error.message);
    //     throw error;
    //   }
    // }
  //   // membuat method untuk membuat request api get untuk membaca data agv dari database berdasarkan id
  //   async getAGVById(id) {
  //     try {
  //       const response = await axios.get(`${API_URL}${id}`);
  //       console.log('AGV:', response.data);
  //       return response.data;
  //     } catch (error) {
  //       console.error('Error getting AGV by id:', error.message);
  //       throw error;
  //     }
  //   }
  // }

  // async getAGVById(id) {
  //   return axios
  //     .get(API_URL + "/agv/" + id)
  //     .then((response) => {
  //       console.log("Get AGV by ID Response:", response.data);
  //       return response.data;
  //     })
  //     .catch((error) => {
  //       console.error("Get AGV by ID Error:", error);
  //       throw error;
  //     });
  // }
  async getAGVs() {
    try {
      const response = await axios.get(API_URL + "/agv");
      console.log("Read AGV Response:", response.data);
      return response.data; // Mengembalikan array data langsung
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
