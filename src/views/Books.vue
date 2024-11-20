<template>
  <div class="container">
    <!-- Header section -->
    <div class="my-4">
      <h1 class="text-center">Books</h1>
      <p class="text-center">Manage and view books in the library.</p>
    </div>

    <!-- Book list section -->
    <div class="card mb-4">
      <div class="card-header">
        <h4 class="card-title">Book List</h4>
      </div>
      <div class="card-body">
        <BookList />
      </div>
    </div>

    <!-- Book form section -->
    <div class="card mb-4">
      <div class="card-header">
        <h4 class="card-title">Add New Book</h4>
      </div>
      <div class="card-body">
        <BookForm />
      </div>
    </div>
  </div>
</template>

<script>
import BookList from "../components/BookList.vue";
import BookForm from "../components/BookForm.vue";

export default {
  components: { BookList, BookForm },
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
