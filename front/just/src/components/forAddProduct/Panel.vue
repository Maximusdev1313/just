<script setup>
import { useCentralStore } from "../../stores/centralStore";
const store = useCentralStore();
const emit = defineEmits(["ChangeName"]);
let ChangeName = (newName) => {
  emit("ChangeName", newName);
};
</script>

<template>
  <div class="w-100 flex justify-center">
    <div class="content flex between">
      <button @click="store.getProductsFromServer">Mahsulotlarni olish</button>
      <button @click="ChangeName('add')">Maxsulot qo'shish</button>
      <button @click="ChangeName('change')">Maxsulotni taxrirlash</button>
      <button @click="ChangeName('exel')">Exel orqali</button>
    </div>
  </div>
</template>

<style scoped>
.content {
  width: 85%;
  padding: 30px;
}
</style>
