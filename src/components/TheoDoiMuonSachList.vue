<template>
  <div>
    <h1>Book Loan Tracking List</h1>
    <ul>
      <li 
        v-for="tracking in trackingList" 
        :key="`${tracking.MaDocGia}, ${tracking.MaSach}`"
      >
        <!-- Link đến trang chi tiết với cả MaDocGia và MaSach -->
        <router-link 
          :to="`/trackingList/${tracking.MaDocGia}/${tracking.MaSach}`"
        >
          Reader: {{ tracking.MaDocGia }} | Book: {{ tracking.MaSach }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import api from '../services/api';

export default {
  name: 'TheoDoiMuonSachList',
  setup() {
    const trackingList = ref([]);

    // Fetch danh sách theo dõi mượn sách
    const fetchTrackingList = async () => {
      try {
        const response = await api.get('/theodoimuonsach');
        trackingList.value = response.data;
      } catch (error) {
        console.error('Error fetching tracking list:', error);
      }
    };

    onMounted(fetchTrackingList);

    return {
      trackingList,
    };
  },
};
</script>

<style scoped>
/* Add styles for styling the list */
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 10px 0;
}
router-link {
  text-decoration: none;
  color: blue;
}
router-link:hover {
  text-decoration: underline;
}
</style>
