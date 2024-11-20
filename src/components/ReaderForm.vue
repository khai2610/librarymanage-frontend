<template>
  <div class="container mt-5">
    <!-- Nút để hiển thị form tạo mới Độc Giả -->
    <div class="text-center">
      <button @click="toggleForm" class="btn btn-primary" v-if="!isFormVisible">
        Create New Reader
      </button>
    </div>

    <!-- Form sẽ chỉ hiển thị khi isFormVisible = true -->
    <div v-if="isFormVisible">
      <div class="card shadow-lg">
        <div class="card-header bg-primary text-white">
          <h3>Create New Reader</h3>
        </div>
        <div class="card-body">
          <form @submit.prevent="createReader">
            <div class="form-group mb-3">
              <label for="MaDocGia">Reader Code:</label>
              <input v-model="formData.MaDocGia" id="MaDocGia" type="text" class="form-control" required />
            </div>

            <div class="form-group mb-3">
              <label for="HoLot">Full Name:</label>
              <input v-model="formData.HoLot" id="HoLot" type="text" class="form-control" required />
            </div>

            <div class="form-group mb-3">
              <label for="Ten">Last Name:</label>
              <input v-model="formData.Ten" id="Ten" type="text" class="form-control" required />
            </div>

            <div class="form-group mb-3">
              <label for="NgaySinh">Date of Birth:</label>
              <input v-model="formData.NgaySinh" id="NgaySinh" type="date" class="form-control" required />
            </div>

            <div class="form-group mb-3">
              <label for="Phai">Gender:</label>
              <select v-model="formData.Phai" id="Phai" class="form-control" required>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div class="form-group mb-3">
              <label for="DiaChi">Address:</label>
              <input v-model="formData.DiaChi" id="DiaChi" type="text" class="form-control" required />
            </div>

            <div class="form-group mb-3">
              <label for="DienThoai">Phone Number:</label>
              <input v-model="formData.DienThoai" id="DienThoai" type="text" class="form-control" required />
            </div>

            <!-- Buttons to submit or cancel -->
            <div class="text-center">
              <button type="submit" class="btn btn-success">
                Create Reader
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

    // Biến trạng thái để hiển thị form
    const isFormVisible = ref(false);

    const cancelForm = () => {
      isFormVisible.value = false;
    };

    // Hàm để chuyển đổi trạng thái hiển thị form
    const toggleForm = () => {
      isFormVisible.value = !isFormVisible.value;
    };

    const createReader = async () => {
      try {
        await api.post('/docgia', formData.value); // Gửi dữ liệu đến API
        alert('Reader created successfully!');
        router.push('/readers'); // Chuyển hướng về danh sách Độc Giả
      } catch (error) {
        console.error('Error creating reader:', error);
        alert('Failed to create reader.');
      }
    };

    return {
      formData,
      createReader,
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

/* Responsive layout */
@media (max-width: 768px) {
  .container {
    padding: 0 15px;
  }

  button {
    width: 100%;
    margin: 10px 0;
  }
}
</style>
