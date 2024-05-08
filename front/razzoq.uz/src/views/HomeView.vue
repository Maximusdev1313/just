<script setup>
import { ref } from "vue";
import heroContent from "../components/heroContent.vue";
import informations from "../components/informations.vue";
import categoryCards from "../components/categoryCards.vue";
import mainCard from "@/components/mainCard.vue";
import { useCentralStore } from "../stores/sentralStore";

const store = useCentralStore();
if (!store.products.length) {
  store.getProducts();
}
</script>

<template>
  <main>
    <hero-content />
    <informations />
    <category-cards />
    <div class="wrapper">
      <h3 class="title">Sizga kerakli</h3>
    </div>
    <main-card :products="store.important" />
    <div class="wrapper">
      <h3 class="title">So'ngi Qo'shilgan</h3>
    </div>
    <main-card :products="store.lastProducts" />
    <div class="wrapper">
      <h3 class="title">Un mahsulotlari</h3>
    </div>
    <main-card :products="store.flour" />
    <div class="wrapper">
      <h3 class="title">Yog'lar</h3>
    </div>
    <main-card :products="store.oil" />
    <div class="wrapper">
      <h3 class="title">Suvlar</h3>
    </div>
    <main-card :products="store.water" />
    <div class="wrapper">
      <h3 class="title">Kolbasa mahsulotlari</h3>
    </div>
    <main-card :products="store.sausage" />
    <div class="spacer"></div>
  </main>
</template>
<style scoped>
.spacer {
  height: 100px;
}
/* main {
  margin-top: 50px;
} */
</style>
