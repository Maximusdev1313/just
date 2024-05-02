<script setup>
import { useCentralStore } from "../stores/sentralStore";

const store = useCentralStore();
store.getClientInfo();
</script>

<template>
  <div>
    <div class="wrapper">
      <h3 class="title">Buyurtmangiz qabul qilindi</h3>
      <ul v-if="store.client.length > 0">
        <li class="list" v-for="product in store.client" :key="product">
          <span
            ><span class="name">{{ product.name }} </span> x
            {{ product.quantity }}</span
          >
          <span>{{ product.price * product.quantity }} so'm</span>
        </li>

        <li class="flex justify-between subtotal">
          <span>Yetkazib berish:</span> <span>0 so'm</span>
        </li>
        <li class="flex justify-between subtotal">
          <span>Jami:</span> <span>{{ store.subTotal }} so'm</span>
        </li>
        <li class="flex justify-between time">
          <span>Yetkazib berish taxminiy vaqti:</span> <span>20 daqiqa</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
ul {
  padding: 10px 10px;
  border: 1.3px solid #575353;
}
.list {
  list-style: none;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid grey;
  padding: 10px 0;
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
.name {
  width: 59%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
