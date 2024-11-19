<template>
  <div>
    <h1>Publisher List</h1>
    <ul>
      <li v-for="publisher in publishers" :key="publisher.MaNXB">
        <router-link :to="`/publishers/${publisher.MaNXB}`">{{ publisher.TenNXB }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import api from '../services/api';

export default {
  name: 'PublisherList',
  setup() {
    const publishers = ref([]);

    // Fetch list of publishers
    const fetchPublishers = async () => {
      try {
        const response = await api.get('/nhaxuatban');
        publishers.value = response.data;
      } catch (error) {
        console.error('Error fetching publishers:', error);
      }
    };

    onMounted(fetchPublishers);

    return {
      publishers,
    };
  },
};
</script>

<style scoped>
/* Add styles here */
</style>
