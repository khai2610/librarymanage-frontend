<template>
  <div class="container mt-5">
    <!-- Employee Details -->
    <div v-if="employee">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <!-- Back Button -->
        <button @click="goBack" class="btn btn-secondary">Back</button>

        <!-- Empty div for alignment -->
        <div class="flex-grow-1"></div>

        <!-- Title -->
        <h2 class="text-center w-100">Employee Details</h2>
      </div>

      <!-- Employee Information -->
      <div class="row mb-3">
        <div class="col-md-6">
          <p><strong>Name:</strong> {{ employee.hoTenNV }}</p>
          <p><strong>Employee Code:</strong> {{ employee.msnv }}</p>
          <p><strong>Position:</strong> {{ employee.chucVu }}</p>
          <p><strong>Address:</strong> {{ employee.diaChi }}</p>
          <p><strong>Phone Number:</strong> {{ employee.soDienThoai }}</p>
        </div>
        <div class="col-md-6">
          <img src="https://via.placeholder.com/250" alt="Employee Image" class="img-fluid" />
        </div>
      </div>

      <!-- Action Buttons -->
      <button @click="toggleEdit" class="btn btn-primary me-2" v-if="!isEditing">Edit Employee</button>
      <button @click="deleteEmployee" class="btn btn-danger">Delete Employee</button>

      <!-- Edit Form -->
      <div v-if="isEditing" class="mt-4">
        <h3>Edit Employee</h3>
        <form @submit.prevent="updateEmployee">
          <div class="mb-3">
            <label for="hoTenNV" class="form-label">Name:</label>
            <input v-model="formData.hoTenNV" id="hoTenNV" class="form-control" type="text" required />
          </div>
          <div class="mb-3">
            <label for="chucVu" class="form-label">Position:</label>
            <input v-model="formData.chucVu" id="chucVu" class="form-control" type="text" required />
          </div>
          <div class="mb-3">
            <label for="diaChi" class="form-label">Address:</label>
            <input v-model="formData.diaChi" id="diaChi" class="form-control" type="text" required />
          </div>
          <div class="mb-3">
            <label for="soDienThoai" class="form-label">Phone Number:</label>
            <input v-model="formData.soDienThoai" id="soDienThoai" class="form-control" type="text" required />
          </div>
          <button type="submit" class="btn btn-success me-2">Save Changes</button>
          <button @click="cancelEdit" type="button" class="btn btn-secondary">Cancel</button>
        </form>
      </div>
    </div>

    <!-- Error Handling -->
    <div v-else-if="error">
      <p class="text-danger">{{ error }}</p>
    </div>

    <!-- Loading Spinner -->
    <div v-else>
      <p>Loading employee details...</p>
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import api from "../services/api";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "EmployeeDetails",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const employee = ref(null);
    const formData = ref({});
    const isEditing = ref(false);
    const error = ref(null);

    // Fetch Employee Details
    const fetchEmployeeDetails = async () => {
      try {
        const response = await api.get(`/nhanvien/${route.params.msnv}`);
        if (response.data) {
          employee.value = response.data;
          formData.value = { ...response.data };
        } else {
          error.value = "Employee not found.";
        }
      } catch (err) {
        error.value = "Failed to fetch employee details.";
        console.error(err);
      }
    };

    // Toggle Edit Mode
    const toggleEdit = () => {
      isEditing.value = true;
    };

    // Cancel Edit
    const cancelEdit = () => {
      isEditing.value = false;
      formData.value = { ...employee.value };
    };

    // Update Employee
    const updateEmployee = async () => {
      try {
        const { _id, ...updateFields } = formData.value;
        const response = await api.put(`/nhanvien/${employee.value.msnv}`, updateFields);
        alert(response.data.message || "Updated successfully!");
        employee.value = response.data.data;
        await fetchEmployeeDetails();
        cancelEdit();
      } catch (error) {
        console.error("Error updating employee:", error.message);
        alert("Failed to update employee.");
      }
    };

    // Delete Employee
    const deleteEmployee = async () => {
      try {
        await api.delete(`/nhanvien/${route.params.msnv}`);
        alert("Employee deleted successfully!");
        router.push("/employees");
      } catch (err) {
        console.error(err);
        alert("Failed to delete employee.");
      }
    };

    // Go Back to Previous Page
    const goBack = () => {
      router.go(-1);
    };

    onMounted(fetchEmployeeDetails);

    return {
      employee,
      formData,
      isEditing,
      error,
      toggleEdit,
      cancelEdit,
      updateEmployee,
      deleteEmployee,
      goBack,
    };
  },
};
</script>

<style scoped>
.d-flex {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.text-center {
  text-align: center;
}

.w-100 {
  width: 100%;
}

.flex-grow-1 {
  flex-grow: 1;
}
</style>
