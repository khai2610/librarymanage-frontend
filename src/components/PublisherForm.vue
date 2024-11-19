<template>
  <div>    
    <!-- Nút để hiển thị form tạo mới Nhà Xuất Bản -->
    <button @click="toggleForm" v-if="!isFormVisible">Create New Publisher</button>
    
    <!-- Form tạo Nhà Xuất Bản sẽ hiển thị khi isFormVisible = true -->
    <form v-if="isFormVisible" @submit.prevent="createPublisher">
      <label for="MaNXB">Publisher Code:</label>
      <input v-model="formData.MaNXB" id="MaNXB" type="text" required />

      <label for="TenNXB">Publisher Name:</label>
      <input v-model="formData.TenNXB" id="TenNXB" type="text" required />

      <label for="DiaChi">Address:</label>
      <input v-model="formData.DiaChi" id="DiaChi" type="text" required />

      <button type="submit">Create Publisher</button>
      <button @click="cancelForm" type="button">Cancel</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import api from '../services/api';
import { useRouter } from 'vue-router';

export default {
  name: 'PublisherForm',
  setup() {
    const router = useRouter();
    const formData = ref({
      MaNXB: '',
      TenNXB: '',
      DiaChi: '',
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

    // Hàm tạo mới Nhà Xuất Bản
    const createPublisher = async () => {
      try {
        await api.post('/nhaxuatban', formData.value); // Gửi dữ liệu đến API
        alert('Publisher created successfully!');
        router.push('/publishers'); // Quay lại danh sách Nhà Xuất Bản
      } catch (error) {
        console.error('Error creating publisher:', error);
        alert('Failed to create publisher.');
      }
    };

    return {
      formData,
      createPublisher,
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
