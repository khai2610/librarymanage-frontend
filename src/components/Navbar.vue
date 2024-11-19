<template>
  <nav>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/books">Books</router-link></li>
      <li><router-link to="/publishers">Publishers</router-link></li>
      <li><router-link to="/readers">Reader</router-link></li>
      <li><router-link to="/trackingList">BookBorrowingTrack</router-link></li>
      <li><router-link to="/employeeList">Employees</router-link></li>

    </ul>
  </nav>
</template>

<style scoped>
nav ul {
  display: flex;
  gap: 20px;
  list-style: none;
}
</style>
