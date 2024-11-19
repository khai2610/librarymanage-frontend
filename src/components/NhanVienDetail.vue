<template>
  <div>
    <div v-if="employee">
      <h2>Employee Details</h2>
      <p><strong>Name:</strong> {{ employee.hoTenNV }}</p>
      <p><strong>Employee Code:</strong> {{ employee.msnv }}</p>
      <p><strong>Position:</strong> {{ employee.chucVu }}</p>
      <p><strong>Address:</strong> {{ employee.diaChi }}</p>
      <p><strong>Phone Number:</strong> {{ employee.soDienThoai }}</p>
      
      <button v-if="!isEditing" @click="toggleEdit">Edit Employee</button>
      
      <form v-if="isEditing" @submit.prevent="updateEmployee">
        <h3>Edit Employee</h3>
        <label>Name: <input v-model="formData.hoTenNV" type="text" /></label>
        <label>Position: <input v-model="formData.chucVu" type="text" /></label>
        <label>Address: <input v-model="formData.diaChi" type="text" /></label>
        <label>Phone Number: <input v-model="formData.soDienThoai" type="text" /></label>
        <button type="submit">Save Changes</button>
        <button @click="cancelEdit" type="button">Cancel</button>
      </form>

      <button @click="deleteEmployee">Delete Employee</button>
    </div>
    <div v-else-if="error">
      <p>{{ error }}</p>
    </div>
    <div v-else>
      <p>Loading employee details...</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import api from '../services/api';
import { useRoute, useRouter } from 'vue-router';

    export default {
  name: 'NhanVienDetail',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const employee = ref(null);
    const formData = ref({});
    const isEditing = ref(false);
    const error = ref(null);

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

    const toggleEdit = () => {
      isEditing.value = !isEditing.value;
    };

    const cancelEdit = () => {
      isEditing.value = false;
      formData.value = { ...employee.value };
    };

 
      const updateEmployee = async () => {
          try {
              const { _id, ...updateFields } = formData.value; // Loại bỏ _id khỏi dữ liệu
              const response = await api.put(`/nhanvien/${employee.value.msnv}`, updateFields);

              // Hiển thị thông báo cập nhật thành công
              alert(response.data.message || 'Cập nhật thành công!');

              // Cập nhật thông tin hiển thị sau khi cập nhật
              employee.value = response.data.data;
              await fetchEmployeeDetails();

              cancelEdit();
          } catch (error) {
              console.error('Error updating employee:', error.message);
              alert('Cập nhật thất bại!');
          }
      };



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
    };
  },
};
</script>

<style scoped>
/* Add styles here */
</style>
