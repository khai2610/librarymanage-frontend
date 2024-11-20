<template>
  <div id="app" class="d-flex">
    <!-- Sidebar -->
    <div class="sidebar p-3">
      <h4 class="text-white">Menu</h4>
      <ul class="list-unstyled">
        <li><router-link to="/" class="sidebar-link">Home</router-link></li>
        <li><router-link to="/books" class="sidebar-link">Books</router-link></li>
        <li><router-link to="/publishers" class="sidebar-link">Publishers</router-link></li>
        <li><router-link to="/readers" class="sidebar-link">Readers</router-link></li>
        <li><router-link to="/trackingList" class="sidebar-link">Book Borrowing Track</router-link></li>
        <li><router-link to="/employeeList" class="sidebar-link">Employees</router-link></li>
      </ul>
    </div>

    <!-- Main Content -->
    <div class="main-content p-3 w-100">
      <router-view />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
});
</script>

<style scoped>
#app {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #2c3e50;
  /* Dark blue-grey background */
  border-right: 2px solid #34495e;
  /* Lighter border for sidebar */
}

.sidebar h4 {
  color: #ecf0f1;
  /* Light grey text for title */
  font-size: 1.5rem;
}

.sidebar-link {
  display: block;
  padding: 10px;
  color: #ecf0f1;
  /* Light grey text for links */
  text-decoration: none;
  margin: 5px 0;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.sidebar-link:hover {
  background-color: #16a085;
  /* Greenish color on hover */
  color: #fff;
  /* White text on hover */
}

.main-content {
  margin-left: 250px;
  width: 100%;
  background-color: #ecf0f1;
  /* Light background for main content */
  color: #2c3e50;
  /* Dark text for main content */
  min-height: 100vh;
}

h2,
h3,
p {
  color: #34495e;
  /* Dark grey text for headings and paragraphs */
}

@media (max-width: 768px) {
  #app {
    flex-direction: column;
  }

  .sidebar {
    position: static;
    width: 100%;
    height: auto;
    background-color: #34495e;
    border-right: none;
  }

  .main-content {
    margin-left: 0;
  }

  .sidebar-link {
    padding: 12px;
  }
}
</style>
