<template>
  <div>
    <div v-if="book">
      <h2>Book Details</h2>
      <p><strong>Title:</strong> {{ book.TenSach }}</p>
      <p><strong>Price:</strong> {{ book.DonGia }}</p>
      <p><strong>Author:</strong> {{ book.NguonGoc }}</p>
      <p><strong>Year:</strong> {{ book.NamXuatBan }}</p>
      <p><strong>Quantity:</strong> {{ book.SoQuyen }}</p>
      <p><strong>Publisher Code:</strong> {{ book.MaNXB }}</p>
      <button @click="toggleEdit">Edit Book</button>
      <button @click="deleteBook">Delete Book</button>

      <!-- Form Edit Book -->
      <form v-if="isEditing" @submit.prevent="updateBook">
        <h3>Edit Book</h3>
        <label>
          Title:
          <input v-model="formData.TenSach" type="text" required />
        </label>
        <label>
          Price:
          <input v-model="formData.DonGia" type="number" required />
        </label>
        <label>
          Author:
          <input v-model="formData.NguonGoc" type="text" required />
        </label>
        <label>
          Year:
          <input v-model="formData.NamXuatBan" type="number" required />
        </label>
        <label>
          Quantity:
          <input v-model="formData.SoQuyen" type="number" required />
        </label>
        <label>
          Publisher Code:
          <input v-model="formData.MaNXB" type="text" required />
        </label>
        <button type="submit">Save Changes</button>
        <button @click="cancelEdit">Cancel</button>
      </form>
    </div>
    <div v-else-if="error">
      <p>{{ error }}</p>
    </div>
    <div v-else>
      <p>Loading book details...</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import api from "../services/api";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "BookDetails",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const book = ref(null);
    const formData = ref({});
    const isEditing = ref(false);
    const error = ref(null);

    // Fetch book details
    const fetchBookDetails = async () => {
      try {
        const response = await api.get(`/sach/${route.params.MaSach}`);
        if (response.data) {
          book.value = response.data;
          formData.value = { ...response.data };
        } else {
          error.value = "Book not found.";
        }
      } catch (err) {
        error.value = "Failed to fetch book details.";
        console.error(err);
      }
    };

    // Toggle edit mode
    const toggleEdit = () => {
      isEditing.value = !isEditing.value;
    };

    // Cancel editing
    const cancelEdit = () => {
      isEditing.value = false;
      formData.value = { ...book.value };
    };

    // Update book
      const updateBook = async () => {
          try {
              // Lấy tất cả trường trừ `_id`
              const { _id, ...updateData } = formData.value;

              console.log("Sending data for update:", updateData); // Log dữ liệu gửi đi

              await api.put(`/sach/${route.params.MaSach}`, updateData);

              book.value = { ...formData.value }; // Cập nhật dữ liệu sau khi thành công
              isEditing.value = false;
              alert("Book updated successfully!");
          } catch (err) {
              console.error("Error updating book:", err.response?.data || err.message);
              alert("Failed to update book.");
          }
      };


    // Delete book
    const deleteBook = async () => {
      try {
        await api.delete(`/sach/${route.params.MaSach}`);
        alert("Book deleted successfully!");
        router.push("/books"); // Redirect to book list
      } catch (err) {
        console.error(err);
        alert("Failed to delete book.");
      }
    };

    onMounted(fetchBookDetails);

    return {
      book,
      formData,
      isEditing,
      error,
      toggleEdit,
      cancelEdit,
      updateBook,
      deleteBook,
    };
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
