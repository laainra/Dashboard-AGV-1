<!-- Membuat Halaman Edit AGV -->
<template>
    <div class="container-fluid">
        <div class="row">
        <div class="col-12">
            <h2>AGV List</h2>
            <div class="col-12">
            <h3>Edit New AGV</h3>
            </div>
        </div>
        <EditAGVForm />
        </div>
    </div>
</template>
  
<script>
import EditAGVForm from "./components/EditAGVForm.vue"; // Importing the edit AGV form component

export default {
name: "AGV",
components: {
    EditAGVForm,
},
data() {
    return {
    title: "",
    description: "",
    status: "",
    };
},
};
</script>