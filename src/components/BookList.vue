<template>
  <div>
    <h1>Book List</h1>
    <ul>
      <li v-for="book in books" :key="book.MaSach">
        <router-link :to="`/books/${book.MaSach}`">{{ book.TenSach }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import api from "../services/api";

export default {
  name: "BookList",
  setup() {
    const books = ref([]);

    const fetchBooks = async () => {
      const response = await api.get("/sach");
      books.value = response.data;
    };

    onMounted(fetchBooks);

    return { books };
  },
};
</script>
