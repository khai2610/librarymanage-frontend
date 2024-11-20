<template>
  <div>
    <h1>Publisher List</h1>
    <!-- DataTable -->
    <table id="publishers-table" class="display">
      <thead>
        <tr>
          <th>Publisher Code</th>
          <th>Publisher Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="publisher in publishers" :key="publisher.MaNXB">
          <td>{{ publisher.MaNXB }}</td>
          <td>{{ publisher.TenNXB }}</td>
          <td>
            <router-link :to="`/publishers/${publisher.MaNXB}`" class="btn btn-primary">
              View Details
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
import 'datatables.net-dt/css/dataTables.dataTables.min.css';  // Import CSS for DataTable
import $ from 'jquery'; // Import jQuery
import 'datatables.net'; // Import DataTable library

export default {
  name: 'PublisherList',
  setup() {
    const publishers = ref([]);

    // Fetch list of publishers
    const fetchPublishers = async () => {
      try {
        const response = await api.get('/nhaxuatban');
        publishers.value = response.data;

        // Initialize DataTable after data is loaded
        setTimeout(() => {
          $('#publishers-table').DataTable();
        }, 0);
      } catch (error) {
        console.error('Error fetching publishers:', error);
      }
    };

    onMounted(fetchPublishers);

    return {
      publishers,
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

table.dataTable th,
table.dataTable td {
  padding: 12px;
  text-align: left;
}

table.dataTable th {
  background-color: #f8f9fa;
  font-weight: bold;
}

table.dataTable tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
