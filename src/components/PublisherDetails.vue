<template>
  <div>
    <div v-if="publisher">
      <h2>Publisher Details</h2>
      <p><strong>Publisher Name:</strong> {{ publisher.TenNXB }}</p>
      <p><strong>Publisher Code:</strong> {{ publisher.MaNXB }}</p>
      <p><strong>Address:</strong> {{ publisher.DiaChi }}</p>
      
      <!-- Chỉ hiển thị nút chỉnh sửa khi không phải chế độ chỉnh sửa -->
      <button v-if="!isEditing" @click="toggleEdit">Edit Publisher</button>
      
      <!-- Chỉ hiển thị form chỉnh sửa khi ở chế độ chỉnh sửa -->
      <form v-if="isEditing" @submit.prevent="updatePublisher">
        <h3>Edit Publisher</h3>
        <label>
          Publisher Name:
          <input v-model="formData.TenNXB" type="text" />
        </label>
        <label>
          Publisher Code:
          <input v-model="formData.MaNXB" type="text" />
        </label>
        <label>
          Address:
          <input v-model="formData.DiaChi" type="text" />
        </label>
        <button type="submit">Save Changes</button>
        <button @click="cancelEdit">Cancel</button>
      </form>

      <!-- Xóa Nhà Xuất Bản -->
      <button @click="deletePublisher">Delete Publisher</button>
    </div>
    <div v-else-if="error">
      <p>{{ error }}</p>
    </div>
    <div v-else>
      <p>Loading publisher details...</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import api from '../services/api';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'PublisherDetails',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const publisher = ref(null);
    const formData = ref({});
    const isEditing = ref(false);
    const error = ref(null);

    // Fetch publisher details
    const fetchPublisherDetails = async () => {
      try {
        const response = await api.get(`/nhaxuatban/${route.params.MaNXB}`);
        if (response.data) {
          publisher.value = response.data;
          formData.value = { ...response.data };
        } else {
          error.value = "Publisher not found.";
        }
      } catch (err) {
        error.value = "Failed to fetch publisher details.";
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
      formData.value = { ...publisher.value };
    };

    // Update publisher
    const updatePublisher = async () => {
      try {
        await api.put(`/nhaxuatban/${route.params.MaNXB}`, formData.value);
        publisher.value = { ...formData.value };
        isEditing.value = false;
        alert("Publisher updated successfully!");
      } catch (err) {
          console.error('Error updating employee:', error.message);
        alert("Failed to update publisher.");
      }
    };

    // Delete publisher
    const deletePublisher = async () => {
      try {
        await api.delete(`/nhaxuatban/${route.params.MaNXB}`);
        alert("Publisher deleted successfully!");
        router.push("/publishers"); // Redirect to publishers list
      } catch (err) {
        console.error(err);
        alert("Failed to delete publisher.");
      }
    };

    onMounted(fetchPublisherDetails);

    return {
      publisher,
      formData,
      isEditing,
      error,
      toggleEdit,
      cancelEdit,
      updatePublisher,
      deletePublisher,
    };
  },
};
</script>

<style scoped>
/* Add styles here */
</style>
