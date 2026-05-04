<script setup>
import { useCentralStore } from "../stores/centralStore";
import { ref, onMounted } from "vue";
import VueCookies from "vue-cookies";
import Table from "../components/Table.vue";
const store = useCentralStore();
const debts = ref([]);
const searchName = ref("");
const searchPhoneNumber = ref("");
const fetchDebtsByName = async () => {
  try {
    const user = VueCookies.get("user");
    if (!user) {
      alert("Iltimos Hisobga qayta kiring");
      return;
    }

    const response = await fetch(
      `${store.api}/sold-products/filter-by-client-name?q=${encodeURIComponent(searchName.value)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log("Status:", response.status);
    console.log("Content-Type:", response.headers.get("content-type"));
    const data = await response.json();
    debts.value = data;
    console.log(debts.value);
  } catch (error) {
    console.error("Error fetching debts:", error);
  }
};
onMounted(() => {});
</script>
<template>
  <div class="container">
    <h1 class="text-3xl font-bold mb-4">Qarzlar</h1>

    <div class="inputs">
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Xaridor nomi bo'yicha"
        v-model="searchName"
      />
      <button type="button" class="button" @click="fetchDebtsByName">
        Qidirish
      </button>
    </div>
    <div class="overflow-x-auto">
      <div v-if="debts.length">
        {{ debts.length }}
        {{ debts[0].client_name.toUpperCase() }}
        {{ debts[0].client_number.toUpperCase() }}
      </div>
      <Table v-if="debts.length" :products="debts" :caption="'Qarzlar'" />
      <p v-else class="text-center mt-4">Qarz topilmadi</p>
    </div>
  </div>
</template>
