<template>
  <div class="mode">
    <div class="flex between date item-center mt-md">
      <div class="flex col">
        <label for="fdate">Birinchi sana:</label>
        <input type="date" name="fdate" id="" title="date1" v-model="date1" />
        <label for="sdate">Ikkinchi sana:</label>
        <input type="date" name="sdate" title="date2" v-model="date2" />
      </div>
    </div>
    <div class="flex justify-center">
      <apexchart
        width="1000"
        type="bar"
        :options="chartOptions"
        :series="chartSeries"
        v-if="filteredItems.length"
      ></apexchart>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useCentralStore } from "../stores/centralStore";
const store = useCentralStore();
// Initializing date references
const date1 = ref("");
const date2 = ref("");

const filteredItems = ref([]);
const outlays = ref([]);
async function getItems() {
  // Fetching filtered items and outlays concurrently using Promise.all
  [filteredItems.value, outlays.value] = await Promise.all([
    store.filterByDateRange(date1.value, date2.value, "sold-products"),
    store.filterByDateRange(date1.value, date2.value, "outlays"),
  ]);
  console.log(filteredItems.value, "items");
}
function calculateSumByDate(products) {
  // Create an object to hold the total sum for each date
  const sumByDate = {};

  // Iterate over the products
  for (const product of products) {
    // Extract the date from the 'created' field
    const date = product.created.split("T")[0];

    // If this date is not yet in the sumByDate object, add it with a starting sum of 0
    if (!sumByDate[date]) {
      sumByDate[date] = 0;
    }

    // Add the product's price to the total sum for this date
    sumByDate[date] += product.price * product.quantity;
  }

  // Return the sumByDate object
  return sumByDate;
}

const chartOptions = ref({
  chart: {
    id: "vuechart-example",
    foreColor: "#c964d6",
  },
  xaxis: {
    categories: [], // Using + operator
  },
  states: {
    hover: {
      filter: {
        type: "darken",
        value: 0.5,
      },
    },
  },
  tooltip: {
    theme: "dark", // This sets the theme of the tooltip. You can choose between 'dark' and 'light'
    style: {
      colors: ["#FFFFFF"], // This sets the color of the text in the tooltip. You can adjust this color as needed
    },
  },
});

const chartSeries = ref([
  {
    name: "Umumiy savdo",
    data: [],
    borderColor: "#c964d6",
    backgroundColor: "#c964d6",
  },
]);

watch([date1, date2], async () => {
  if (date1.value && date2.value) {
    await getItems();

    const sumByDate = calculateSumByDate(filteredItems.value);
    console.log(sumByDate, "sum");
    chartOptions.value.xaxis.categories = Object.keys(sumByDate);
    // Update the chartSeries data
    chartSeries.value[0].data = Object.values(sumByDate);
  }
});
</script>

<style scoped></style>
