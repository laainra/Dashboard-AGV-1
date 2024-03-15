// Membuat service yang berisi method untuk authentication
import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'https://tidy-terribly-boa.ngrok-free.app';

class AuthService {
  constructor() {
    this.init();
  }

  init() {
    axios.interceptors.request.use(
      config => {
        const token = Cookies.get('jwt-token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (error.response && error.response.status === 401) {
          this.logout();
        }
        return Promise.reject(error);
      }
    );
  }

  login(user) {
    return axios
      .post(API_URL + '/api/auth/signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          Cookies.set('user', response.data);
          Cookies.set('username', response.data.username);
          Cookies.set('name', response.data.name);
          Cookies.set('jwt-token', response.data.accessToken);
        }
        console.log('Login Response:', response.data); 
        return response.data;
      })
      .catch(error => {
        console.error('Login Error:', error); 
        throw error;
      });
  }

  logout() {
    Cookies.remove('user');
    Cookies.remove('username');
    Cookies.remove('name');
    Cookies.remove('jwt-token');
  }

  register(user) {
    return axios
      .post(API_URL + '/api/auth/signup', {
        name: user.name,
        username: user.username,
        password: user.password
      })
      .then(response => {
        console.log('Registration Response:', response.data); 
        return response.data;
      })
      .catch(error => {
        console.error('Registration Error:', error); 
        throw error;
      });
  }
}

export default new AuthService();