<script setup>
import { RouterLink, RouterView } from "vue-router";
import searchBar from "./components/searchBar.vue";
</script>

<template>
  <div class="">
    <router-link to="/">
      <header>
        <search-bar />
      </header>
    </router-link>

    <RouterView />
  </div>
</template>
<style scoped>
header {
  width: 100%;
  height: 50px;

  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.103);

  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  /* backdrop-filter: blur(6.8px); */
  /* -webkit-backdrop-filter: blur(6.8px); */
  border: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
