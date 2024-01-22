<script setup>
import { useCentralStore } from "../stores/centralStore";
import { format } from "date-fns";
const store = useCentralStore();
store.getProductFromStorage();
const formatHours = (dateString) => {
  const date = new Date(dateString);
  return format(date, "HH:mm");
};
</script>

<template>
  <aside class="card">
    <div
      class="products"
      v-for="productObject in store.productsFromStorage"
      :key="productObject"
    >
      {{ formatHours(productObject[0].created) }}
      <div class="items" v-for="product in productObject" :key="product">
        <h5>{{ product.name }}</h5>
        <p>{{ product.price }} so'm</p>
        <p>{{ product.quantity }} {{ product.size }}</p>
      </div>
    </div>
  </aside>
</template>
<style scoped>
aside {
  width: 200px;
  height: 400px;
  overflow: auto;
}
.products {
  border-bottom: 1px solid #fff;
}
.items {
  border-bottom: 1px solid #424141;
}
h5 {
  margin: 5px;
}
p {
  margin: 0 5px;
  font-size: small;
}
</style>
