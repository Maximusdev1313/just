<script setup>
import { ref } from "vue";
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
const isLoading = ref(false);

function setId() {
  clientId.value = Date.now() + Math.floor(Math.random() * 10000).toString();
  localStorage.setItem("clientId", clientId.value);
}
const postClientInfo = async () => {
  setId();
  try {
    const response = await axios.post(`${store.api}/orders`, {
      clientId: clientId.value,
      name: name.value,
      phone_number: phoneNumber.value,
      address: address.value,
      total_order_price: store.subTotal,
      comment: comment.value,
      location: userLocation.value,
      created: Date.now(),
    });
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
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
      console.log(error.message);
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
const sendOrder = async () => {
  if (!isLoading.value) {
    isLoading.value = true;
    await callLocation();
    await postClientInfo();
    postOrders();
    isLoading.value = false;
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
        v-model="name"
        placeholder="Ismingiz"
      />
      <input
        type="tel"
        name="phoneNumber"
        id="phoneNumber"
        v-model="phoneNumber"
        placeholder="Raqamigiz"
      />
      <input
        type="text"
        name="address"
        id="address"
        v-model="address"
        placeholder="Manzil"
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
        :class="isLoading ? 'disable' : ''"
      >
        <i class="fa-solid fa-spinner fa-spin-pulse" v-if="isLoading"></i>
        Buyurtma berish
      </button>
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
</style>
