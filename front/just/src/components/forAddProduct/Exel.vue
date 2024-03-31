<script setup>
import { ref } from "vue";
import axios from "axios";
import * as XLSX from "xlsx";
import { useCentralStore } from "../../stores/centralStore";

const store = useCentralStore();
let selectedFile = ref(null);
let rowObject = ref("");

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0];
};

let data = [
  {
    name: "jayanth",
    data: "scd",
    abc: "sdef",
  },
];

const handleButtonClick = () => {
  XLSX.utils.json_to_sheet(data, "out.xlsx");
  if (selectedFile.value) {
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile.value);
    fileReader.onload = (event) => {
      let data = event.target.result;
      let workbook = XLSX.read(data, { type: "binary" });
      console.log(workbook);
      workbook.SheetNames.forEach((sheet) => {
        rowObject.value = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheet]
        );
        console.log(rowObject.value);
      });
    };
  } else {
    console.log("No file selected");
  }
};

const loading = ref(false);
const postProduct = async () => {
  for (let product of rowObject.value) {
    try {
      const response = await axios.post(store.api + "/products", {
        name: product.name,
        bar_code: product.bar_code,
        category: product.category,
        entry_price: product.entry_price,
        price: product.price,
        market_name: store.user.market_name,
        discount_price: product.discount_price,
        size: product.size,
        quantity_in_store: product.quantity_in_store,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
};
const patchProducts = async () => {
  for (let product of rowObject.value) {
    try {
      console.log(product._id);
      console.log(product.name);
      console.log(product.quantity);
      const response = await axios.patch(
        `${store.api}/products/${product.name}/full`,
        {
          name: product.name,
          bar_code: product.bar_code,
          category: product.category,
          entry_price: product.entry_price,
          price: product.price,
          market_name: store.user.market_name,
          discount_price: product.discount_price,
          size: product.size,
          quantity_in_store: product.quantity_in_store,
          quantity: product.quantity,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<template>
  <div class="q-pa-md">
    <div class="q-gutter-md">
      <input
        type="file"
        label="Select file"
        accept=".xls,.xlsx"
        @change="handleFileChange"
      />
      <button @click="handleButtonClick">Convert</button>
      <button @click="postProduct">Yangi qo'shish</button>
      <button @click="patchProducts">O'zgartirish</button>
      <pre>{{ rowObject }}</pre>
    </div>
  </div>
</template>
