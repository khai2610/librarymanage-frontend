<template>
  <div>
    <h1>Reader</h1>
    <ReaderList />
    <ReaderForm />
  </div>
</template>

<script>
import ReaderList from "../components/ReaderList.vue";
import ReaderForm from "../components/ReaderForm.vue";

export default {
  components: { ReaderList,  ReaderForm },
};
</script>