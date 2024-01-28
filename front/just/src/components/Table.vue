<script setup>
import { toRefs } from "vue";
const props = defineProps({
  products: {
    type: Array,
    required: false,
  },
  caption: {
    type: String,
    required: false,
  },
});
const { products, caption } = toRefs(props);
</script>

<template>
  <div class="">
    <table class="table">
      <caption>
        {{
          caption
        }}
      </caption>
      <tr>
        <th class="name">Name</th>
        <th>Barcode</th>
        <th>Kelgan narxi</th>
        <th>Narxi</th>
        <th>Soni</th>
      </tr>
      <tr class="" v-for="product in products" :key="product">
        <td class="name">
          {{ product.name }}
        </td>
        <td>
          {{ product.bar_code }}
        </td>
        <td>{{ product.entry_price }} so'm</td>
        <td>{{ product.price }} so'm</td>
        <td>{{ product.quantity }} {{ product.size }}</td>
      </tr>
    </table>
  </div>
</template>
<style>
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
.table-item {
  width: 100%;
}
.name {
  width: 50px;
  overflow: auto;
}
</style>
