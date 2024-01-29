<script setup>
import { useCentralStore } from "../stores/centralStore";
import axios from "axios";
import { ref } from "vue";
import VueCookies from "vue-cookies";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useCentralStore();
const owner_name = ref("");
const password = ref("");
const login = async () => {
  try {
    const response = await axios.post(`${store.api}/login-owner`, {
      owner_name: owner_name.value,
      password: password.value,
    });
    console.log(response.data.message);
    if (response.data.message == "Muvafaqiyatli") {
      // Assuming response.data is an array
      VueCookies.set("user", JSON.stringify(response.data), "8h");
      console.log(response.data);
      router.push("/");
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    console.log(error);
    alert(error);
  }
};
</script>

<template>
  <div class="flex justify-center item-center wrapper">
    <div class="card text-center">
      <div class="title">Hisobga kirish</div>

      <div class="flex col justify-center mt-md">
        <input
          type="text"
          id="name"
          placeholder="Ismingiz"
          v-model="owner_name"
        />
        <input
          type="text"
          id="password"
          placeholder="Parol"
          v-model="password"
        />
        <button @click="login">Kirish</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  height: 90vh;
}
/* .card {
  width: 50%;
  height: 40%;
} */
</style>
