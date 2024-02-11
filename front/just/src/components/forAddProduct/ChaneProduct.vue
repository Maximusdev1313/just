<script setup>
import { ref } from "vue";
import { useCentralStore } from "../../stores/centralStore";
import ProductTable from "./ProductTable.vue";
const store = useCentralStore();

let name = ref();
let bar_code = ref();
</script>

<template>
  <div class="w-100 flex justify-center wrap">
    <div class="w-100 text-center">
      <h3>Maxsulot Ma'lumotlarini taxrirlash</h3>
    </div>
    <div class="w-100 form flex justify-center wrap">
      <input
        v-model="name"
        placeholder="Nomi"
        @keypress.enter="store.filterProductsByName(name)"
      />
      <input
        v-model="bar_code"
        placeholder="Bar Kodi"
        @keypress.enter="store.filterProductsByCode(bar_code)"
      />
    </div>

    <ProductTable />
  </div>
</template>

<style scoped>
.form {
  width: 60%;
}
button {
  padding: 10px 40px 10px 40px;
  background: rgb(130, 206, 245);
  font-size: 18px;
  color: white;
}
input {
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
  font-family: montserrat;
  font-size: 18px;
}
::placeholder {
  font-size: 20px;
}
</style>
