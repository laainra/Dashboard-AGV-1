<template>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2>Add New AGV</h2>
        </div>
        <!-- <AddAGVForm /> -->
      </div>
    </div>
  </template>
  
  <script>
  import AGVTable from "../agv-lidar/components/AGVTable.vue";
  import AddAGVForm from "../agv-lidar/components/AddAGVForm.vue";
  export default {
    name: "Add New AGV",
    components: {
      AGVTable,
      AddAGVForm,
    },
    methods: {
      addAGV(newAGV) {
        this.agvs.push(newAGV);
        this.showModal = false;
      },
    },
    data() {
      return {
        salary: {
          classIcon: "text-white fas fa-landmark",
          title: "Salary",
          desc: "Belong Interactive",
          price: "+$2000",
        },
        paypal: {
          classIcon: "text-white fab fa-paypal",
          title: "Paypal",
          desc: "Freelance Payment",
          price: "$455.00",
        },
      };
    },
  };
  </script>