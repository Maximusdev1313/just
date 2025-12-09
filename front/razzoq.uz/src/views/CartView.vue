<script setup>
import { onUnmounted, onMounted } from "vue";
import cartList from "../components/cartList.vue";
import { useCentralStore } from "../stores/sentralStore";
const store = useCentralStore();
onMounted(() => {
  window.addEventListener("beforeunload", saveCartItems);
});

onUnmounted(() => {
  window.removeEventListener("beforeunload", saveCartItems);
});

function saveCartItems() {
  localStorage.setItem("cart_items", JSON.stringify(store.cartItems));
}
</script>

<template>
  <div class="wrapper">
    <h3 class="title">Savatcha</h3>
    <cart-list />
    <div class="checkout">
      <div class="subtotal">
        <div class="delivery">
          <span>Yetkazib berish:</span>
          <span>0 so'm</span>
        </div>
        <div class="total">
          <span>Umumiy:</span>
          <span> {{ store.subTotal }} so'm </span>
        </div>
      </div>
      <router-link to="/order" v-if="store.cartItems.length">
        <button
          class="button"
          :class="!store.cartItems.length ? 'disable' : ''"
        >
          Buyurtma berish
        </button>
      </router-link>
      <router-link to="/" v-else>
        <button class="button">
          <i class="fa-solid fa-home"></i> Ortga qaytish
        </button>
      </router-link>
    </div>
  </div>
</template>
<style scoped>
.title {
  color: rgb(67, 67, 67);
}
.wrapper {
  width: 90%;
  margin: 0 auto;
}
.subtotal {
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  margin-bottom: 10px;
  padding: 5px 0;
  font-weight: bold;
  margin-top: 30px;
}
.subtotal > * {
  display: flex;
  justify-content: space-between;

  color: rgb(0, 0, 0);
}
.button {
  width: 100%;
  height: 35px;
  background-color: #1f8222;
  color: white;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease;
  border: none;
  border-radius: 15px;
  font-weight: bold;
}
</style>
