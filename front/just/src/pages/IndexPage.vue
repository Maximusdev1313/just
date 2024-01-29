<script setup>
import { ref } from "vue";
import { useCentralStore } from "../stores/centralStore";

import searchInputs from "../components/searchInputs.vue";
import productsForChoosing from "../components/productsForChoosing.vue";
import productsList from "../components/productsList.vue";
import check from "../components/check.vue";
import clients from "../components/clients.vue";
const store = useCentralStore();
</script>
<template>
  <div class="page flex row between wrap">
    <div class="drawer">
      <clients :clients="store.clients" />
      <div class="w-100 flex between mb-md">
        <a @click="store.getProductsFromServer()">Mahsulot olish</a>
        <a href="/report">Hisobot</a>
        <a href="/auth">Chiqish</a>
      </div>
    </div>
    <div class="inputs">
      <searchInputs />
      <productsForChoosing v-if="store.cartOpen" />

      <productsList />
    </div>
    <div class="checks">
      <check
        v-for="(products, index) in store.productsFromStorage"
        :key="index"
        :orders="products"
        :index="index"
      />
    </div>

    <!-- <productsForDay /> -->
  </div>
</template>
<style scoped>
.drawer {
  width: 300px;
  height: 100vh;
  background-color: rgb(48, 47, 47);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.checks {
  width: auto;
  height: 400px;
  overflow: auto;
}
</style>
