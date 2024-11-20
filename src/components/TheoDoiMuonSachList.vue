<template>
  <div>
    <h1>Book Loan Tracking List</h1>
    <!-- DataTable -->
    <table id="tracking-list" class="display">
      <thead>
        <tr>
          <th>Reader ID</th>
          <th>Book ID</th>
          <th>Loan Date</th>
          <th>Return Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tracking in trackingList" :key="`${tracking.MaDocGia}, ${tracking.MaSach}`">
          <td>{{ tracking.MaDocGia }}</td>
          <td>{{ tracking.MaSach }}</td>
          <td>{{ tracking.NgayMuon }}</td>
          <td>{{ tracking.NgayTra }}</td>
          <td>
            <!-- Link to the detail page -->
            <router-link :to="`/trackingList/${tracking.MaDocGia}/${tracking.MaSach}`" class="btn btn-info btn-sm">
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
  name: 'TheoDoiMuonSachList',
  setup() {
    const trackingList = ref([]);

    // Fetch tracking list from the API
    const fetchTrackingList = async () => {
      try {
        const response = await api.get('/theodoimuonsach');
        trackingList.value = response.data;

        // Initialize DataTable after data is loaded
        setTimeout(() => {
          $('#tracking-list').DataTable();
        }, 0);
      } catch (error) {
        console.error('Error fetching tracking list:', error);
      }
    };

    // Fetch data when component is mounted
    onMounted(fetchTrackingList);

    return {
      trackingList,
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
