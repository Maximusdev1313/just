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
const isActive = ref(false);
const postSoldProducts = async () => {
  if (store.productsFromStorage.length) {
    isActive.value = true;
    for (let product of store.productsFromStorage) {
      await store.postProducts(product, "sold-products");
      await store.decrementQuantityFromStore(product);
    }
    store.itemForShow = null;
    localStorage.removeItem("productsForSell");
    isActive.value = true;
    location.reload();
  }
};
</script>
<template>
  <div class="container">
    <div class="wrapper">
      <aside class="mode">
        <div class="drawer-wrapper">
          <div class="drawer">
            <div class="content">
              <button
                @click="store.addClient(clients.length)"
                class="button"
                type="button"
                v-if="!clients.length"
              >
                <i class="fas fa-plus"></i>
                Yangi mijoz qo'shish
              </button>
              <button
                @click="store.createNewClient()"
                class="button"
                type="button"
                v-else
              >
                <i class="fas fa-plus"></i>
                Yangi mijoz qo'shish
              </button>
              <clients :clients="store.clients" />
            </div>
          </div>
        </div>
      </aside>
      <div class="functional-section">
        <div class="search-inputs">
          <searchInputs />

          <productsForChoosing v-if="store.cartOpen" />
          <div class="devider"></div>
          <div class="title">Mahsulotlar:</div>
          <productsList />
        </div>
      </div>
      <aside class="mode">
        <div class="drawer-wrapper">
          <div class="drawer">
            <check
              v-for="(products, index) in store.productsFromStorage"
              :key="index"
              :orders="products"
              :index="index"
            />
          </div>
        </div>
      </aside>
    </div>
    <footer class="flex between item-center">
      <button @click="store.getProductsFromServer()" v-if="!store.loading">
        <i class="fa-solid fa-download"></i> Mahsulot olish
      </button>
      <loader v-else />
      <router-link to="/report" target="_blank"
        ><button>
          <i class="fas fa-chart-simple"></i> Hisobot
        </button></router-link
      >
      <button @click="postSoldProducts" v-if="!store.itemForShow || isActive">
        <i class="fa-solid fa-cloud-arrow-up"></i>
        Hisobot olish
      </button>
      <span class="item" v-else>{{ store.itemForShow }}</span>
      <router-link to="/auth"
        ><button>
          <i class="fa-solid fa-arrow-right-from-bracket"></i> Chiqish
        </button></router-link
      >
    </footer>
  </div>
</template>
<style scoped>
.wrapper {
  width: 100%;
  height: 92vh;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

aside {
  width: 20%;

  display: flex;
  align-items: center;
  flex-direction: column;
}

.content > * {
  width: 100%;
}

.drawer-wrapper {
  max-height: 90vh;
  overflow: hidden;
}

.drawer {
  max-height: 90vh;
  overflow-y: scroll;
  padding: 0;
  margin-right: -17px; /* Increase this value for wider scrollbars */
}
.functional-section {
  width: 60%;
}
.button {
  background-color: #3d48ee;
  margin-top: 10px;
  color: #fff;
}
.total {
  font-weight: bold;
  padding: 0 20px;
}
footer {
  width: 100%;
  height: 7vh;
}
</style>
