<template>
  <div>
    <!-- Nút để hiển thị form tạo mới Theo Dõi Mượn Sách -->
    <button @click="toggleForm" v-if="!isFormVisible">Create New Book Loan Tracking</button>

    <!-- Form tạo Theo Dõi Mượn Sách sẽ hiển thị khi isFormVisible = true -->
    <form v-if="isFormVisible" @submit.prevent="createTracking">
      <label for="MaDocGia">Reader Code:</label>
      <input v-model="formData.MaDocGia" id="MaDocGia" type="text" required />

      <label for="MaSach">Book Code:</label>
      <input v-model="formData.MaSach" id="MaSach" type="text" required />

      <label for="NgayMuon">Loan Date:</label>
      <input v-model="formData.NgayMuon" id="NgayMuon" type="date" required />

      <label for="NgayTra">Return Date:</label>
      <input v-model="formData.NgayTra" id="NgayTra" type="date" required />

      <button type="submit">Create Loan</button>
      <button @click="cancelForm" type="button">Cancel</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import api from '../services/api';
import { useRouter } from 'vue-router';

export default {
  name: 'TheoDoiMuonSachForm',
  setup() {
    const router = useRouter();
    const formData = ref({
      MaDocGia: '',
      MaSach: '',
      NgayMuon: '',
      NgayTra: '',
    });
    const isFormVisible = ref(false); // Trạng thái để hiển thị form

    // Hàm hiển thị form
    const toggleForm = () => {
      isFormVisible.value = true;
    };

    // Hàm hủy bỏ và ẩn form
    const cancelForm = () => {
      isFormVisible.value = false;
    };

    // Hàm tạo mới Theo Dõi Mượn Sách
    const createTracking = async () => {
      try {
        await api.post('/theodoimuonsach', formData.value); // Gửi dữ liệu đến API
        alert('Tracking created successfully!');
        router.push('/trackingList'); // Quay lại danh sách Theo Dõi Mượn Sách
      } catch (error) {
        console.error('Error creating tracking:', error);
        alert('Failed to create tracking.');
      }
    };

    return {
      formData,
      createTracking,
      isFormVisible,
      toggleForm,
      cancelForm,
    };
  },
};
</script>

<style scoped>
/* Add styles here */
</style>
