<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { useCentralStore } from "../stores/centralStore";
const store = useCentralStore();

const name = ref("");
let inputRef = ref(null);
const code = ref("");
const focusInput = async () => {
  if (inputRef.value) {
    await nextTick();

    inputRef.value.focus();
  }
};
onMounted(() => {
  window.addEventListener("keydown", function (event) {
    // Check if event.key is an alphabetic character
    if (/^[a-zA-Z]$/.test(event.key)) {
      focusInput();
    }
    if (event.key == " ") {
      store.cartOpen = false;
    }
  });
});
onUnmounted(() => {
  window.removeEventListener("keydown", focusInput);
});

const filterAndClear = () => {
  store.filterProductsByCode(code.value);
  code.value = "";
};
</script>

<template>
  <div class="flex justify-center">
    <div class="flex col wrapper">
      <input
        type="text"
        name="name"
        id=""
        label="ismingiz"
        placeholder="Nomi bo'yicha"
        ref="inputRef"
        v-model="name"
        class="input"
        @keypress.enter="store.filterProductsByName(name)"
      />
      <input
        type="text"
        name="bar_code"
        id=""
        label="ismingiz"
        placeholder="Bar code"
        class="input mt-md"
        v-model="code"
        @keypress.enter="filterAndClear()"
      />
      <div class="section flex between">
        <div class="info">
          <div class="flex" style="font-size: larger; font-weight: bolder">
            Umumiy:
            {{ store.totalSum }} so'm
          </div>
          <div class="seller">Sotuvchi: {{ store.user.name }}</div>
          <div class="time">
            Sotuv vaqti:
            {{ store.formatHours(store?.itemsForSell[0]?.created) }}
          </div>
        </div>
        <button
          type="submit"
          class="mt-md"
          @click="store.sellProducts()"
          :class="store.itemsForSell.length ? 'enable' : 'disable'"
        >
          <i class="fas fa-basket-shopping"></i>
          Sotish
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  width: 90%;
  margin-top: 20px;
}
.input {
  height: 50px;
  border-radius: 10px;
  border: none;
  -webkit-box-shadow: 1px 4px 8px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 1px 4px 8px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 1px 4px 8px 0px rgba(34, 60, 80, 0.2);
  padding-left: 20px;
  background-color: rgb(233, 232, 230);
  color: darkslategrey;
  font-size: large;
}
button {
  font-size: 20px;
}
.input::placeholder {
  padding-left: 10px;
  font-size: large;
}
.info {
  font-size: 20px;
}
</style>
