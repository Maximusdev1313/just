<script setup>
import { ref, watch } from "vue";
import { reactive } from "vue";
import { useCentralStore } from "../stores/centralStore";
import VueCookies from "vue-cookies";
import Table from "../components/Table.vue";
const store = useCentralStore();
const user = VueCookies.get("user");
const date1 = ref("");
const date2 = ref("");
const filteredItems = ref([]);

async function getItems() {
  filteredItems.value = await store.filterByDateRange(
    date1.value,
    date2.value,
    "sold-products"
  );
  console.log(filteredItems.value);
}

const state = reactive({
  totalValue: 0,
  totalProfit: 0,
  totalEntryValue: 0,
});

const calculate = () => {
  const calcul = store.calculateTotalValueAndProfit(filteredItems.value);
  console.log(calcul);
  if (calcul) {
    Object.assign(state, calcul);
  }
};
watch([() => date1.value, () => date2.value], () => {
  getItems();
});
</script>
<template>
  <div class="flex col item-center">
    <div class="flex between date item-center mt-md">
      <div class="flex col">
        <router-link to="/addproduct">
          <button>Mahsulot qo'shish</button>
        </router-link>
        <label for="fdate">Birinchi sana:</label>
        <input type="date" name="fdate" id="" title="date1" v-model="date1" />
        <label for="sdate">Ikkinchi sana:</label>
        <input type="date" name="sdate" title="date2" v-model="date2" />
        <button @click="calculate" type="button">Hisoblash</button>
      </div>

      <div class="market-info">
        {{ user.owner_name }}
        {{ user.phone_number }}
      </div>
    </div>
    <div class="devider"></div>
    <div class="info mt-xl">
      <div class="">Umumiy sotilgan: {{ state.totalValue }} so'm</div>
      <div class="">
        Umumiy kelgan narxi:
        {{ state.totalEntryValue }} so'm
      </div>
      <div class="">
        Umumiy foyda:
        {{ state.totalProfit }} so'm
      </div>

      <Table :products="filteredItems" :caption="'Sotilgan'" />
    </div>
  </div>
</template>
<style scoped>
.date {
  width: 90%;
}
.date > input {
  margin-bottom: 20px;
}
.info {
  width: 90%;
}
</style>
