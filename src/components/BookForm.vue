<template>
  <div>
    <!-- Nút để hiển thị form tạo mới sách -->
    <button @click="toggleForm">Create New Book</button>

    <!-- Form sẽ chỉ hiển thị khi isFormVisible = true -->
    <div v-if="isFormVisible">
      <h2>Create New Book</h2>
      <form @submit.prevent="createBook">
        <label for="MaSach">Book Code:</label>
        <input v-model="formData.MaSach" id="MaSach" type="text" required />

        <label for="TenSach">Book Title:</label>
        <input v-model="formData.TenSach" id="TenSach" type="text" required />

        <label for="DonGia">Price:</label>
        <input v-model="formData.DonGia" id="DonGia" type="number" required />

        <label for="SoQuyen">Quantity:</label>
        <input v-model="formData.SoQuyen" id="SoQuyen" type="number" required />

        <label for="NamXuatBan">Year of Publication:</label>
        <input v-model="formData.NamXuatBan" id="NamXuatBan" type="number" required />

        <label for="MaNXB">Publisher Code:</label>
        <input v-model="formData.MaNXB" id="MaNXB" type="text" required />

        <label for="NguonGoc">Author/Source:</label>
        <input v-model="formData.NguonGoc" id="NguonGoc" type="text" required />

        <button type="submit">Create Book</button>
        <button @click="cancelForm" type="button">Cancel</button>

      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import api from '../services/api';
import { useRouter } from 'vue-router';

export default {
  name: 'BookForm',
  setup() {
    const router = useRouter();
    const formData = ref({
      MaSach: '',
      TenSach: '',
      DonGia: '',
      SoQuyen: '',
      NamXuatBan: '',
      MaNXB: '',
      NguonGoc: '',
    });
    
    // Biến trạng thái để hiển thị form
    const isFormVisible = ref(false);

     const cancelForm = () => {
      isFormVisible.value = false;
    };

    // Hàm để chuyển đổi trạng thái hiển thị form
    const toggleForm = () => {
      isFormVisible.value = !isFormVisible.value;
    };

    const createBook = async () => {
      try {
        
        const response = await api.post('/sach', formData.value); // Gửi dữ liệu đến API
        alert('Book created successfully!');
        router.push('/books'); // Chuyển hướng về danh sách sách
      } catch (error) {
        console.error('Error creating book:', error);
        alert('Failed to create book.');
      }
    };

    return {
      formData,
      createBook,
      toggleForm,
      isFormVisible,
      cancelForm
    };
  },
};
</script>

<style scoped>
/* Add styles here */
</style>
