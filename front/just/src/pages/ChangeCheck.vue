script
<script setup>
import { toRefs, ref, watchEffect, onBeforeMount } from "vue";
import { useCentralStore } from "../stores/centralStore";
import { useRouter } from "vue-router";
import VueCookies from "vue-cookies";
import axios from "axios";
const store = useCentralStore();
const router = useRouter();

watchEffect(() => {
  if (router.currentRoute.value.path === "/changeCheck") {
    // Fetch data based on store.checkItemsForChange
    // and update  component's data.
    console.log(store.checkItemsForChange);
  }
});

const checked = ref(false);
const attempts = ref(0);
const incrementQuantity = (product) => {
  product.quantity++;
  product.status = "changed";
  console.log(product);
  product.salesman = store.user.name;
};
const decrementQuantity = (product) => {
  product.quantity--;
  product.status = "changed";
  console.log(product);
  product.salesman = store.user.name;
};

const changeProduct = () => {
  console.log(store.productsFromStorage);
  let item = [];

  // Get the items for sell from local storage, if any
  item = JSON.parse(localStorage.getItem("changedProducts")) || [];

  // Add the current items for sell to the beginning of the items array
  item.push(store.checkItemsForChange);

  // Save the new combined array back into local storage

  localStorage.setItem("changedProducts", JSON.stringify(item));
  localStorage.setItem(
    "productsForSell",
    JSON.stringify(store.productsFromStorage)
  );
};
const name = ref("");
const password = ref("");
const login = async () => {
  try {
    const response = await axios.post(`${store.api}/login-user`, {
      name: name.value,
      password: password.value,
    });
    console.log(response.data.message);
    if (response.data.message == "Muvafaqiyatli") {
      // Assuming response.data is an array
      VueCookies.set("user", JSON.stringify(response.data), "10h");
      store.user = response.data;
      console.log(response.data);
      if (response.data.role == "owner") {
        router.push("/admin");
      } else {
        checked.value = true;
      }
    } else {
      if (attempts.value >= 3) {
        VueCookies.remove("user");
        alert(
          "Ko'p martotaba urinishlar qilindi... \n Bosh sahifaga qaytiladi!"
        );
        router.push("auth");
      }
      attempts.value++;

      alert(response.data.message);
    }
  } catch (error) {
    alert("Xatolik");
  }
};
</script>

<template>
  <div class="wrapper">
    <div class="internal-login flex col card mt-md mx-xl" v-if="!checked">
      <div class="title">Ichki tekshiruv</div>
      <label for="name">Ismingiz</label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Ismingiz"
        class="mt-md"
        v-model="name"
      />
      <label for="password">Parol</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Parol"
        class="mt-md"
        v-model="password"
      />
      <button type="button" class="mt-md" @click="login">Tasdiqlash</button>
    </div>

    <div class="products mt-md" v-else>
      <div class="title">Checkni tahrirlash</div>
      <div class="flex justify-center col item-center">
        <div
          class="lists flex between item-center"
          v-for="(product, i) in store.checkItemsForChange"
          :key="i"
        >
          <div class="name">{{ product.name }}</div>
          {{ product.price }} so'm
          <div class="flex item-center">
            <button @click="incrementQuantity(product)" class="large-button">
              <i class="fa-solid fa-plus"></i>
            </button>
            <input type="number" v-model="product.quantity" ref="inputRef" />
            <button @click="decrementQuantity(product)" class="large-button">
              <i class="fa-solid fa-minus"></i>
            </button>
          </div>
          <div class="price">
            {{ Math.ceil(product.price * product.quantity) }} so'm
          </div>
        </div>
        <div class="button">
          <button @click="changeProduct()">Tahrirlash</button>
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

.button {
  width: 95%;
  display: flex;
  justify-content: end;
  margin-top: 20px;
}
</style>
