<template>
  <div class="container">
    <!-- Header section -->
    <div class="my-4">
      <h1 class="text-center">Book Borrowing Track</h1>
      <p class="text-center">Track the borrowing status of books in the library.</p>
    </div>

    <!-- Book borrowing track list section -->
    <div class="card mb-4">
      <div class="card-header">
        <h4 class="card-title">Borrowing Track List</h4>
      </div>
      <div class="card-body">
        <TheoDoiMuonSachList />
      </div>
    </div>

    <!-- Book borrowing track form section -->
    <div class="card mb-4">
      <div class="card-header">
        <h4 class="card-title">Add New Borrowing Record</h4>
      </div>
      <div class="card-body">
        <TheoDoiMuonSachForm />
      </div>
    </div>
  </div>
</template>

<script>
import TheoDoiMuonSachList from "../components/TheoDoiMuonSachList.vue";
import TheoDoiMuonSachForm from "../components/TheoDoiMuonSachForm.vue";

export default {
  components: { TheoDoiMuonSachList, TheoDoiMuonSachForm },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.card {
  border: 1px solid #ddd;
  margin-bottom: 20px;
}

.card-header {
  background-color: #f8f9fa;
  padding: 15px;
}

.card-body {
  padding: 20px;
}

h1 {
  font-size: 2rem;
  font-weight: 600;
}

h4 {
  font-size: 1.5rem;
  font-weight: 500;
}

.text-center {
  text-align: center;
}
</style>
