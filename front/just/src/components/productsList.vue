<script setup>
import { useCentralStore } from "../stores/centralStore";
import { ref, onMounted, onUnmounted, nextTick } from "vue";

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
onMounted(() => {
  document.addEventListener("keypress", function (event) {
    console.log(event.key);
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
  <div class="">
    <ul>
      <li
        v-for="product in store.itemsForSell"
        :key="product"
        class="list flex between mt-md"
      >
        <div class="product-info">
          <h4 class="name">{{ product.name }}</h4>
          <div class="quantity flex mt-xl between wrap">
            <span class="">
              soni:
              <input type="number" v-model="product.quantity" ref="inputRef" />
            </span>

            <span>
              narxi:
              {{ product.price }}
            </span>
            <span class="ml-md">
              summa: {{ product.price * product.quantity }}
            </span>
          </div>
        </div>

        <div class="buttons flex item-center">
          <button class="ml-md" @click="store.incrementQuantity(product)">
            <i class="fa-solid fa-plus"></i>
          </button>
          <button class="ml-md" @click="store.decrementQunatity(product)">
            <i class="fa-solid fa-minus"></i>
          </button>
          <button class="ml-md" @click="store.deleteProduct(product)">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.name {
  width: 80%;
  overflow: auto;
}
h4 {
  margin: 0;
}
.quantity {
  width: 100%;
  border: none;
  background-color: transparent;
}
.product-info {
  width: 100%;
}
ul {
  list-style: none;
  width: 800px;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  overflow: auto;
}
.list {
  width: 90%;
  height: 80px;
  padding: 0 5px 0 15px;
}
</style>
