<script setup>
import { ref, watch } from "vue";
import { useCentralStore } from "../stores/sentralStore";
const store = useCentralStore();

const name = ref("");

watch(
  () => store.searchName,
  function () {
    store.searchProducts(store.searchName);
  }
);
</script>

<template>
  <input
    type="text"
    name="search"
    id="search"
    placeholder="Qidiruv"
    v-model="store.searchName"
  />
</template>

<style scoped>
input {
  width: 90%;
  height: 80%;
  border-radius: 15px;
  border: none;
  color: grey;
  padding-left: 10px;
  /* box-shadow: 5px 4px 38px -4px rgba(0, 0, 0, 0.55);
  -webkit-box-shadow: 5px 4px 38px -4px rgba(0, 0, 0, 0.55);
  -moz-box-shadow: 5px 4px 38px -4px rgba(0, 0, 0, 0.55); */
}
input::placeholder {
  padding-left: 10px;
  font-size: large;
}
input:focus {
  border: none;
  font-size: large;
  color: black;
}
</style>
