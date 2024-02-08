<script setup>
import axios from "axios";
import { ref } from "vue";
import VueCookies from "vue-cookies";
const name = ref("");
const phone_number = ref("");
const password = ref();

const registerWorker = async () => {
  const user = VueCookies.get("user");
  try {
    const response = await axios.post(
      "http://localhost:5000/api/register-user",
      {
        name: name.value,
        phone_number: phone_number.value,
        password: password.value,
        market_name: user.market_name,
        money: 0,
        role: "worker",
      }
    );
    console.log(user);
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
};
</script>

<template>
  <div class="flex item-center col w-100 mt-md">
    <div class="card">
      <div class="title">Hodimlarni qo'shish</div>
      <div class="flex col">
        <label for="name">Hodim ismi: *</label>
        <input type="text" name="name" id="name" v-model="name" />

        <label for="phone">Hodim mobil raqami: *</label>
        <input type="tel" name="phone" id="phone" v-model="phone_number" />

        <label for="password">Parol: *</label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="password"
        />
      </div>
      <button @click="registerWorker">Kiritish</button>
    </div>
  </div>
</template>
<style scoped>
.card {
  width: 50%;
  margin: 10 auto;
}
</style>
