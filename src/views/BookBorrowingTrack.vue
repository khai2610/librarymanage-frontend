<template>
  <div>
    <h1>BookBorrowingTrack</h1>
    <TheoDoiMuonSachList />
    <TheoDoiMuonSachForm />
  </div>
</template>

<script>
import TheoDoiMuonSachList from "../components/TheoDoiMuonSachList.vue";
import TheoDoiMuonSachForm from "../components/TheoDoiMuonSachForm.vue";

export default {
  components: { TheoDoiMuonSachList, TheoDoiMuonSachForm },
};
</script>