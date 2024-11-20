<template>
  <div class="container mt-5">
    <!-- Nút để hiển thị form tạo mới Nhà Xuất Bản -->
    <div class="text-center">
      <button @click="toggleForm" class="btn btn-primary" v-if="!isFormVisible">
        Create New Publisher
      </button>
    </div>

    <!-- Form sẽ chỉ hiển thị khi isFormVisible = true -->
    <div v-if="isFormVisible">
      <div class="card shadow-lg">
        <div class="card-header bg-primary text-white">
          <h3>Create New Publisher</h3>
        </div>
        <div class="card-body">
          <form @submit.prevent="createPublisher">
            <div class="form-group mb-3">
              <label for="MaNXB">Publisher Code:</label>
              <input v-model="formData.MaNXB" id="MaNXB" type="text" class="form-control" required />
            </div>

            <div class="form-group mb-3">
              <label for="TenNXB">Publisher Name:</label>
              <input v-model="formData.TenNXB" id="TenNXB" type="text" class="form-control" required />
            </div>

            <div class="form-group mb-3">
              <label for="DiaChi">Address:</label>
              <input v-model="formData.DiaChi" id="DiaChi" type="text" class="form-control" required />
            </div>

            <!-- Buttons to submit or cancel -->
            <div class="text-center">
              <button type="submit" class="btn btn-success">
                Create Publisher
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
  name: 'PublisherForm',
  setup() {
    const router = useRouter();
    const formData = ref({
      MaNXB: '',
      TenNXB: '',
      DiaChi: '',
    });

    // Biến trạng thái để hiển thị form
    const isFormVisible = ref(false);

    // Hàm hủy bỏ và ẩn form
    const cancelForm = () => {
      isFormVisible.value = false;
    };

    // Hàm để chuyển đổi trạng thái hiển thị form
    const toggleForm = () => {
      isFormVisible.value = !isFormVisible.value;
    };

    const createPublisher = async () => {
      try {
        await api.post('/nhaxuatban', formData.value); // Gửi dữ liệu đến API
        alert('Publisher created successfully!');
        router.push('/publishers'); // Chuyển hướng về danh sách nhà xuất bản
      } catch (error) {
        console.error('Error creating publisher:', error);
        alert('Failed to create publisher.');
      }
    };

    return {
      formData,
      createPublisher,
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
