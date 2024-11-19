<template>
  <div>
    <div v-if="tracking">
      <h2>Borrowing Details</h2>
      <p><strong>Reader Code:</strong> {{ tracking.MaDocGia }}</p>
      <p><strong>Book Code:</strong> {{ tracking.MaSach }}</p>
      <p><strong>Borrow Date:</strong> {{ tracking.NgayMuon }}</p>
      <p><strong>Return Date:</strong> {{ tracking.NgayTra || 'Not returned yet' }}</p>

      <!-- Nút chỉnh sửa -->
      <button v-if="!isEditing" @click="toggleEdit">Edit Details</button>

      <!-- Form chỉnh sửa -->
      <form v-if="isEditing" @submit.prevent="updateTracking">
        <h3>Edit Borrowing Details</h3>
        <label>
          Reader Code:
          <input v-model="formData.MaDocGia" type="text" required />
        </label>
        <label>
          Book Code:
          <input v-model="formData.MaSach" type="text" required />
        </label>
        <label>
          Borrow Date:
          <input v-model="formData.NgayMuon" type="date" required />
        </label>
        <label>
          Return Date:
          <input v-model="formData.NgayTra" type="date" />
        </label>
        <button type="submit">Save Changes</button>
        <button @click="cancelEdit" type="button">Cancel</button>
      </form>

      <!-- Nút xóa -->
      <button @click="deleteTracking">Delete Record</button>
    </div>
    <div v-else-if="error">
      <p>{{ error }}</p>
    </div>
    <div v-else>
      <p>Loading borrowing details...</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import api from '../services/api';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'TheoDoiMuonSachDetail',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const tracking = ref(null);
    const formData = ref({});
    const isEditing = ref(false);
    const error = ref(null);

    // Lấy chi tiết theo dõi mượn sách
    const fetchTrackingDetails = async () => {
      try {
        const response = await api.get(
          `/theodoimuonsach/${route.params.MaDocGia}/${route.params.MaSach}`
        );
        console.log(response);
        
        if (response.data) {
          tracking.value = response.data;
          formData.value = { ...response.data };
        } else {
          error.value = 'Record not found.';
        }
      } catch (err) {
        error.value = 'Failed to fetch borrowing details.';
        console.error(err);
      }
    };

    // Chuyển sang chế độ chỉnh sửa
    const toggleEdit = () => {
      isEditing.value = true;
    };

    // Hủy chỉnh sửa
    const cancelEdit = () => {
      isEditing.value = false;
      formData.value = { ...tracking.value };
    };

    // Cập nhật chi tiết theo dõi
    const updateTracking = async () => {
      try {
        const { _id, ...updateData } = formData.value;
        await api.put(
          `/theodoimuonsach/${route.params.MaDocGia}/${route.params.MaSach}`,
            updateData
        );
        tracking.value = { ...formData.value };
        isEditing.value = false;
        alert('Borrowing details updated successfully!');
      } catch (err) {
        console.error(err);
        alert('Failed to update borrowing details.');
      }
    };

    // Xóa bản ghi
    const deleteTracking = async () => {
      try {
        await api.delete(
          `/theodoimuonsach/${route.params.MaDocGia}/${route.params.MaSach}`
        );
        alert('Record deleted successfully!');
        router.push('/theodoimuonsach'); // Quay lại danh sách
      } catch (err) {
        console.error(err);
        alert('Failed to delete record.');
      }
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
    };
  },
};
</script>

<style scoped>
/* Add styles here */
</style>
