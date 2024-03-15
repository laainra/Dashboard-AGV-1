import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://tidy-terribly-boa.ngrok-free.app/api/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "user");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  
  editProfile(user) {
    return axios
      .post(API_URL + 'user', {
        name: user.name,
        username: user.username,
        password: user.password
      })
      .then(response => {
        console.log('Edit Profile Response:', response.data); 
        return response.data;
      })
      .catch(error => {
        console.error('Edit Profile Error:', error); 
        throw error;
      });
  }
  
  // getAdminBoard() {
  //   return axios.get(API_URL + "admin", { headers: authHeader() });
  // }
}

export default new UserService();
