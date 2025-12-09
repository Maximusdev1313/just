<script setup>
import { RouterLink, RouterView, useRouter } from "vue-router";
import { ref } from "vue";
import { onMounted } from "vue";
import searchBar from "./components/searchBar.vue";
import navMenu from "./components/navMenu.vue";
const router = useRouter();
const isOnCart = ref(false);
router.afterEach((to, from) => {
  console.log(`Navigated from ${from.path} to ${to.path}`);
  if (to.path == "/cart") {
    isOnCart.value = true;
  } else {
    isOnCart.value = false;
  }
});

onMounted(() => {
  const tg = window.Telegram.WebApp;

  tg.expand(); // Makes app fullscreen
  tg.ready(); // Tells Telegram your app is loaded

  console.log("User:", tg.initDataUnsafe.user);
});
</script>

<template>
  <div class="page-wrapper">
    <router-link to="/search">
      <header>
        <search-bar />
      </header>
    </router-link>
    <div class="spacer"></div>
    <RouterView />
    <footer v-if="!isOnCart">
      <nav-menu />
    </footer>
  </div>
</template>
<style scoped>
header {
  width: 100%;
  height: 60px;

  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(13, 104, 3, 0.646);

  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  /* backdrop-filter: blur(6.8px); */
  /* -webkit-backdrop-filter: blur(6.8px); */
  border: 1px solid rgba(255, 255, 255, 0.3);
}
.spacer {
  height: 61px;
  background-color: rgba(13, 104, 3, 0.646);
}
footer {
  position: fixed;
  bottom: 20px;
  left: 0;
  width: 100%;
}
</style>
