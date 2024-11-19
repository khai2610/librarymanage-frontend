<template>
  <div>
    <h1>Employees</h1>
    <NhanVienList />
    <NhanVienForm />
  </div>
</template>

<script>
import NhanVienList from "../components/NhanVienList.vue";
import NhanVienForm from "../components/NhanVienForm.vue";

export default {
  components: { NhanVienList, NhanVienForm },
};
</script>