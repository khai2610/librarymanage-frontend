<template>
  <div>
    <!-- Nút để hiển thị form tạo mới Độc Giả -->
    <button @click="toggleForm" v-if="!isFormVisible">Create New Reader</button>
    
    <!-- Form tạo Độc Giả sẽ hiển thị khi isFormVisible = true -->
    <form v-if="isFormVisible" @submit.prevent="createReader">
      <label for="MaDocGia">Reader Code:</label>
      <input v-model="formData.MaDocGia" id="MaDocGia" type="text" required />

      <label for="HoLot">Full Name:</label>
      <input v-model="formData.HoLot" id="HoLot" type="text" required />

      <label for="Ten">Last Name:</label>
      <input v-model="formData.Ten" id="Ten" type="text" required />

      <label for="NgaySinh">Date of Birth:</label>
      <input v-model="formData.NgaySinh" id="NgaySinh" type="date" required />

      <label for="Phai">Gender:</label>
      <select v-model="formData.Phai" id="Phai" required>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <label for="DiaChi">Address:</label>
      <input v-model="formData.DiaChi" id="DiaChi" type="text" required />

      <label for="DienThoai">Phone Number:</label>
      <input v-model="formData.DienThoai" id="DienThoai" type="text" required />

      <button type="submit">Create Reader</button>
      <button @click="cancelForm" type="button">Cancel</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import api from '../services/api';
import { useRouter } from 'vue-router';

export default {
  name: 'ReaderForm',
  setup() {
    const router = useRouter();
    const formData = ref({
      MaDocGia: '',
      HoLot: '',
      Ten: '',
      NgaySinh: '',
      Phai: '',
      DiaChi: '',
      DienThoai: '',
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

    // Hàm tạo mới Độc Giả
    const createReader = async () => {
      try {
        await api.post('/docgia', formData.value); // Gửi dữ liệu đến API
        alert('Reader created successfully!');
        router.push('/readers'); // Quay lại danh sách Độc Giả
      } catch (error) {
        console.error('Error creating reader:', error);
        alert('Failed to create reader.');
      }
    };

    return {
      formData,
      createReader,
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
