<script setup>
import { useRouter } from "vue-router";
import { useCentralStore } from "../stores/centralStore";
import axios from "axios";
const store = useCentralStore();
const router = useRouter();
store.getOrders();
const patchOrder = async (clientId) => {
  console.log(clientId, "iud");
  try {
    const response = await axios.patch(
      `${store.api}/orders/${clientId}`,
      {
        status: "delivering",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
};

const accept = async (client) => {
  store.itemsForSell = [];
  store.itemsForSell = client.orders;
  console.log(client, "client");
  if (client.status == "waiting") {
    await patchOrder(client.clientId);
  }
  router.push("/");

  console.log(store.itemsForSell);
};
</script>

<template>
  <div>
    <div class="title">Buyurtmalar</div>
    <ul>
      <li v-for="client in store.orders" :key="client" class="lists">
        <div class="wrapper">
          <div class="client-id title">
            <span>Id: </span>
            <span>{{ client.clientId?.split("").splice(-5).join("") }}</span>
          </div>
          <div class="info">
            <div class="client-status">
              <span class="title">Status: </span>
              <span class="title">{{
                client.status == "waiting"
                  ? "Yangi"
                  : client.status == "delivering"
                  ? "Qabul qilindi"
                  : ""
              }}</span>
            </div>
            <div class="client-name">
              <span>Mijoz nomi:</span> <span>{{ client.name }}</span>
            </div>
            <div class="client-phone-number">
              <span>Raqam:</span> <span>{{ client.phone_number }}</span>
            </div>
            <div class="client-comment">
              <span>Comment:</span> <span>{{ client.comment }}</span>
            </div>
          </div>

          <div class="locations">
            <div class="client-address">
              <span>Manzil: </span> <span>{{ client.address }}</span>
            </div>
            <div class="client-address">
              <span>Vaqt: </span>
              <span>{{ store.formatHours(client.created) }}</span>
            </div>
            <div class="client-location">
              <span>Manzil: </span>
              <a :href="client.location" target="_blank">Locatsiya</a>
            </div>
            <div class="client-total-price">
              <span>Summa: </span>
              <span>{{ client.total_order_price }} so'm</span>
            </div>
          </div>
        </div>

        <div class="devider"></div>
        <div class="products" v-for="product in client.orders" :key="product">
          <div class="product-name">
            {{ product.name }}
          </div>
          <div class="product__price">{{ product.price }} so'm</div>
          x
          <div class="product__quantity">
            {{ product.quantity }} {{ product.size }}
          </div>
          <div class="product__total-price">
            {{ product.price * product.quantity }} so'm
          </div>
        </div>
        <button type="button" class="btn" @click="accept(client)">
          Qabul qilish
        </button>
      </li>
    </ul>
  </div>
</template>
<style scoped>
ul {
  text-decoration: none;
  list-style: none;

  padding: 10px;
  margin: 10px;
}
.lists {
  border: 1px solid #fff;
  margin-top: 10px;

  padding: 0 20px;
  flex-wrap: wrap;
}
.wrapper {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.client-id {
  width: 100%;
  text-align: center;
}
.devider {
  width: 100%;
  border: 1px solid #fff;
}
.products {
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #fff;
  padding: 20px 0;
}
.products > * {
  width: 20%;
}
.product__total-price {
  text-align: right;
}
.btn {
  margin: 20px 0;
}
</style>
