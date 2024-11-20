<template>
  <div>
    <h1>Book List</h1>
    <table id="books-table" class="display">
      <thead>
        <tr>
          <th>Book ID</th>
          <th>Title</th>
          <th>Price</th>
          <th>Author</th>
          <th>Year</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.MaSach">
          <td>{{ book.MaSach }}</td>
          <td>{{ book.TenSach }}</td>
          <td>{{ book.DonGia }}</td>
          <td>{{ book.NguonGoc }}</td>
          <td>{{ book.NamXuatBan }}</td>
          <td>
            <router-link :to="`/books/${book.MaSach}`" class="btn btn-primary">
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
  name: "BookList",
  setup() {
    const books = ref([]);

    const fetchBooks = async () => {
      try {
        const response = await api.get("/sach");
        books.value = response.data;

        // Initialize DataTable after data is loaded
        setTimeout(() => {
          $("#books-table").DataTable();
        }, 0);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    onMounted(fetchBooks);

    return { books };
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
