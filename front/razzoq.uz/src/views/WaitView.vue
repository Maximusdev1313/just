<script setup>
import { onMounted, onUnmounted, watch } from "vue";
import { useCentralStore } from "../stores/sentralStore";
import pusher from "../pusher";
import loader from "../components/loading.vue";
import orderList from "../components/orderList.vue";
const store = useCentralStore();
function connect() {
  console.log("connn");
  const channel = pusher.subscribe("my-channel");
  channel.bind("client-updated", (data) => {
    console.log(data);
    updateClient(data);
  });
}

function updateClient(data) {
  // Find the client in the client array using the client ID
  let clientIndex = store.client.findIndex((c) => c._id === data._id);
  console.log("ish");
  // If the client is found, update it
  if (clientIndex !== -1) {
    store.client[clientIndex].status = data.status;
    console.log(store.client[clientIndex]);
  }
}
onMounted(() => {
  store.getClientInfo();
  connect();
});

onUnmounted(() => {
  store.client = [];
});
</script>

<template>
  <div>
    <!-- Loading -->
    <loader v-if="!store.client.length" />
    <div class="wrapper" v-else>
      <div class="title">Buyurtmalar</div>
      <div class="wrapper">
        <ul v-for="client in store.client" :key="client">
          <h3 class="title">
            {{
              client.status == "waiting"
                ? "Buyurtma berildi"
                : client.status == "delivering"
                ? "Buyurtmangiz yetkazib berishda"
                : "Buyurtma yopilgan"
            }}
          </h3>
          <li class="list title">
            <span>Buyurtmachi:</span> <span>{{ client.name }}</span>
          </li>
          <li class="list">
            <span>Mobil raqam:</span> <span>{{ client.phone_number }}</span>
          </li>
          <li class="list">
            <span>Manzil:</span> <span>{{ client.address }}</span>
          </li>
          <div class="devider"></div>
          <order-list :products="client.orders" />
          <li class="list subtotal">
            <span>Yetkazib berish:</span> <span>0 so'm</span>
          </li>
          <li class="list subtotal">
            <span>Jami:</span>
            <span>{{ client.total_order_price }} so'm</span>
          </li>
          <li class="list time">
            <span>Yetkazib berish taxminiy vaqti:</span> <span>20 daqiqa</span>
          </li>
        </ul>
        <loader v-if="store.isLoading" />
      </div>
    </div>
    <div class="spacer"></div>
  </div>
</template>
<style scoped>
.title {
  font-size: larger;
  font-weight: bolder;
  text-align: center;
  margin: 10px 0;
}
ul {
  padding: 10px 10px;
  border: 1.3px solid #575353;
}
.subtotal {
  font-size: large;
  font-weight: bold;
  color: rgb(80, 79, 79);
  margin-top: 10px;
}
.time {
  font-size: small;
}
.spacer {
  height: 100px;
}
.list {
  display: flex;
  justify-content: space-between;
}
.devider {
  width: 100%;
  border: 1px solid grey;
  margin: 10px 0;
}
</style>
