<script setup>
import { ref, toRefs } from "vue";
import { useCentralStore } from "../stores/centralStore";
const store = useCentralStore();
const props = defineProps({
  outlays: {
    type: Array,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
});
const { outlays, caption } = toRefs(props);
</script>

<template>
  <div>
    <div class="wrapper">
      <div class="mb-md title">
        {{ caption }}
      </div>
      <table class="table">
        <tr>
          <th class="title">Kim uchun</th>
          <th>Kim tomonidan</th>
          <th>Narxi</th>
          <th>Sabab</th>
          <th>Vaqt</th>
        </tr>
        <tr
          class="product-row"
          v-for="outlay in outlays"
          :key="outlay"
          :class="
            outlay.status == 'internal'
              ? 'red'
              : outlay.status == 'for_market'
              ? 'green'
              : 'primary'
          "
        >
          <td class="title">
            {{
              outlay.status == "internal"
                ? "Ichki xarajat"
                : outlay.status == "for_market"
                ? "Bozorlik uchun"
                : "Agent uchun"
            }}
          </td>
          <td class="">
            {{ outlay.salesman }}
          </td>

          <td>{{ outlay.price }} so'm</td>
          <td class="description">{{ outlay?.description }}</td>
          <td>{{ store.formatHours(outlay.created) }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  margin-top: 50px;
  max-height: 40vh;
  overflow: auto;
}
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
.table {
  width: 100%;
  margin: 0 auto;
}
.product-row {
  height: 100px;
}
.table-item {
  width: 100%;
}
.name {
  width: 50px;
  overflow: auto;
}
.product-row:hover {
  background-color: rgb(73, 73, 73);
  cursor: pointer;
}
.button-group {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  height: 100px;
  border: none;
  border-top: 1px solid #000;
}
.functional-buttons > button,
.submit > button {
  height: 80px;
  margin: 10px;
}
/* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  top: 100%;
  left: 50%;
  margin-left: -60px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}
.red {
  background-color: rgb(226, 116, 116);
}
.red:hover {
  background-color: rgb(248, 137, 117);
}
.green {
  background-color: green;
}
.green:hover {
  background-color: rgb(77, 151, 77);
}
.primary {
  background-color: #4e24bf;
}
.primary:hover {
  background-color: #7e56ec;
}
.description {
  max-width: 300px;
}
</style>
