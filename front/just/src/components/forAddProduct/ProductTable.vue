<script setup>
import { ref } from "vue";
import { useCentralStore } from "../../stores/centralStore";
import axios from "axios";
import loader from "../../components/loader.vue";
const store = useCentralStore();
const isLoad = ref(false);

let ChanageProduct = async (item) => {
  isLoad.value = true;
  try {
    console.log(item.name);
    let data = await axios.patch(store.api + "/products/" + item._id, {
      name: item.name,
      size: item.size,
      entry_price: item.entry_price,
      price: item.price,
      quantity: item.quantity,
      quantity_in_store: item.quantity_in_store,
      description: item.description,
      discount_price: item.discount_price,
      minimal_quantity: item.minimal_quantity,
      status: item.status,
      category: item.category,
    });
    console.log(data);
    isLoad.value = false;
    localStorage.removeItem("products");
    store.items = [];
  } catch (error) {
    alert("Xatolik");
    console.log(error);
  }
  // `${store.api}/products/${item._id}`

  store.getProductsFromServer();
};
</script>

<template>
  <div class="w-100 flex justify-center content">
    <table>
      <tr>
        <th class="w-3">Tr</th>
        <th class="w-15">Nomi</th>
        <th class="w-8">Maxsulot Turi</th>
        <th class="w-7">Kelish Narxi</th>
        <th class="w-8">Sotish Narxi</th>
        <th class="w-8">Qolgan Maxsulot</th>
        <th class="w-7">Soni</th>
        <th class="w-11">Tasnifi</th>
        <th class="w-11">Kategoriya</th>
        <th class="w-8">Chegirma Narxi</th>
        <th class="w-7">Minimal Miqrori</th>
        <th class="w-11">Status</th>
        <th class="w-9">Taxrirlash</th>
      </tr>

      <tr v-for="(item, i) in store.items" :key="i">
        <td>{{ i + 1 }}</td>
        <td>
          <textarea v-model="item.name" rows="3" />
        </td>
        <td>
          <div class="flex">
            <input
              class="inp__radio"
              type="radio"
              v-model="item.size"
              value="kg"
            />
            <label> kg </label>
            <input
              class="inp__radio"
              type="radio"
              v-model="item.size"
              value="ta"
            />
            <label> ta </label>
          </div>
        </td>
        <td>
          <input v-model="item.entry_price" type="number" />
        </td>
        <td>
          <input v-model="item.price" type="number" />
        </td>
        <td>
          {{ item.quantity_in_store }}
        </td>
        <td>
          <input v-model="item.quantity" type="number" />
        </td>
        <td>
          <textarea v-model="item.description" rows="3" />
        </td>
        <td>
          <input v-model="item.category" type="text" />
        </td>
        <td>
          <input v-model="item.discount_price" type="number" />
        </td>
        <td>
          <input v-model="item.minimal_quantity" type="number" />
        </td>
        <td>
          <textarea v-model="item.status" rows="3" />
        </td>
        <td>
          <button @click="ChanageProduct(item)" v-if="!isLoad">
            Taxrirlash
          </button>
          <loader v-else />
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
input {
  padding: 15px;
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
input {
  padding: 5px 2px 5px 2px;
  font-size: 16px;
  border: none;
  text-align: center;
  background: none;
  margin-top: 14%;
}
textarea {
  width: 96%;
  padding: 2%;
  border: none;
  font-size: 15px;
  background: none;
}
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background: rgb(182, 180, 180);
}
.inp__radio {
  margin: 0px 3px 0px 0px;
}
label {
  margin-right: 3px;
}
.content {
  margin-top: 50px;
}
table {
  width: 95%;
}
td {
  text-align: center;
  align-items: center;
}
button {
  margin: 5px;
  background: rgb(198, 96, 232);
  color: white;
}
.w-15 {
  width: 15%;
}
.w-3 {
  width: 3%;
}
.w-7 {
  width: 7%;
}
.w-8 {
  width: 8%;
}
.w-9 {
  width: 9%;
}
.w-11 {
  width: 11%;
}
/* tr:nth-child(odd) {
  background: rgb(236, 239, 249);
} */
</style>
