import { defineStore } from 'pinia';

const useDashboardStore = defineStore({
  id: 'dashboard',
  state: () => ({
    selectedDashboard: 'DashboardAgvLineFollower',
  }),
  actions: {
    setSelectedDashboard(state, dashboard) {
        state.selectedDashboard = dashboard;
    },
  },
});

export default useDashboardStore;