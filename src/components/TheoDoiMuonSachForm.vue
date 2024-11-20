<template>
  <div class="container mt-5">
    <!-- Nút để hiển thị form tạo mới Theo Dõi Mượn Sách -->
    <div class="text-center">
      <button @click="toggleForm" class="btn btn-primary" v-if="!isFormVisible">
        Create New Book Loan Tracking
      </button>
    </div>

    <!-- Form sẽ chỉ hiển thị khi isFormVisible = true -->
    <div v-if="isFormVisible">
      <div class="card shadow-lg">
        <div class="card-header bg-primary text-white">
          <h3>Create New Book Loan Tracking</h3>
        </div>
        <div class="card-body">
          <form @submit.prevent="createTracking">
            <div class="form-group mb-3">
              <label for="MaDocGia">Reader Code:</label>
              <input v-model="formData.MaDocGia" id="MaDocGia" type="text" class="form-control" required />
            </div>

            <div class="form-group mb-3">
              <label for="MaSach">Book Code:</label>
              <input v-model="formData.MaSach" id="MaSach" type="text" class="form-control" required />
            </div>

            <div class="form-group mb-3">
              <label for="NgayMuon">Loan Date:</label>
              <input v-model="formData.NgayMuon" id="NgayMuon" type="date" class="form-control" required />
            </div>

            <div class="form-group mb-3">
              <label for="NgayTra">Return Date:</label>
              <input v-model="formData.NgayTra" id="NgayTra" type="date" class="form-control" required />
            </div>

            <div class="text-center">
              <button type="submit" class="btn btn-success">
                Create Loan
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
