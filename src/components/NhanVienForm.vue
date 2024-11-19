<template>
  <div>
    <button @click="toggleForm" v-if="!isFormVisible">Create New Employee</button>
    <form v-if="isFormVisible" @submit.prevent="createEmployee">
      <label>Employee Code: <input v-model="formData.msnv" type="text" required /></label>
      <label>Name: <input v-model="formData.hoTenNV" type="text" required /></label>
      <label>Position: <input v-model="formData.chucVu" type="text" required /></label>
      <label>Address: <input v-model="formData.diaChi" type="text" required /></label>
      <label>Phone Number: <input v-model="formData.soDienThoai" type="text" required /></label>
      <button type="submit">Create Employee</button>
      <button @click="cancelForm" type="button">Cancel</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import api from '../services/api';
import { useRouter } from 'vue-router';

export default {
  name: 'NhanVienForm',
  setup() {
    const router = useRouter();
    const formData = ref({
      msnv: '',
      hoTenNV: '',
      chucVu: '',
      diaChi: '',
      soDienThoai: '',
    });
    const isFormVisible = ref(false);

    const toggleForm = () => {
      isFormVisible.value = true;
    };

    const cancelForm = () => {
      isFormVisible.value = false;
    };

    const createEmployee = async () => {
      try {
        await api.post('/nhanvien', formData.value);
        alert('Employee created successfully!');
        router.push('/employeeList');
      } catch (error) {
        console.error('Error creating employee:', error);
        alert('Failed to create employee.');
      }
    };
    



    return {
      formData,
      isFormVisible,
      toggleForm,
      cancelForm,
      createEmployee,
    };
  },
};
</script>

<style scoped>
/* Add styles here */
</style>
