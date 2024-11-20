<template>
  <div class="home">
    <h1>Welcome to the Library Manager</h1>
    <p>Manage your books, authors, and more efficiently!</p>
    <router-link to="/books" class="btn">View Books</router-link>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.home {
  text-align: center;
  padding: 50px;
}

.home h1 {
  font-size: 2.5rem;
  color: #4CAF50;
}

.home p {
  font-size: 1.2rem;
  margin: 20px 0;
}

.home .btn {
  background-color: #4CAF50;
  color: #fff;
  padding: 10px 20px;
  text-decoration: none;
  font-weight: bold;
  border-radius: 5px;
}

.home .btn:hover {
  background-color: #45a049;
}
</style>
