<script setup>
// Importing necessary functions from Vue
import { ref, reactive, watch } from "vue";
// Importing the central store
import { useCentralStore } from "../stores/centralStore";
import Table from "../components/Table.vue";
import outlaysList from "../components/outlaysList.vue";
// Initializing the store
const store = useCentralStore();
// Initializing date references
const date1 = ref("");
const date2 = ref("");

// Initializing reactive variables
const state = reactive({
  totalValue: 0,
  totalProfit: 0,
  totalEntryValue: 0,
});
const filteredItems = ref([]);
const outlays = ref([]);
const by_card = ref([]);
const by_dept = ref([]);
const all_cost_by_card = ref({});
const all_cost_by_debt = ref({});
const all_outlays_for_market = ref(0);
const all_cost_by_outlays = ref(0);

// Function to get items based on date range and filter them by status
async function getItems() {
  // Fetching filtered items and outlays concurrently using Promise.all
  [filteredItems.value, outlays.value] = await Promise.all([
    store.filterByDateRange(date1.value, date2.value, "sold-products"),
    store.filterByDateRange(date1.value, date2.value, "outlays"),
  ]);

  // Filtering items by status
  by_card.value = store.filterItems(filteredItems.value, "status", "by_card");
  by_dept.value = store.filterItems(filteredItems.value, "status", "dept");

  if (filteredItems.value.length > 0) {
    Object.assign(
      state,
      store.calculateTotalValueAndProfit(filteredItems.value)
    );
  }

  // Calculating total value and profit for each status
  all_cost_by_card.value =
    by_card.value.length > 0
      ? store.calculateTotalValueAndProfit(by_card.value)
      : {};
  all_cost_by_debt.value =
    by_dept.value.length > 0
      ? store.calculateTotalValueAndProfit(by_dept.value)
      : {};

  // Filtering outlays for market
  const oulays_for_market = store.filterItems(
    outlays.value,
    "status",
    "for_market"
  );

  // Function to calculate total outlays
  const calculateTotalOutlays = (outlays) => {
    if (!Array.isArray(outlays)) {
      throw new Error("Invalid input: outlays must be an array");
    }

    return outlays.reduce((totalOutlay, item) => {
      if (typeof item.price !== "number") {
        throw new Error("Invalid item: price must be a number");
      }

      return totalOutlay + item.price;
    }, 0);
  };

  // Calculating total outlays for market and all outlays
  all_outlays_for_market.value = calculateTotalOutlays(oulays_for_market);
  all_cost_by_outlays.value = calculateTotalOutlays(outlays.value);
}

watch([() => date1.value, () => date2.value], () => {
  getItems();
});
</script>

<template>
  <div class="flex col item-center">
    <div class="title">
      {{ store.user.market_name.toUpperCase() }}
    </div>
    <div class="flex between date item-center mt-md">
      <div class="flex col">
        <router-link to="/addproduct">
          <button>Mahsulot qo'shish</button>
        </router-link>
        <label for="fdate">Birinchi sana:</label>
        <input type="date" name="fdate" id="" title="date1" v-model="date1" />
        <label for="sdate">Ikkinchi sana:</label>
        <input type="date" name="sdate" title="date2" v-model="date2" />
      </div>
    </div>
    <div class="devider"></div>

    <div class="info mt-xl" v-if="state.totalEntryValue">
      <div class="informations flex between">
        <div class="total-values">
          <div class="">Umumiy sotilgan: {{ state.totalValue }} so'm</div>
          <div class="">
            Umumiy kelgan narxi:
            {{ state.totalEntryValue }} so'm
          </div>
          <div class="">
            Umumiy foyda:
            {{ state.totalProfit }} so'm
          </div>
          <div>
            Umumiy sotilgan: {{ state.totalValue }} so'm - Karta orqali:
            {{ all_cost_by_card?.totalValue }} so'm - Xarajatlar:
            {{ all_cost_by_outlays }} so'm = Sizdagi naqt pul:
            <span>
              {{
                state.totalValue -
                all_cost_by_card?.totalValue -
                all_cost_by_outlays
              }}
              so'm
            </span>
          </div>
        </div>

        <div class="">
          <div class="">
            Karta orqali: {{ all_cost_by_card?.totalValue }} so'm
          </div>
          <div class="">Qarz: {{ all_cost_by_debt?.totalValue }} so'm</div>
          <div class="">Bozorlik uchun: {{ all_outlays_for_market }} so'm</div>
          <div class="">Xarajatlar: {{ all_cost_by_outlays }} so'm</div>
        </div>
      </div>

      <div class="devider"></div>

      <Table
        :products="filteredItems"
        :caption="'Umumiy'"
        v-if="filteredItems.length"
      />
      <Table
        :products="by_card"
        :caption="'Karta orqali'"
        v-if="by_card.length"
      />
      <Table
        :products="by_dept"
        :caption="'Qarz orqali'"
        v-if="by_dept.length"
      />
      <outlays-list :outlays="outlays" :caption="'Xarajatlar'" />
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
