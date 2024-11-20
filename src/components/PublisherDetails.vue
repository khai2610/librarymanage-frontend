<template>
  <div class="container mt-5">
    <!-- Display Publisher Details -->
    <div v-if="publisher">
      <!-- Publisher Details Header with Back Button -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <!-- Back Button -->
        <button @click="goBack" class="btn btn-secondary">Back</button>

        <!-- Empty div to take space between back button and title -->
        <div class="flex-grow-1"></div>

        <!-- Publisher Title -->
        <h2 class="text-center w-100">Publisher Details</h2>
      </div>

      <!-- Publisher Information -->
      <div class="row mb-3">
        <div class="col-md-6">
          <p><strong>Publisher Name:</strong> {{ publisher.TenNXB }}</p>
          <p><strong>Publisher Code:</strong> {{ publisher.MaNXB }}</p>
          <p><strong>Address:</strong> {{ publisher.DiaChi }}</p>
        </div>
        <div class="col-md-6">
          <!-- Image or Extra Information (if any) -->
          <img src="https://via.placeholder.com/250" alt="Publisher Image" class="img-fluid" />
        </div>
      </div>

      <button @click="toggleEdit" class="btn btn-primary me-2">Edit Publisher</button>
      <button @click="deletePublisher" class="btn btn-danger">Delete Publisher</button>

      <!-- Edit Form -->
      <div v-if="isEditing" class="mt-4">
        <h3>Edit Publisher</h3>
        <form @submit.prevent="updatePublisher">
          <div class="mb-3">
            <label for="TenNXB" class="form-label">Publisher Name:</label>
            <input v-model="formData.TenNXB" id="TenNXB" class="form-control" type="text" required />
          </div>
          <div class="mb-3">
            <label for="MaNXB" class="form-label">Publisher Code:</label>
            <input v-model="formData.MaNXB" id="MaNXB" class="form-control" type="text" required />
          </div>
          <div class="mb-3">
            <label for="DiaChi" class="form-label">Address:</label>
            <input v-model="formData.DiaChi" id="DiaChi" class="form-control" type="text" required />
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
      <p>Loading publisher details...</p>
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
  name: "PublisherDetails",
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
        console.error("Error updating publisher:", err.response?.data || err.message);
        alert("Failed to update publisher.");
      }
    };

    // Delete publisher
    const deletePublisher = async () => {
      try {
        await api.delete(`/nhaxuatban/${route.params.MaNXB}`);
        alert("Publisher deleted successfully!");
        router.push("/publishers"); // Redirect to publisher list
      } catch (err) {
        console.error(err);
        alert("Failed to delete publisher.");
      }
    };

    // Go back to the previous page
    const goBack = () => {
      router.go(-1); // This will navigate back to the previous page
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
