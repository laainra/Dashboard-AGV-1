// import { defineStore } from "pinia";
// import AuthService from '../services/auth.service';

// export const useAuthStore = defineStore({
//   id: "auth",
//   state: () => ({
//     status: { loggedIn: false },
//     user: null
//   }),
//   actions: {
//     async login(user) {
//       try {
//         const loggedInUser = await AuthService.login(user);
//         this.status.loggedIn = true;
//         this.user = loggedInUser;
//         return loggedInUser;
//       } catch (error) {
//         this.status.loggedIn = false;
//         this.user = null;
//         throw error;
//       }
//     },
//     logout() {
//       AuthService.logout();
//       this.status.loggedIn = false;
//       this.user = null;
//     },
//     async register(user) {
//       try {
//         await AuthService.register(user);
//         return "Registration successful";
//       } catch (error) {
//         throw error;
//       }
//     }
//   }
// });
