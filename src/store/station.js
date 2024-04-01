import { defineStore } from "pinia";
import stationService from "../services/station.service";

const useStationStore = defineStore({
  id: "station",
  state: () => ({
    stations: [],
  }),
  getters: {
    getStations(state) {
      return state.stations;
    },
    getDetail: ({ stations }) => {
      return (index) => stations[index];
    },
  },
  actions: {
    async g$addStation(stationData) {
      try {
        await stationService.addStation(stationData);
        await this.g$getStations();
      } catch (error) {
        console.error("Error adding station:", error.message);
        throw error;
      }
    },

    async g$getStations() {
      try {
        const stations = await stationService.getStations();
        this.stations = stations.data;
      } catch (error) {
        console.error("Error fetching station list:", error.message);
        throw error;
      }
    },

    async g$editStation({ id, updatedStationData }) {
      try {
        //const updatedstation = await stationService.editstation(id, updatedstationData);
        await stationService.updateStation(id, updatedStationData);
        // await this.g$getstations();
        const index = this.stations.findIndex((station) => station._id === id);
        if (index !== -1) {
          this.stations[index] = updatedStationData;
        }
        // const index = this.stations.findIndex(station => station._id === id);
        // if (index !== -1) {
        //   Object.assign(this.stations[index], updatedstationData);
        //   // Set isEditing to false
        //   this.stations[index].isEditing = false;
        // }
      } catch (error) {
        console.error("Error editing station:", error.message);
        throw error;
      }
    },

    async g$deleteStation(id) {
      try {
        await stationService.deleteStation(id);
        const index = this.stations.findIndex((station) => station._id === id);
        if (index !== -1) {
          this.stations.splice(index, 1); // Menghapus elemen dari array dengan mempertahankan urutan
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
