import { defineStore } from "pinia";
import AGVService from "../services/agv.service";

const useDropDownStore = defineStore({
  id: "dropdown",
  state: () => ({
    dataAGV: [],
  }),
  getters: {
    g$ddListAGV: (state) =>
      state.dataAGV.map(({ _id, code, ip }) => ({
        id: _id,
        name: code,
        ip: ip,
      })),
  },
  actions: {
    async a$ddDataAGV() {
      try {
        const agvs = await AGVService.getAGVs();
        this.dataAGV = agvs.data;
        console.log(this.dataAGV);
      } catch (error) {
        console.error("Error fetching AGV list:", error.message);
        throw error;
      }
    },
  },
});

export default useDropDownStore;
