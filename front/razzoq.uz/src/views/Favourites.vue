<script setup>
import { useCentralStore } from "../stores/sentralStore";
const store = useCentralStore();
import mainCard from "@/components/mainCard.vue";
</script>
<template>
  <div class="about">
    <div class="wrapper">
      <h3 class="title">Sevimli mahsulotlar</h3>
    </div>
    <main-card :products="store.favourites" />
    <div class="spacer"></div>
  </div>
</template>

<style>
.about {
  margin-top: 20px;
}
.spacer {
  height: 100px;
}
</style>
