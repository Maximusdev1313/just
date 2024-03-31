<script setup>
import { useCentralStore } from "../stores/centralStore";
const store = useCentralStore();
</script>

<template>
  <div class="big-layer" @click="store.cartOpen = false">
    <div class="card" v-if="store.items.length">
      <h5 class="card-header">Mahsulotlar</h5>
      <div class="list col mt-md">
        <div
          class="list-item flex between item-center"
          v-for="item in store?.items"
          :key="item"
          @click="store.addToCart(item)"
        >
          <div class="item-name">
            {{ item.name }}
          </div>
          <div class="item-price ml-md">| {{ item.price }} so'm</div>
        </div>
      </div>
    </div>
    <h2 class="error" v-else>Mahsulot mavjud emas!</h2>
  </div>
</template>
<style scoped>
.list-item {
  border-bottom: 1px solid #fff;
  padding: 5px;
  cursor: pointer;
}
.card {
  width: auto;
  height: 600px;
  overflow: auto;
}
.error {
  width: 300px;
}
</style>
