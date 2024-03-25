<template>
    <div class="card">
      <form @submit.prevent="addAGV">
        <div class="card-body">
          <div class="form-group">
            <label for="code" class="form-control-label">Title</label>
            <input
              type="text"
              id="title"
              class="form-control"
              v-model="title"
              required
            />
          </div>
          <div class="form-group">
            <label for="description" class="form-control-label">Description</label
            >
            <input
              type="text"
              id="description"
              class="form-control"
              v-model="description"
              required
            />
          </div>
          
          <div class="text-center">
            <button type="submit" class="btn btn-primary">Add AGV</button>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script>
import AGVService from "@/services/agv.service";// import module AGV service yang berisi method API CRUD untuk AGV
  import Cookies from "js-cookie"; // import cookies untuk mengakses cookies di browser
  
  export default {
    // membuat function data untuk manipulasi data dalam komponen
    data() {
      return {
        code: "",
        description: "",
        // status: "", 
      };
    },
    methods: {
      // membut method untuk mengambil data dari form kemudian disimpan di database melalui API dari AGV service
      async addAGV() {
        try {
          // const userData = Cookies.get("user.username");
  
          let newAGV = {
            code: this.code,
            description: this.description,
            // status: this.status === "completed" ? true : false,
            // username: userData,
          };
  
          console.log(newAGV);
  
          const createdAGV = await AGVService.createAGV(newAGV);
  
          this.resetForm();
          window.location.reload();
        } catch (error) {
          console.error("Error submitting AGV:", error.message);
     
        }
      },
      resetForm() {
     // method untuk mereset isi form
        this.code = "";
        this.description = "";
      },
    },
  };
  </script>