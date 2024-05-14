<script setup>
import { ref, reactive, computed } from "vue";
import { useCentralStore } from "../stores/sentralStore";
import axios from "axios";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useCentralStore();
const name = ref("");
const phoneNumber = ref("");
const address = ref("");
const comment = ref("");
const clientId = [];
const userLocation = ref(null);

const state = reactive({
  name: "",
  address: "",
  phoneNumber: "",
  isLoading: false,
  errors: [],
});

function setId() {
  clientId.value = Date.now() + Math.floor(Math.random() * 10000).toString();

  store.clientId.unshift(clientId.value);
}

const postClientInfo = async () => {
  try {
    setId();
    const response = await axios.post(`${store.api}/orders`, {
      clientId: clientId.value,
      name: state.name,
      phone_number: state.phoneNumber,
      address: state.address,
      total_order_price: store.subTotal,
      comment: comment.value,
      location: userLocation.value,
      created: Date.now(),
    });
    localStorage.setItem("clientId", JSON.stringify(store.clientId));

    console.log(response.data);
  } catch (error) {
    alert("Iltimos Internet aloqani tekshiring!");
    router.push("/");
    return;
  }
};
const postOrders = async () => {
  for (let product of store.cartItems) {
    try {
      const response = await axios.post(`${store.api}/orders/post-orders`, {
        _id: product._id,
        parent_id: clientId.value,
        name: product.name,
        price: product.price,
        bar_code: product.bar_code,
        entry_price: product.entry_price,
        discount_price: product.discount_price,
        size: product.size,
        quantity: product.quantity,
      });
    } catch (error) {
      alert("Iltimos Internet aloqani tekshiring!");
      return;
    }
  }
};

const options = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 0,
};
const getUserLocation = () => {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          userLocation.value = `https://maps.google.com/maps/dir/40.318214,71.833028/${position.coords.latitude},${position.coords.longitude}/@40.318231,71.833045.17z`;
          resolve(userLocation.value);
        },
        undefined,
        options
      );
    }
  });
};
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function callLocation() {
  try {
    const result = await Promise.race([
      getUserLocation(),
      delay(5000).then(() => {
        throw new Error("Timeout");
      }),
    ]);
    // handle result
    return result;
  } catch (error) {
    // handle error
  }
}

const validateInputs = () => {
  state.errors = [];
  if (!state.name) state.errors.push("Ismingizni kiriting");
  if (!state.phoneNumber.match(/^\d{2}\d{3}\d{2}\d{2}$/))
    state.errors.push("Telefon raqam formati noto'g'ri: ** *** ** **");
  if (!state.address) state.errors.push("Manzilni kiriting");
};

const sendOrder = async () => {
  validateInputs();
  if (state.errors.length === 0 && !state.isLoading) {
    state.isLoading = true;
    await callLocation();
    await postClientInfo();
    await postOrders();
    state.isLoading = false;
    localStorage.removeItem("cart_items");
    store.cartItems = [];
    store.products = [];
    router.push("/wait-room");
  }
};
</script>

<template>
  <div class="wrapper">
    <div class="card">
      <div class="title">Ma'lumotlaringiz:</div>
      <input
        type="text"
        name="name"
        id="name"
        v-model="state.name"
        placeholder="Ismingiz"
        :class="!name && state.errors.length ? 'alert' : ''"
      />
      <input
        type="tel"
        name="phoneNumber"
        id="phoneNumber"
        v-model="state.phoneNumber"
        placeholder="Raqamigiz: 99 999 99 99"
        :class="!phoneNumber && state.errors.length ? 'alert' : ''"
      />
      <input
        type="text"
        name="address"
        id="address"
        v-model="state.address"
        placeholder="Manzil"
        :class="!state.address && state.errors.length ? 'alert' : ''"
      />
      <textarea
        name="comment"
        id="comment"
        cols="39"
        rows="2"
        placeholder="Kommentariy"
        v-model="comment"
      ></textarea>
      <button
        type="button"
        class="button"
        @click="sendOrder"
        :class="state.isLoading ? 'disable' : ''"
      >
        <i class="fa-solid fa-spinner fa-spin-pulse" v-if="state.isLoading"></i>
        Buyurtma berish
      </button>
      <div class="errors" v-for="error in state.errors" :key="error">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  flex-direction: column;
  width: 100%;
  height: auto;
  gap: 15px;
  /* border: 1px solid #ccc; */
  padding: 20px 0;
  margin-top: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
}
input,
textarea {
  width: 80%;
  height: 30px;
  border-radius: 5px;
  border: 1px solid transparent;
  border-bottom: 1px solid #ddd;
}
button {
  width: 80%;
  padding: 10px 0;

  background-color: #1f8222;
  color: white;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  border-radius: 15px;
  font-weight: bold;
}
button:focus {
  border: 1.5px solid #6c27ec;
}
.disable {
  background-color: #828181;
  cursor: not-allowed;
}
.alert::placeholder {
  color: red;
}
.errors {
  width: 80%;
  text-align: left;
  color: red;
}
</style>
