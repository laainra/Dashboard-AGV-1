import axios from 'axios'; // import axios untuk membuat request HTTP

const API_URL = 'https://sans-api-service.onrender.com/api'; // dekalarasi variabel API URL untuk api agv

class StationService {
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
  // membuat method untuk membuat request api post untuk menambahkan agv ke database
  
  async addStation(station) {
    return axios
    .post(API_URL + "/station", {
      code: station.code,
      status: station.status,
    })
    .then((response) => {
      console.log("Add Station Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Add Station Error:", error);
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
//   async deleteAGV(id) {
//     try {
//       const response = await axios.delete(`${API_URL}${id}`);
//       console.log('AGV deleted:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error deleting AGV:', error.message);
//       throw error;
//     }
//   }
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

async getStationById(id) {
  return axios
    .get(API_URL + "/station/" + id)
    .then((response) => {
      console.log("Get Station by ID Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Get Station by ID Error:", error);
      throw error;
    });
}
async getStations() {
  return axios
    .get(API_URL + "/station")
    .then((response) => {
      console.log("Read Station Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Read Station Error:", error);
      throw error;
    });
}

async updateStation(id, updatedStation) {
  return axios
    .put(API_URL + "/station/" + id, updatedStation)
    .then((response) => {
      console.log("Update Station Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Update Station Error:", error);
      throw error;
    });
}

async deleteStation(id) {
  return axios
    .delete(API_URL + "/station/" + id)
    .then((response) => {
      console.log("Delete Station Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Delete Station Error:", error);
      throw error;
    });
}
}

export default new StationService();