<template>
  <div class="container">
    <!-- Header section -->
    <div class="my-4">
      <h1 class="text-center">Employees</h1>
      <p class="text-center">Manage and view employees in the company.</p>
    </div>

    <!-- Employee list section -->
    <div class="card mb-4">
      <div class="card-header">
        <h4 class="card-title">Employee List</h4>
      </div>
      <div class="card-body">
        <NhanVienList />
      </div>
    </div>

    <!-- Employee form section -->
    <div class="card mb-4">
      <div class="card-header">
        <h4 class="card-title">Add New Employee</h4>
      </div>
      <div class="card-body">
        <NhanVienForm />
      </div>
    </div>
  </div>
</template>

<script>
import NhanVienList from "../components/NhanVienList.vue";
import NhanVienForm from "../components/NhanVienForm.vue";

export default {
  components: { NhanVienList, NhanVienForm },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.card {
  border: 1px solid #ddd;
  margin-bottom: 20px;
}

.card-header {
  background-color: #f8f9fa;
  padding: 15px;
}

.card-body {
  padding: 20px;
}

h1 {
  font-size: 2rem;
  font-weight: 600;
}

h4 {
  font-size: 1.5rem;
  font-weight: 500;
}

.text-center {
  text-align: center;
}
</style>
