<script setup>
import { watchEffect } from "vue";
import { useCentralStore } from "../stores/sentralStore";
const store = useCentralStore();
console.log(store.subTotal, "cart");
watchEffect(() => {
  for (let product of store.cartItems) {
    if (product.quantity < 0) {
      product.quantity = 0;
    }
  }
});
</script>

<template>
  <div class="container">
    <div class="product" v-for="product in store.cartItems" :key="product">
      <div class="cart-image" v-if="product.img">
        <img
          src="https://www.freeiconspng.com/thumbs/coca-cola-png/bottle-coca-cola-png-transparent-2.png"
          alt="image"
          class="image"
        />
      </div>
      <div class="cart-image" v-else>
        <img src="../assets/cart.png" alt="image" class="image" />
      </div>
      <div class="product-info">
        <div class="title">{{ product.name }}</div>
        <div class="price">
          {{ product.price }} so'm x {{ product.quantity }} =
          {{ Math.round(product.price * product.quantity) }} so'm
        </div>
        <div class="quantity">
          <label for="qty">Soni: </label>
          <input
            type="number"
            id="qty"
            name="qty"
            class="qty-input"
            v-model="product.quantity"
          />
        </div>
      </div>
      <div class="remove-button" @click="store.removeProduct(product)">
        <i class="fa-solid fa-remove fa-xl"></i>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  width: 100%;
  height: 55vh;
  overflow: auto;
}
.product {
  width: 100%;
  height: 89px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgb(175, 174, 174);
  margin-top: 5px;
  font-size: smaller;
}
.cart-image {
  display: flex;
  justify-content: center;
  align-items: center;
}
.image {
  width: 50px;
  margin: auto 0;
}

.product-info {
  width: 300px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
}
.product-info > * {
  width: 100%;
}
.title {
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: rgb(57, 57, 57);
}
.qty-input {
  border: none;
  border-bottom: 1px solid rgb(185, 185, 185);
  margin-bottom: 10px;
}
.remove-button {
  margin-top: 5px;
}
</style>
