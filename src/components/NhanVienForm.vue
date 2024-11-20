<template>
  <div class="container mt-5">
    <!-- Nút để hiển thị form tạo mới Nhân Viên -->
    <div class="text-center">
      <button @click="toggleForm" class="btn btn-primary" v-if="!isFormVisible">
        Create New Employee
      </button>
    </div>

    <!-- Form sẽ chỉ hiển thị khi isFormVisible = true -->
    <div v-if="isFormVisible">
      <div class="card shadow-lg">
        <div class="card-header bg-primary text-white">
          <h3>Create New Employee</h3>
        </div>
        <div class="card-body">
          <form @submit.prevent="createEmployee">
            <div class="form-group mb-3">
              <label for="msnv">Employee Code:</label>
              <input v-model="formData.msnv" id="msnv" type="text" class="form-control" required />
            </div>

            <div class="form-group mb-3">
              <label for="hoTenNV">Name:</label>
              <input v-model="formData.hoTenNV" id="hoTenNV" type="text" class="form-control" required />
            </div>

            <div class="form-group mb-3">
              <label for="chucVu">Position:</label>
              <input v-model="formData.chucVu" id="chucVu" type="text" class="form-control" required />
            </div>

            <div class="form-group mb-3">
              <label for="diaChi">Address:</label>
              <input v-model="formData.diaChi" id="diaChi" type="text" class="form-control" required />
            </div>

            <div class="form-group mb-3">
              <label for="soDienThoai">Phone Number:</label>
              <input v-model="formData.soDienThoai" id="soDienThoai" type="text" class="form-control" required />
            </div>

            <div class="text-center">
              <button type="submit" class="btn btn-success">
                Create Employee
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
  name: 'NhanVienForm',
  setup() {
    const router = useRouter();
    const formData = ref({
      msnv: '',
      hoTenNV: '',
      chucVu: '',
      diaChi: '',
      soDienThoai: '',
    });
    const isFormVisible = ref(false);

    // Hàm hiển thị form
    const toggleForm = () => {
      isFormVisible.value = true;
    };

    // Hàm hủy bỏ và ẩn form
    const cancelForm = () => {
      isFormVisible.value = false;
    };

    // Hàm tạo mới Nhân Viên
    const createEmployee = async () => {
      try {
        await api.post('/nhanvien', formData.value); // Gửi dữ liệu đến API
        alert('Employee created successfully!');
        router.push('/employeeList'); // Quay lại danh sách nhân viên
      } catch (error) {
        console.error('Error creating employee:', error);
        alert('Failed to create employee.');
      }
    };

    return {
      formData,
      isFormVisible,
      toggleForm,
      cancelForm,
      createEmployee,
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
