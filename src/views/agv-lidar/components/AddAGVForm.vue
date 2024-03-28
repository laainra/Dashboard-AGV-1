<template>
    <div class="card">
      <form @submit.prevent="addAGV">
        <div class="card-body">
          <div class="form-group">
            <label for="code" class="form-control-label">Code</label>
            <input
              type="text"
              id="code"
              class="form-control"
              v-model="code"
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
  import useAgvStore from "@/store/agv";// import module AGV service yang berisi method API CRUD untuk AGV// import module Auth service yang berisi method API CRUD untuk Auth
  import { mapActions } from "pinia";// import mapActions untuk mengakses method dari store
  import {useToast} from 'vue-toast-notification';
  import 'vue-toast-notification/dist/theme-sugar.css';

  const $toast = useToast();
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
      ...mapActions(useAgvStore, ["g$addAGV"]),
      async addAGV() {
        try {
          const agvCode = this.code;
          await this.g$addAGV({
            code: this.code,
            description: this.description,
          });
        
          $toast.success(`Add AGV with code ${agvCode} Success!`, { duration: 10000 });
          this.resetForm();
          window.location.reload();
        } catch (error) {
          console.log(error);
          $toast.error( `Failed to add AGV` ,{duration: 10000});
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