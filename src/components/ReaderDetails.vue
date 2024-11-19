<template>
  <div>
    <div v-if="reader">
      <h2>Reader Details</h2>
      <p><strong>Reader Name:</strong> {{ reader.HoLot }} {{ reader.Ten }}</p>
      <p><strong>Reader Code:</strong> {{ reader.MaDocGia }}</p>
      <p><strong>Date of Birth:</strong> {{ reader.NgaySinh }}</p>
      <p><strong>Gender:</strong> {{ reader.Phai }}</p>
      <p><strong>Address:</strong> {{ reader.DiaChi }}</p>
      <p><strong>Phone Number:</strong> {{ reader.DienThoai }}</p>
      
      <!-- Chỉ hiển thị nút chỉnh sửa khi không phải chế độ chỉnh sửa -->
      <button v-if="!isEditing" @click="toggleEdit">Edit Reader</button>
      
      <!-- Chỉ hiển thị form chỉnh sửa khi ở chế độ chỉnh sửa -->
      <form v-if="isEditing" @submit.prevent="updateReader">
        <h3>Edit Reader</h3>
        <label>
          Reader Name:
          <input v-model="formData.HoLot" type="text" />
          <input v-model="formData.Ten" type="text" />
        </label>
        <label>
          Reader Code:
          <input v-model="formData.MaDocGia" type="text" />
        </label>
        <label>
          Date of Birth:
          <input v-model="formData.NgaySinh" type="date" />
        </label>
        <label>
          Gender:
          <select v-model="formData.Phai">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>
          Address:
          <input v-model="formData.DiaChi" type="text" />
        </label>
        <label>
          Phone Number:
          <input v-model="formData.DienThoai" type="text" />
        </label>
        <button type="submit">Save Changes</button>
        <button @click="cancelEdit" type="button">Cancel</button>
      </form>

      <!-- Xóa Độc Giả -->
      <button @click="deleteReader">Delete Reader</button>
    </div>
    <div v-else-if="error">
      <p>{{ error }}</p>
    </div>
    <div v-else>
      <p>Loading reader details...</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import api from '../services/api';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'ReaderDetail',
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
        await api.put(`/docgia/${route.params.MaDocGia}`, formData.value);
        reader.value = { ...formData.value };
        isEditing.value = false;
        alert("Reader updated successfully!");
      } catch (err) {
        console.error(err);
        alert("Failed to update reader.");
      }
    };

    // Delete reader
    const deleteReader = async () => {
      try {
        await api.delete(`/docgia/${route.params.MaDocGia}`);
        alert("Reader deleted successfully!");
        router.push("/readers"); // Redirect to readers list
      } catch (err) {
        console.error(err);
        alert("Failed to delete reader.");
      }
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
    };
  },
};
</script>

<style scoped>
/* Add styles here */
</style>
