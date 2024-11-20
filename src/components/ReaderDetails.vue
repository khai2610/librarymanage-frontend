<template>
  <div class="container mt-5">
    <!-- Display Reader Details -->
    <div v-if="reader">
      <!-- Reader Details Header with Back Button -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <!-- Back Button -->
        <button @click="goBack" class="btn btn-secondary">Back</button>

        <!-- Empty div to take space between back button and title -->
        <div class="flex-grow-1"></div>

        <!-- Reader Title -->
        <h2 class="text-center w-100">Reader Details</h2>
      </div>

      <!-- Reader Information -->
      <div class="row mb-3">
        <div class="col-md-6">
          <p><strong>Reader Name:</strong> {{ reader.HoLot }} {{ reader.Ten }}</p>
          <p><strong>Reader Code:</strong> {{ reader.MaDocGia }}</p>
          <p><strong>Date of Birth:</strong> {{ reader.NgaySinh }}</p>
          <p><strong>Gender:</strong> {{ reader.Phai }}</p>
          <p><strong>Address:</strong> {{ reader.DiaChi }}</p>
          <p><strong>Phone Number:</strong> {{ reader.DienThoai }}</p>
        </div>
        <div class="col-md-6">
          <!-- Image or Extra Information (if any) -->
          <img src="https://via.placeholder.com/250" alt="Reader Image" class="img-fluid" />
        </div>
      </div>

      <button @click="toggleEdit" class="btn btn-primary me-2">Edit Reader</button>
      <button @click="deleteReader" class="btn btn-danger">Delete Reader</button>

      <!-- Edit Form -->
      <div v-if="isEditing" class="mt-4">
        <h3>Edit Reader</h3>
        <form @submit.prevent="updateReader">
          <div class="mb-3">
            <label for="HoLot" class="form-label">Reader Name:</label>
            <input v-model="formData.HoLot" id="HoLot" class="form-control" type="text" required />
            <input v-model="formData.Ten" class="form-control mt-2" type="text" required />
          </div>
          <div class="mb-3">
            <label for="MaDocGia" class="form-label">Reader Code:</label>
            <input v-model="formData.MaDocGia" id="MaDocGia" class="form-control" type="text" required />
          </div>
          <div class="mb-3">
            <label for="NgaySinh" class="form-label">Date of Birth:</label>
            <input v-model="formData.NgaySinh" id="NgaySinh" class="form-control" type="date" required />
          </div>
          <div class="mb-3">
            <label for="Phai" class="form-label">Gender:</label>
            <select v-model="formData.Phai" id="Phai" class="form-control" required>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="DiaChi" class="form-label">Address:</label>
            <input v-model="formData.DiaChi" id="DiaChi" class="form-control" type="text" required />
          </div>
          <div class="mb-3">
            <label for="DienThoai" class="form-label">Phone Number:</label>
            <input v-model="formData.DienThoai" id="DienThoai" class="form-control" type="text" required />
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
      <p>Loading reader details...</p>
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
  name: "ReaderDetails",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const reader = ref(null);
    const formData = ref({});
    const isEditing = ref(false);
    const error = ref(null);

    // Fetch reader details
    const fetchReaderDetails = async () => {
      try {
        const response = await api.get(`/docgia/${route.params.MaDocGia}`);
        if (response.data) {
          reader.value = response.data;
          formData.value = { ...response.data };
        } else {
          error.value = "Reader not found.";
        }
      } catch (err) {
        error.value = "Failed to fetch reader details.";
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
      formData.value = { ...reader.value };
    };

    // Update reader
    const updateReader = async () => {
      try {
        // Lấy tất cả trường trừ _id
        const { _id, ...updateData } = formData.value;
        console.log("Sending data for update:", updateData); // Log dữ liệu gửi đi
        await api.put(`/docgia/${route.params.MaDocGia}`, updateData);
        reader.value = { ...formData.value }; // Cập nhật dữ liệu sau khi thành công
        isEditing.value = false;
        alert("Reader updated successfully!");
      } catch (err) {
        console.error("Error updating reader:", err.response?.data || err.message);
        alert("Failed to update reader.");
      }
    };

    // Delete reader
    const deleteReader = async () => {
      try {
        await api.delete(`/docgia/${route.params.MaDocGia}`);
        alert("Reader deleted successfully!");
        router.push("/readers"); // Redirect to reader list
      } catch (err) {
        console.error(err);
        alert("Failed to delete reader.");
      }
    };

    // Go back to the previous page
    const goBack = () => {
      router.go(-1); // This will navigate back to the previous page
    };

    onMounted(fetchReaderDetails);

    return {
      reader,
      formData,
      isEditing,
      error,
      toggleEdit,
      cancelEdit,
      updateReader,
      deleteReader,
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
