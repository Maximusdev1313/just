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
      <h3 class="title">So'ngi Qo'shilgan</h3>
    </div>
    <main-card :products="store.lastProducts" />
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
