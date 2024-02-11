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
  });
});
onUnmounted(() => {
  window.removeEventListener("keydown", focusInput);
});
</script>

<template>
  <div class="flex justify-center">
    <div class="card flex col">
      <input
        type="text"
        name="name"
        id=""
        label="ismingiz"
        placeholder="Nomi bo'yicha"
        ref="inputRef"
        v-model="name"
        @keypress.enter="store.filterProductsByName(name)"
      />
      <input
        type="text"
        name="bar_code"
        id=""
        label="ismingiz"
        placeholder="Bar code"
        class="mt-md"
        v-model="code"
        @keypress.enter="store.filterProductsByCode(code)"
      />
      <button
        type="submit"
        class="mt-md"
        @click="store.sellProducts()"
        :class="store.itemsForSell.length ? 'enable' : 'disable'"
      >
        Sotish
      </button>
    </div>
  </div>
</template>
<style scoped>
.card {
  width: 500px;
}
</style>
