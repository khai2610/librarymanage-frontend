<template>
  <div class="container mt-5">
    <!-- Display Book Details -->
    <div v-if="book">
      <!-- Book Details Header with Back Button -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <!-- Back Button -->
        <button @click="goBack" class="btn btn-secondary">Back</button>

        <!-- Empty div to take space between back button and title -->
        <div class="flex-grow-1"></div>

        <!-- Book Title -->
        <h2 class="text-center w-100">Book Details</h2>
      </div>

      <!-- Book Information -->
      <div class="row mb-3">
        <div class="col-md-6">
          <p><strong>Title:</strong> {{ book.TenSach }}</p>
          <p><strong>Price:</strong> {{ book.DonGia | currency }}</p>
          <p><strong>Author:</strong> {{ book.NguonGoc }}</p>
          <p><strong>Year of Publication:</strong> {{ book.NamXuatBan }}</p>
          <p><strong>Quantity:</strong> {{ book.SoQuyen }}</p>
          <p><strong>Publisher Code:</strong> {{ book.MaNXB }}</p>
        </div>
        <div class="col-md-6">
          <!-- Image or Extra Information (if any) -->
          <img src="https://via.placeholder.com/250" alt="Book Image" class="img-fluid" />
        </div>
      </div>

      <button @click="toggleEdit" class="btn btn-primary me-2">Edit Book</button>
      <button @click="deleteBook" class="btn btn-danger">Delete Book</button>

      <!-- Edit Form -->
      <div v-if="isEditing" class="mt-4">
        <h3>Edit Book</h3>
        <form @submit.prevent="updateBook">
          <div class="mb-3">
            <label for="TenSach" class="form-label">Title:</label>
            <input v-model="formData.TenSach" id="TenSach" class="form-control" type="text" required />
          </div>
          <div class="mb-3">
            <label for="DonGia" class="form-label">Price:</label>
            <input v-model="formData.DonGia" id="DonGia" class="form-control" type="number" required />
          </div>
          <div class="mb-3">
            <label for="NguonGoc" class="form-label">Author:</label>
            <input v-model="formData.NguonGoc" id="NguonGoc" class="form-control" type="text" required />
          </div>
          <div class="mb-3">
            <label for="NamXuatBan" class="form-label">Year:</label>
            <input v-model="formData.NamXuatBan" id="NamXuatBan" class="form-control" type="number" required />
          </div>
          <div class="mb-3">
            <label for="SoQuyen" class="form-label">Quantity:</label>
            <input v-model="formData.SoQuyen" id="SoQuyen" class="form-control" type="number" required />
          </div>
          <div class="mb-3">
            <label for="MaNXB" class="form-label">Publisher Code:</label>
            <input v-model="formData.MaNXB" id="MaNXB" class="form-control" type="text" required />
          </div>
          <button type="submit" class="btn btn-success me-2">Save Changes</button>
          <button @click="cancelEdit" class="btn btn-secondary">Cancel</button>
        </form>
      </div>
    </div>

    <!-- Error Handling -->
    <div v-else-if="error">
      <p class="text-danger">{{ error }}</p>
    </div>

    <!-- Loading Spinner -->
    <div v-else>
      <p>Loading book details...</p>
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
        // Lấy tất cả trường trừ _id
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

    // Go back to the previous page
    const goBack = () => {
      router.go(-1); // This will navigate back to the previous page
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
      goBack,
    };
  },
};
</script>

<style scoped>
/* Add your styles here */
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
