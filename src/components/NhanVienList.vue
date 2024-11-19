<template>
  <div>
    <h1>Employee List</h1>
    <ul>
      <li v-for="employee in employeeList" :key="employee.msnv">
        <router-link :to="`/employeeList/${employee.msnv}`">
          {{ employee.hoTenNV }} - {{ employee.msnv }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import api from '../services/api';

export default {
  name: 'NhanVienList',
  setup() {
    const employeeList = ref([]);

    const fetchEmployeeList = async () => {
      try {
        const response = await api.get('/nhanvien');
        employeeList.value = response.data;
      } catch (error) {
        console.error('Error fetching employee list:', error);
      }
    };

    onMounted(fetchEmployeeList);

    return {
      employeeList,
    };
  },
};
</script>

<style scoped>
/* Add styles here */
</style>
