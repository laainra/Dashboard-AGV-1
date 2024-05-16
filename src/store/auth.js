import { defineStore } from "pinia";
import AuthService from "../services/auth.service";
import Cookies from "js-cookie";

const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    status: { loggedIn: false },
  }),

  getters: {
    g$user: ({ id, username }) => ({ id, username }),
    isLoggedIn: ({ id }) => !!id,
  },

  actions: {
    async a$login(body) {
      try {
        const data = await AuthService.login(body);
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
});

export default useAuthStore;
