<script setup>
import login from "../components/auth/login.vue";
import registerOwner from "../components/auth/registerOwner.vue";
import { ref } from "vue";
const register = ref(false);
</script>

<template>
  <div class="flex justify-center col item-center container">
    <!-- Login -->
    <div v-if="!register" class="wrapper">
      <login />
      <p class="mt-md" @click="register = true">
        Hisob mavjud bolmasa <a>Hisob ochish</a>
      </p>
    </div>
    <!-- Register -->
    <div class="wrapper" v-if="register">
      <register-owner />
      <p>
        Mavjud bo'lsa
        <a @click="register = false">Hisobga kirish</a>
      </p>
    </div>
  </div>
</template>
<style scoped>
.container {
  width: 100%;
  height: 90vh;
}
.wrapper {
  width: 40%;
}
</style>
