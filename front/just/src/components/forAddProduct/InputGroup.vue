<script setup>
import axios from "axios";
import { ref, computed } from "vue";
import { useCentralStore } from "../../stores/centralStore";
const store = useCentralStore();
let name = ref();
let bar_code = ref();
let category = ref();
let entry_price = ref();
let price = ref();
let quantity_in_store = ref();
let size = ref();

let product_sizes = ref(["kg", "ta"]);
let categorys = ref([
  { name: " Un maxsulotlari " },
  { name: " Go'sht maxsulotlari " },
  { name: " Ichimliklar " },
  { name: " Qadoqlangan maxsulotlar " },
]);
let productDetails = computed(() => ({
  name: name.value,
  category: category.value,
  market_name: store.user.market_name,
  entry_price: entry_price.value,
  bar_code: bar_code.value,
  price: price.value,
  quantity_in_store: quantity_in_store.value,
  size: size.value,
}));
let PostProduct = async (api, product) => {
  try {
    let a = await axios.post(store.api + api, product);
    product.bar_code = "";
    console.log(a.data);
  } catch (error) {
    alert(error.response.data.message);
  }
};

let Post = async (product) => {
  if (
    !product.bar_code ||
    !product.price ||
    !product.entry_price ||
    !product.name ||
    !product.quantity_in_store
  ) {
    alert("Iltimos barcha kataklarni to'ldiring!");
    return;
  } else {
    console.log(productDetails.value);
    PostProduct("/products", product);
    store.postEntryProducts(product);
  }
};
</script>

<template>
  <div class="w-100 flex justify-center wrap">
    <div class="w-100 text-center">
      <h3>Maxsulot qo'shish</h3>
    </div>

    <div class="form flex justify-center wrap">
      <input v-model="name" placeholder="Maxsulot Nomi" />
      <input v-model="bar_code" placeholder="Bar Kodi" />
      <input
        v-model="category"
        list="countries"
        name="country"
        placeholder="Kartigoriya"
      />
      <datalist id="countries">
        <option
          v-for="category in categorys"
          :key="category"
          :value="category.name"
        />
      </datalist>

      <input v-model="entry_price" placeholder=" Kelgan narxi " />
      <input v-model="price" placeholder=" Sotilish Narxi " />
      <div class="w-100 flex mt-md mb-md">
        <span>Maxsulot turi</span>
        <div
          class="text-center w-50px"
          v-for="product_size in product_sizes"
          :key="product_size"
        >
          <input
            class="input_radio"
            type="radio"
            v-model="size"
            :value="product_size"
          />
          <label> {{ product_size }} </label>
        </div>
      </div>
      <input v-model="quantity_in_store" placeholder="Miqdori" />
      <div class="w-100 flex justify-end">
        <button @click="Post(productDetails)">Qo'shish</button>
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
