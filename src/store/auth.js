import { defineStore } from "pinia"; // tambahkan mapActions
import AuthService from "../services/auth.service"; // Import class AuthService dari service auth
import Cookies from "js-cookie";

const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    status: { loggedIn: false },
  }),
  actions: {
    // gunakan mapActions untuk mengakses a$login
    async a$login(body) {
      try {
        // panggil metode login dari AuthService
        // simpan langsung ke dalam data
        const data = await AuthService.login(body); 
        // Simpan token ke dalam cookie
        console.log(data);
        Cookies.set("jwt-token", data.accessToken, {
          expires: new Date(data.expiresAt),
        });
        return true;
      } catch (error) {
        this.status.loggedIn = false;
        throw error;
      }
    },
    async a$register(user) {
      try {
        // Panggil metode register dari AuthService
        await AuthService.register(user); 
        return "Registration successful";
      } catch (error) {
        throw error;
      }
    },

    async a$updateProfile(user) {
      try {
        const data = await AuthService.updateProfile(user); 
        console.log(data);
        return "Update profile successful";
      } catch (error) {
        throw error;
      }
    },
  },
  getters: {
    g$user: ({ id, username }) => ({ id, username }),
    // determine if user is logged in
    isLoggedIn: ({ id }) => !!id,
  },
});

export default useAuthStore;
