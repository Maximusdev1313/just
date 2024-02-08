<script setup>
import { useCentralStore } from "../../stores/centralStore";
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
    const response = await axios.post(`${store.api}/login-user`, {
      name: owner_name.value,
      password: password.value,
    });
    console.log(response.data.message);
    if (response.data.message == "Muvafaqiyatli") {
      // Assuming response.data is an array
      VueCookies.set("user", JSON.stringify(response.data), "8h");
      console.log(response.data);
      if (response.data.role == "owner") {
        router.push("/admin");
      } else {
        router.push("/");
      }
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
  <div class="card text-center">
    <div class="title">Hisobga kirish</div>

    <div class="flex col justify-center mt-md">
      <input
        type="text"
        id="name"
        placeholder="Ismingiz"
        v-model="owner_name"
      />
      <input type="text" id="password" placeholder="Parol" v-model="password" />
      <button @click="login">Kirish</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 100%;
}
</style>
