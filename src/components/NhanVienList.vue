<template>
  <div>
    <h1>Employee List</h1>
    <!-- DataTable -->
    <table id="employee-list" class="display">
      <thead>
        <tr>
          <th>Employee Name</th>
          <th>Employee ID</th>
          <th>Position</th>
          <th>Phone Number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employeeList" :key="employee.msnv">
          <td>{{ employee.hoTenNV }}</td>
          <td>{{ employee.msnv }}</td>
          <td>{{ employee.chucvu }}</td>
          <td>{{ employee.soDienThoai }}</td>
          <td>
            <router-link :to="`/employeeList/${employee.msnv}`" class="btn btn-info btn-sm">
              Details
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import api from '../services/api';
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import $ from 'jquery';
import 'datatables.net';

export default {
  name: 'NhanVienList',
  setup() {
    const employeeList = ref([]);

    // Fetch employee list from the API
    const fetchEmployeeList = async () => {
      try {
        const response = await api.get('/nhanvien');
        employeeList.value = response.data;

        // Initialize DataTable after data is loaded
        setTimeout(() => {
          $('#employee-list').DataTable();
        }, 0);
      } catch (error) {
        console.error('Error fetching employee list:', error);
      }
    };

    // Fetch data when component is mounted
    onMounted(fetchEmployeeList);

    return {
      employeeList,
    };
  },
};
</script>

<style scoped>
/* Optional: Styling for DataTable if necessary */
table.dataTable {
  width: 100%;
  border-collapse: collapse;
}

button {
  margin-right: 10px;
}
</style>
