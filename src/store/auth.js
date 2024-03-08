import { defineStore } from "pinia";
import * as s$auth from "@/services/auth";
import { login } from "@/services/auth";
import { setCk, delCk, certDetail } from "@/utils/cookies";

import d from "dayjs";

const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    id: undefined,
    name: undefined,
    username: undefined,
  }),
  getters: {
    userInfo: (state) => ({
      id: state.id,
      name: state.name,
      username: state.username,
    }),
    isLoggedIn: (state) => !!state.id,
  },
  actions: {
    async a$login(payload) {
      try {
        const { data } = await login(payload);
        setCk("CERT", data.token, { datetime: d(data.expiresAt) });
        this.a$setUserInfo();

        if (this.userInfo.role == "superadmin") {
          return "Login Superadmin Berhasil!";
        }

        return "Login Berhasil!";
      } catch ({ error, message }) {
        throw (error || message) ?? "Login Gagal!";
      }
    },
  },
});

export default useAuthStore;