<template>
  <div>
    <h1>Reader List</h1>
    <ul>
      <li v-for="reader in readers" :key="reader.MaDocGia">
        <router-link :to="`/readers/${reader.MaDocGia}`">{{ reader.HoLot }} {{ reader.Ten }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import api from '../services/api';

export default {
  name: 'ReaderList',
  setup() {
    const readers = ref([]);

    // Fetch list of readers
    const fetchReaders = async () => {
      try {
        const response = await api.get('/docgia');
        readers.value = response.data;
      } catch (error) {
        console.error('Error fetching readers:', error);
      }
    };

    onMounted(fetchReaders);

    return {
      readers,
    };
  },
};
</script>

<style scoped>
/* Add styles here */
</style>
