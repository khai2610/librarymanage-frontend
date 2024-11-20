<template>
  <div class="container mt-5">
    <!-- Nút để hiển thị form tạo mới sách -->
    <div class="text-center">
      <button @click="toggleForm" class="btn btn-primary" v-if="!isFormVisible">
        Create New Book
      </button>
    </div>

    <!-- Form sẽ chỉ hiển thị khi isFormVisible = true -->
    <div v-if="isFormVisible">
      <div class="card shadow-lg">
        <div class="card-header bg-primary text-white">
          <h3>Create New Book</h3>
        </div>
        <div class="card-body">
          <form @submit.prevent="createBook">
            <div class="form-group mb-3">
              <label for="MaSach">Book Code:</label>
              <input v-model="formData.MaSach" id="MaSach" type="text" class="form-control" required />
            </div>

            <div class="form-group mb-3">
              <label for="TenSach">Book Title:</label>
              <input v-model="formData.TenSach" id="TenSach" type="text" class="form-control" required />
            </div>

            <div class="form-group mb-3">
              <label for="DonGia">Price:</label>
              <input v-model="formData.DonGia" id="DonGia" type="number" class="form-control" required />
            </div>

            <div class="form-group mb-3">
              <label for="SoQuyen">Quantity:</label>
              <input v-model="formData.SoQuyen" id="SoQuyen" type="number" class="form-control" required />
            </div>

            <div class="form-group mb-3">
              <label for="NamXuatBan">Year of Publication:</label>
              <input v-model="formData.NamXuatBan" id="NamXuatBan" type="number" class="form-control" required />
            </div>

            <div class="form-group mb-3">
              <label for="MaNXB">Publisher Code:</label>
              <input v-model="formData.MaNXB" id="MaNXB" type="text" class="form-control" required />
            </div>

            <div class="form-group mb-3">
              <label for="NguonGoc">Author/Source:</label>
              <input v-model="formData.NguonGoc" id="NguonGoc" type="text" class="form-control" required />
            </div>

            <!-- Buttons to submit or cancel -->
            <div class="text-center">
              <button type="submit" class="btn btn-success">
                Create Book
              </button>
              <button @click="cancelForm" type="button" class="btn btn-danger">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
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
      cancelForm,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

.card {
  border: 1px solid #ddd;
}

.card-header {
  background-color: #007bff;
  padding: 15px;
}

.card-body {
  padding: 20px;
}

h3 {
  font-size: 1.5rem;
}

button {
  width: 150px;
  margin: 10px;
}

.form-group label {
  font-weight: bold;
}

.text-center {
  text-align: center;
}
</style>
