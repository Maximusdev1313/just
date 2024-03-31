<script setup>
import { useCentralStore } from "../stores/centralStore";
import { ref, onMounted, onUnmounted, nextTick, computed } from "vue";

const store = useCentralStore();
let inputRef = ref([]);
const focusInput = async () => {
  nextTick(() => {
    let target = inputRef.value[inputRef.value.length - 1];
    if (target) {
      target.focus();
    }
  });
};
store.totalSum = computed(() => {
  return store.itemsForSell.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
});
onMounted(() => {
  document.addEventListener("keypress", function (event) {
    var charCode = event.which ? event.which : event.keyCode;
    if (
      (charCode >= 48 && charCode <= 57 && store?.itemsForSell.length) ||
      event.key == "."
    ) {
      focusInput();
    }
    if (event.key == "+") {
      store.addClient();
    }
  });
});
onUnmounted(() => {
  window.removeEventListener("keydown", focusInput);
});
</script>

<template>
  <div class="products">
    <div class="flex justify-center col item-center">
      <div
        class="lists flex between item-center"
        v-for="product in store.itemsForSell"
        :key="product"
      >
        <div class="name">{{ product.name }}</div>
        {{ product.price }} so'm
        <div class="flex item-center">
          <button
            @click="store.incrementQuantity(product)"
            class="large-button"
          >
            <i class="fa-solid fa-plus"></i>
          </button>
          <input type="number" v-model="product.quantity" ref="inputRef" />
          <button
            @click="store.decrementQunatity(product)"
            class="large-button"
          >
            <i class="fa-solid fa-minus"></i>
          </button>
        </div>
        <div class="price">
          {{ Math.ceil(product.price * product.quantity) }} so'm
        </div>
        <div class="buttons flex item-center">
          <button
            class="ml-md delete-button large-button"
            @click="store.deleteProduct(product)"
          >
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.products {
  min-height: 30vh;
  max-height: 45vh;
  overflow: auto;
}
.name {
  width: 300px;
  overflow: auto;
  font-size: larger;
}
.lists {
  width: 90%;
  padding: 20px 0;
  border-bottom: 1px dotted #ccc;
  box-sizing: border-box;
}
input {
  margin: 0 10px;
  height: 30px;
  background-color: transparent;
  border: none;
  border-bottom: 1px dotted #fff;
  text-align: center;
}
.price {
  width: 200px;
  text-align: center;
}
.delete-button {
  background-color: brown;
}
</style>
