<script setup>
import { ref } from "vue";
import { useCentralStore } from "../stores/centralStore";

import searchInputs from "../components/searchInputs.vue";
import productsForChoosing from "../components/productsForChoosing.vue";
import productsList from "../components/productsList.vue";
import check from "../components/check.vue";
import clients from "../components/clients.vue";
import loader from "../components/loader.vue";
const store = useCentralStore();

const postSoldProducts = async () => {
  if (store.productsFromStorage.length) {
    for (let product of store.productsFromStorage) {
      await store.postProducts(product, "sold-products");
      await store.decrementQuantityFromStore(product);
    }
    store.itemForShow = null;
    localStorage.removeItem("productsForSell");
    // location.reload();
  }
};
</script>
<template>
  <div class="container">
    <div class="drawer card">
      <div class="w-100 flex around item-center">
        <a @click="store.getProductsFromServer()">Mahsulot olish</a>
        <a href="/report">Hisobot</a>
        <a href="/auth">Chiqish</a>

        <a @click="postSoldProducts" v-if="!store.itemForShow">Hisobot olish</a>
        <span class="item">{{ store.itemForShow }}</span>
        <a href="/notAdded" v-if="store.notAdded.length">
          <div class="counter">{{ store.notAdded.length }}</div>
        </a>
        <div class="total">Umumiy: {{ store.totalSum }}</div>
        <loader v-if="store.loading" />
      </div>
    </div>
    <div class="page flex row between wrap">
      <clients :clients="store.clients" />
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
  </div>
</template>
<style scoped>
.page {
  margin-top: 60px;
}
.drawer {
  width: 100%;
  max-width: 100%;
  height: 50px;
  padding: 5px;
  position: fixed;

  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.total {
  width: 150px;
}
.checks {
  width: auto;
  height: 400px;
  overflow: auto;
}
.counter {
  color: crimson;
}
.item {
  width: 100px;
  height: 50px;
  overflow: auto;
}
</style>
