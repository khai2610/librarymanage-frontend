<template>
  <div>
    <h1>Reader List</h1>
    <table id="readers-table" class="display">
      <thead>
        <tr>
          <th>Reader ID</th>
          <th>Full Name</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reader in readers" :key="reader.MaDocGia">
          <td>{{ reader.MaDocGia }}</td>
          <td>{{ reader.HoLot }} {{ reader.Ten }}</td>
          <td>{{ reader.DienThoai }}</td>
          <td>{{ reader.DiaChi }}</td>
          <td>
            <router-link :to="`/readers/${reader.MaDocGia}`" class="btn btn-primary">
              Details
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import api from "../services/api";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import $ from "jquery";
import "datatables.net";

export default {
  name: "ReaderList",
  setup() {
    const readers = ref([]);

    const fetchReaders = async () => {
      try {
        const response = await api.get("/docgia");
        readers.value = response.data;

        // Initialize DataTable after data is loaded
        setTimeout(() => {
          $("#readers-table").DataTable();
        }, 0);
      } catch (error) {
        console.error("Failed to fetch readers:", error);
      }
    };

    onMounted(fetchReaders);

    return { readers };
  },
};
</script>

<style scoped>
/* Optional: Styling for DataTable if necessary */
table.dataTable {
  width: 100%;
  border-collapse: collapse;
}
</style>
