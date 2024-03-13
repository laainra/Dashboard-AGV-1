import { defineStore } from "pinia";
import AuthService from "../services/auth.service"; // Import class AuthService dari service auth
import Cookies from 'js-cookie';

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    status: { loggedIn: false },
  }),
  actions: {
    async a$login(body) {
      try {
        const { data } = await AuthService.login(body); // Panggil metode login dari AuthService
        // Simpan token ke dalam cookie
        Cookies.set('jwt-token', data.accessToken, { expires: new Date(data.expiresAt) });
        // Setelah menyimpan token, Anda dapat melakukan hal lain yang diperlukan, seperti menetapkan status login ke true, dst.

        return true;
      } catch (error) {
        this.status.loggedIn = false;
        throw error;
      }
    },
    async a$register(user) {
      try {
        await AuthService.register(user); // Panggil metode register dari AuthService
        return "Registration successful";
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
