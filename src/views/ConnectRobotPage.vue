<!-- App.vue or any other component where you want to use the IP input as a modal -->
<template>
    <div>
      <ip-input v-model:show="modal.addIP" modal-classes="modal-lg" @update:show="modal.addIP = $event">
        <template #header>
          <!-- Your header content here -->
          <h5 class="modal-title">Enter IP Address</h5>
        </template>
        <!-- The rest of your content -->
        <div slot="body">
          <!-- Your body content here -->
          <form @submit.prevent="connect">
            <div class="form-group">
              <label for="ipAddress">IP Address</label>
              <input type="text" class="form-control" id="ipAddress" v-model="ipAddress" required>
            </div>
            <button type="submit" class="btn btn-primary">Connect</button>
          </form>
        </div>
      </ip-input>
    </div>
  </template>
  
  <script>
  import IpInput from './IpInput.vue'; // Assuming your IP input component file is IpInput.vue
  
  export default {
    components: {
      IpInput,
    },
    data() {
      return {
        modal: {
            addIP: false,
        },
        ipAddress: '', // If you want to utilize this data in your component
      };
    },
    methods: {
      connect() {
        if (this.ipAddress.trim() !== '') {
          // Your connect logic here
          console.log('Connecting to IP:', this.ipAddress.trim());
        }
      },
    },
  };
  </script>