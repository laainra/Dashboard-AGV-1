import { defineStore } from "pinia";
import stationService from "../services/station.service";

const useStationStore = defineStore({
  id: "station",
  state: () => ({
    stations: [],
  }),
  getters: {
    g$getStations(state) {
      return state.stations;
    },
    g$getDetail: ({ stations }) => {
      return (index) => stations[index];
    },
  },
  actions: {
    async a$addStation(stationData) {
      try {
        await stationService.addStation(stationData);
      } catch (error) {
        console.error("Error adding station:", error.message);
        throw error;
      }
    },

    async a$getStations() {
      try {
        const stations = await stationService.getStations();
        this.stations = stations.data;
      } catch (error) {
        console.error("Error fetching station list:", error.message);
        throw error;
      }
    },

    async a$editStation({ id, updatedStationData }) {
      try {
        await stationService.updateStation(id, updatedStationData);
        const index = this.stations.findIndex((station) => station._id === id);
        if (index !== -1) {
          this.stations[index] = updatedStationData;
        }
      } catch (error) {
        console.error("Error editing station:", error.message);
        throw error;
      }
    },

    async a$deleteStation(id) {
      try {
        await stationService.deleteStation(id);
        const index = this.stations.findIndex((station) => station._id === id);
        if (index !== -1) {
          this.stations.splice(index, 1);
        }
        console.log(`station with ID ${id} deleted.`);
      } catch (error) {
        console.error(`Error deleting station with ID ${id}:`, error.message);
        throw error;
      }
    },

    async g$getStationById(id) {
      try {
        return await stationService.getStationById(id);
      } catch (error) {
        console.error("Error getting station by id:", error.message);
        throw error;
      }
    },
  },
});

export default useStationStore;