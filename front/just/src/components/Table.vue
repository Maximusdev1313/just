<script setup>
import axios from "axios";
import { ref, toRefs } from "vue";
import { useCentralStore } from "../stores/centralStore";
const store = useCentralStore();
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
const changedProduct = ref({});
const changedQuantity = ref(0);
const decrementQuantity = (product) => {
  changedProduct.value = JSON.parse(JSON.stringify(product));
  changedQuantity.value++;
  changedProduct.value.quantity = changedQuantity.value;

  product.quantity--;
};
const zeroQuantity = (product) => {
  changedProduct.value = JSON.parse(JSON.stringify(product));
  if (changedProduct.value.quantity == 0) {
    changedProduct.value.quantity = product.quantity;
    product.quantity = 0;
    console.log(product.quantity);
  } else {
    console.log(changedProduct.value.quantity);
    changedProduct.value.quantity = changedQuantity.value + product.quantity;
    console.log(changedProduct.value.quantity);
    product.quantity = 0;
  }
};
const patchProducts = async (product) => {
  try {
    const response = await axios.patch(
      `${store.api}/sold-products/${product._id}`,
      {
        name: product.name,
        bar_code: product.bar_code,
        category: product.category,
        entry_price: product.entry_price,
        price: product.price,
        market_name: store.user.market_name,
        discount_price: product.discount_price,
        size: product.size,
        quantity_in_store: product.quantity_in_store,
        quantity: product.quantity,
        store_name: store.user.store_name, 
        created: product.created,
      }
    );
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
};
</script>

<template>
  <div>
    <div class="wrapper">
      <div class="mb-md title">
        {{ caption }}
      </div>
      <table class="table">
        <tr>
          <th class="name">Name</th>
          <th>Barcode</th>
          <th>Kelgan narxi</th>
          <th>Narxi</th>
          <th>Soni</th>
          <th>Summa</th>
          <th>Vaqt</th>
        </tr>
        <tr
          class="product-row"
          v-for="product in products"
          :key="product"
          @dblclick="getProduct(product)"
          :class="
            product.status == 'dept'
              ? 'red'
              : product.status == 'by_card'
              ? 'green'
              : ''
          "
        >
          <td class="name">
            {{ product.name }}
          </td>
          <td>
            {{ product.bar_code }}
          </td>
          <td>{{ product.entry_price }} so'm</td>
          <td>{{ product.price }} so'm</td>
          <td>{{ product.quantity }} {{ product.size }}</td>
          <td>{{ product.quantity * product.price }} so'm</td>
          <td>{{ store.formatHours(product.created) }}</td>
          <!-- <td>
            <div class="button-group" v-if="product.status != 'dept'">
              <div class="functional-buttons">
                <button @click="decrementQuantity(product)">
                  <i class="fa-solid fa-minus"></i>
                </button>
                <button @click="zeroQuantity(product)" class="tooltip">
                  <i class="fa-brands fa-creative-commons-zero"></i>
                  <span class="tooltiptext">Sonni nollash</span>
                </button>
              </div>
              <div class="submit">
                <button @click="patchProducts(product)">bajarish</button>
              </div>
            </div>
          </td> -->
        </tr>
      </table>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  margin-top: 50px;
  max-height: 70vh;
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
</style>
