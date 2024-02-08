<script setup>
import { useCentralStore } from "../stores/centralStore";

import Table from "../components/Table.vue";
const store = useCentralStore();
const addProducts = async () => {
  const copyObject = [...store.notAdded];
  store.notAdded = [];
  store.setItemToStorage("notAdded", store.notAdded);
  await store.postProducts(copyObject, "sold-products");
};
</script>

<template>
  <div class="wrapper">
    <Table :products="store.notAdded" :caption="'Qo\'shilmagan'" />
    <button @click="addProducts" class="mt-md mb-md">Qayta qo'shish</button>
  </div>
</template>

<style scoped>
.wrapper {
  width: 90%;
  margin: 0 auto;
}
</style>
