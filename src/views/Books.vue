<template>
  <div>
    <h1>Books</h1>
    <BookList />
    <BookForm />
  </div>
</template>

<script>
import BookList from "../components/BookList.vue";
import BookForm from "../components/BookForm.vue";

export default {
  components: { BookList, BookForm },
};
</script>
