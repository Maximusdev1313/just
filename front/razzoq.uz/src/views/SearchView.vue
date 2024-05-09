<script setup>
import { useCentralStore } from "../stores/sentralStore";
import mainCard from "@/components/mainCard.vue";
const store = useCentralStore();
</script>

<template>
  <div>
    <main-card :products="store.filteredItem" />
    <div class="spacer"></div>
  </div>
</template>
<style scoped>
.spacer {
  height: 100px;
}
</style>
