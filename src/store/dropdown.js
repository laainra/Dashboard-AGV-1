import { defineStore } from "pinia";
import AGVService from "../services/agv.service";

const u$dropdown = defineStore({
  id: "dropdown",
  state: () => ({
    dataAGV: [],
  }),
  actions: {
    // data AGV
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
  getters: {
    g$ddListAGV: (state) =>
      state.dataAGV.map(({ _id, code, ip }) => ({
        id: _id,
        name: code,
        ip: ip,
      })),
  },
});

export default u$dropdown;
