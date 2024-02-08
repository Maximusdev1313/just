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
const phone_number = ref("");
const market_name = ref("");
const promo = ref("");
const register = async () => {
  try {
    const response = await axios.post(`${store.api}/register-user`, {
      name: owner_name.value,
      password: password.value,
      phone_number: phone_number.value,
      market_name: market_name.value,
      role: "owner",
      promo: promo.value,
    });
    console.log(response.data.message);
    if (response.data.message == "Muvafaqiyatli") {
      // Assuming response.data is an array
      VueCookies.set("user", JSON.stringify(response.data));
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
  <div class="card">
    <div class="title text-center">Yangi hisob ochish</div>

    <div class="flex col justify-center mt-md">
      <label for="name">Ismingiz: *</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Ismingiz"
        v-model="owner_name"
      />
      <label for="password">Parolingiz: *</label>
      <input
        type="password"
        id="password"
        placeholder="Parol"
        v-model="password"
      />
      <label for="phone">Raqamingiz: *</label>
      <input
        type="tel"
        id="phone"
        placeholder="+998998998989"
        v-model="phone_number"
      />
      <label for="market_name">Do'kon nomi: *</label>
      <input
        type="text"
        id="market_name"
        placeholder="Do'kon nomi"
        v-model="market_name"
      />
      <label for="promo">Promo kod: (Ixtiyoriy)</label>
      <input type="text" id="" placeholder="Promo kod" v-model="promo" />
      <button @click="register">Ochish</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 100%;
}
</style>
