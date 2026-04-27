<script setup>
import axios from "axios";
import { ref } from "vue";
import { useCentralStore } from "../../stores/centralStore";
import RemoveBg from "./removeBg.vue";

const store = useCentralStore();

/* -------------------- FORM STATE -------------------- */
const name = ref("");
const bar_code = ref("");
const category = ref("");
const entry_price = ref("");
const price = ref("");
const quantity_in_store = ref("");
const size = ref("");

/* -------------------- CONSTANTS -------------------- */
const product_sizes = ["kg", "ta"];
const categories = [
  { name: "Un maxsulotlari" },
  { name: "Go'sht maxsulotlari" },
  { name: "Ichimliklar" },
  { name: "Qadoqlangan maxsulotlar" },
];

/* -------------------- POST PRODUCT -------------------- */
const postProduct = async () => {
  if (
    !name.value ||
    !bar_code.value ||
    !price.value ||
    !entry_price.value ||
    !quantity_in_store.value
  ) {
    alert("Iltimos barcha kataklarni to'ldiring!");
    return;
  }

  try {
    const formData = new FormData();

    formData.append("name", name.value);
    formData.append("category", category.value);
    formData.append("market_name", store.user.market_name);
    formData.append("entry_price", entry_price.value);
    formData.append("bar_code", bar_code.value);
    formData.append("price", price.value);
    formData.append("quantity_in_store", quantity_in_store.value);
    formData.append("size", size.value);

    /* ⬅ IMAGE FROM removeBg COMPONENT */
    if (store.removedBgImage) {
      formData.append("image", store.removedBgImage);
    }

    const res = await axios.post(store.api + "/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Product saved:", res.data);

    /* Reset form */
    name.value = "";
    bar_code.value = "";
    entry_price.value = "";
    price.value = "";
    quantity_in_store.value = "";
    size.value = "";
    category.value = "";
  } catch (error) {
    alert(error.response?.data?.message || "Xatolik yuz berdi");
  }
};
</script>
<template>
  <div class="w-100 flex justify-center wrap">
    <div class="w-100 text-center">
      <h3>Mahsulot qo'shish</h3>
    </div>

    <!-- Background remover -->
    <RemoveBg />

    <div class="form flex justify-center wrap">
      <input v-model="name" placeholder="Mahsulot Nomi" />
      <input v-model="bar_code" placeholder="Bar Code" />

      <input v-model="category" list="categories" placeholder="Kategoriya" />

      <datalist id="categories">
        <option v-for="c in categories" :key="c.name" :value="c.name" />
      </datalist>

      <input v-model="entry_price" placeholder="Kelgan narxi" />
      <input v-model="price" placeholder="Sotilish narxi" />

      <div class="w-100 flex mt-md mb-md">
        <span>Mahsulot turi</span>
        <div v-for="ps in product_sizes" :key="ps" class="text-center w-50px">
          <input type="radio" class="input_radio" v-model="size" :value="ps" />
          <label>{{ ps }}</label>
        </div>
      </div>

      <input v-model="quantity_in_store" placeholder="Miqdori" />

      <div class="w-100 flex justify-end">
        <button @click="postProduct">Qo'shish</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form {
  width: 85%;
}
.input_radio {
  margin: 0;
}
span {
  display: flex;
  font-size: 18px;
  margin-right: 50px;
  align-items: center;
}
.w-50px {
  width: 50px;
}
button {
  margin: 20px 50px 50px 0;
  padding: 10px 50px 10px 50px;
  background: rgb(116, 205, 232);
}
input {
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
  font-family: montserrat;
  font-size: 18px;
}
::placeholder {
  font-size: 20px;
}
</style>
