<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { useCentralStore } from "../stores/centralStore";
const store = useCentralStore();

const name = ref("");
let inputRef = ref(null);
const code = ref("");

const paid_type = ref("cash");

const focusInput = async () => {
  if (inputRef.value) {
    await nextTick();

    inputRef.value.focus();
  }
};

onMounted(() => {
  window.addEventListener("keydown", function (event) {
    // Check if otherComponentOpened is true, if so, return early
    if (store.otherComponentOpened) return;

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
name="barcode"
        placeholder="Bar code"
        class="input mt-md"
        v-model="code"
        @keypress.enter="filterAndClear()"
      />
      <input
        type="text"
        placeholder="Nomi bo'yicha"
        ref="inputRef"
        v-model="name"
        class="input"
        @keypress.enter="store.filterProductsByName(name)"
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
        <form class="flex">
          <label class="form-control">
            <input
              type="radio"
              name="cash"
              id="cash"
              value="Cash"
              v-model="paid_type"
              checked="checked"
            />
            Naqt
          </label>

          <label class="form-control">
            <input
              type="radio"
              name="by_card"
              id="by_card"
              value="by_card"
              v-model="paid_type"
            />

            Karta orqali
          </label>
          <label class="form-control">
            <input
              type="radio"
              name="debt"
              id="dept"
              value="dept"
              v-model="paid_type"
            />
            Qarz
          </label>
        </form>

        <button
          type="submit"
          class="mt-md"
          @click="store.sellProducts(paid_type)"
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
  height: 40px;
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
  font-size: 18px;
}
.input::placeholder {
  padding-left: 10px;
  font-size: large;
}
.info {
  font-size: 20px;
}

form {
  display: flex;
  justify-content: space-between;
  align-items: end;
}

.form-control {
  font-family: system-ui, sans-serif;
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 1.1;
  margin-left: 15px;
  display: grid;
  grid-template-columns: 1em auto;
  gap: 0.5em;
}

.form-control:focus-within {
  color: #fff;
}

input[type="radio"] {
  /* Add if not using autoprefixer */
  -webkit-appearance: none;
  /* Remove most all native input styles */
  appearance: none;
  /* For iOS < 15 */
  background-color: var(--form-background);
  /* Not removed via appearance */
  margin: 0;

  font: inherit;
  color: red;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid red;
  border-radius: 50%;
  transform: translateY(-0.075em);

  display: grid;
  place-content: center;
}

input[type="radio"]::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  border-radius: 50%;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--form-control-color);
  /* Windows High Contrast Mode */
  background-color: red;
}

input[type="radio"]:checked::before {
  transform: scale(1);
}

input[type="radio"]:focus {
  outline: max(2px, 0.15em) solid red;
  outline-offset: max(2px, 0.15em);
}
</style>
