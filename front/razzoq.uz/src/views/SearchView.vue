<script setup>
import { useCentralStore } from "../stores/sentralStore";
import mainCard from "@/components/mainCard.vue";
const store = useCentralStore();
</script>

<template>
  <div class="container">
    <main-card :products="store.filteredItem" />
    <div class="spacer"></div>
  </div>
</template>
<style scoped>
.container {
  margin-top: 20px;
}
.spacer {
  height: 100px;
}
</style>
