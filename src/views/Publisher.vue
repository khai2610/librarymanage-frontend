<template>
  <div>
    <h1>Publisher</h1>
    <PublisherList />
    <PublisherForm />
  </div>
</template>

<script>
import PublisherList from "../components/PublisherList.vue";
import PublisherForm from "../components/PublisherForm.vue";

export default {
  components: { PublisherList, PublisherForm },
};
</script>