<template>
  <div class="container mt-5">
    <!-- Borrowing Details -->
    <div v-if="tracking">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <!-- Back Button -->
        <button @click="goBack" class="btn btn-secondary">Back</button>

        <!-- Empty div for alignment -->
        <div class="flex-grow-1"></div>

        <!-- Title -->
        <h2 class="text-center w-100">Borrowing Details</h2>
      </div>

      <!-- Borrowing Information -->
      <div class="row mb-3">
        <div class="col-md-6">
          <p><strong>Reader Code:</strong> {{ tracking.MaDocGia }}</p>
          <p><strong>Book Code:</strong> {{ tracking.MaSach }}</p>
          <p><strong>Borrow Date:</strong> {{ tracking.NgayMuon }}</p>
          <p><strong>Return Date:</strong> {{ tracking.NgayTra || 'Not returned yet' }}</p>
        </div>
        <div class="col-md-6">
          <img src="https://via.placeholder.com/250" alt="Borrowing Image" class="img-fluid" />
        </div>
      </div>

      <!-- Action Buttons -->
      <button @click="toggleEdit" class="btn btn-primary me-2" v-if="!isEditing">Edit Details</button>
      <button @click="deleteTracking" class="btn btn-danger">Delete Record</button>

      <!-- Edit Form -->
      <div v-if="isEditing" class="mt-4">
        <h3>Edit Borrowing Details</h3>
        <form @submit.prevent="updateTracking">
          <div class="mb-3">
            <label for="MaDocGia" class="form-label">Reader Code:</label>
            <input v-model="formData.MaDocGia" id="MaDocGia" class="form-control" type="text" required />
          </div>
          <div class="mb-3">
            <label for="MaSach" class="form-label">Book Code:</label>
            <input v-model="formData.MaSach" id="MaSach" class="form-control" type="text" required />
          </div>
          <div class="mb-3">
            <label for="NgayMuon" class="form-label">Borrow Date:</label>
            <input v-model="formData.NgayMuon" id="NgayMuon" class="form-control" type="date" required />
          </div>
          <div class="mb-3">
            <label for="NgayTra" class="form-label">Return Date:</label>
            <input v-model="formData.NgayTra" id="NgayTra" class="form-control" type="date" />
          </div>
          <button type="submit" class="btn btn-success me-2">Save Changes</button>
          <button @click="cancelEdit" type="button" class="btn btn-secondary">Cancel</button>
        </form>
      </div>
    </div>

    <!-- Error Handling -->
    <div v-else-if="error">
      <p class="text-danger">{{ error }}</p>
    </div>

    <!-- Loading Spinner -->
    <div v-else>
      <p>Loading borrowing details...</p>
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
  name: "BorrowingDetails",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const tracking = ref(null);
    const formData = ref({});
    const isEditing = ref(false);
    const error = ref(null);

    // Fetch Borrowing Details
    const fetchTrackingDetails = async () => {
      try {
        const response = await api.get(
          `/theodoimuonsach/${route.params.MaDocGia}/${route.params.MaSach}`
        );
        if (response.data) {
          tracking.value = response.data;
          formData.value = { ...response.data };
        } else {
          error.value = "Record not found.";
        }
      } catch (err) {
        error.value = "Failed to fetch borrowing details.";
        console.error(err);
      }
    };

    // Toggle Edit Mode
    const toggleEdit = () => {
      isEditing.value = true;
    };

    // Cancel Edit
    const cancelEdit = () => {
      isEditing.value = false;
      formData.value = { ...tracking.value };
    };

    // Update Borrowing Details
    const updateTracking = async () => {
      try {
        const { _id, ...updateData } = formData.value;
        await api.put(
          `/theodoimuonsach/${route.params.MaDocGia}/${route.params.MaSach}`,
          updateData
        );
        tracking.value = { ...formData.value };
        isEditing.value = false;
        alert("Borrowing details updated successfully!");
      } catch (err) {
        console.error(err);
        alert("Failed to update borrowing details.");
      }
    };

    // Delete Borrowing Record
    const deleteTracking = async () => {
      try {
        await api.delete(
          `/theodoimuonsach/${route.params.MaDocGia}/${route.params.MaSach}`
        );
        alert("Record deleted successfully!");
        router.push("/theodoimuonsach");
      } catch (err) {
        console.error(err);
        alert("Failed to delete record.");
      }
    };

    // Go Back to Previous Page
    const goBack = () => {
      router.go(-1);
    };

    onMounted(fetchTrackingDetails);

    return {
      tracking,
      formData,
      isEditing,
      error,
      toggleEdit,
      cancelEdit,
      updateTracking,
      deleteTracking,
      goBack,
    };
  },
};
</script>

<style scoped>
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
