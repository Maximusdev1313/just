<script setup>
import { toRefs } from "vue";
import { useCentralStore } from "../stores/sentralStore";
const store = useCentralStore();
const props = defineProps({
  products: {
    type: Object,
    required: false,
  },
});
const { products } = toRefs(props);
</script>

<template>
  <div class="wrapper">
    <div class="card" v-for="item of products" :key="item.id">
      <div class="card__image" @dblclick="store.addToFavourites(item)">
        <div class="card__heart">
          <i
            class="fa-heart fa-xl"
            style="color: rgb(66, 148, 66)"
            :class="store.checkIsFavourite(item) ? 'fa-solid' : 'fa-regular'"
            @click="store.addToFavourites(item)"
          ></i>
        </div>
        <img
          src="https://www.freeiconspng.com/thumbs/coca-cola-png/bottle-coca-cola-png-transparent-2.png"
          alt="image"
          class="image"
          v-if="item.img"
        />
        <img src="../assets/cart.png" alt="image" class="image" v-else />
      </div>

      <div class="card__category">{{ item.category }}</div>
      <div class="card__title">{{ item.name }}</div>
      <div class="card__price">{{ item.price }} so'm</div>

      <div class="add-button">
        <div class="button text" v-if="item.status == 'no'">Mavjud emas...</div>
        <button class="button" @click="store.addProductToCart(item)" v-else>
          {{ item.quantity > 0 ? item.quantity : "" }}
          <i class="fa-solid fa-cart-shopping icon"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.card {
  width: 150px;
  max-height: 300px;
  background-color: rgb(255, 255, 255);
  margin-bottom: 40px;
  line-height: 27px;
  transition: 2s;
}
.card__image {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(179, 196, 203, 0.365);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.image {
  width: 150px;
  height: 150px;
}
.card__category {
  text-transform: capitalize;
  font-size: small;
  color: rgb(0, 0, 0);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.card__title {
  max-width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 600;
  color: rgb(0, 0, 0);
  text-transform: capitalize;
}
.card__price {
  font-weight: bold;
  color: rgb(0, 0, 0);
  font-size: small;
}
.button {
  width: 100%;
  padding: 5px 10px;
  margin-top: 5px;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.4s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
  background-color: rgb(66, 148, 66);
  color: #fff;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  /* border-radius: 15px; */
}
.icon {
  padding-right: 5px;
  vertical-align: middle;
  fill: currentColor;
}
.text {
  font-size: small;
  text-align: center;
  background-color: rgb(0, 0, 0);
  padding: 0 !important;
}
.card__heart {
  width: 80%;
  display: flex;
  justify-content: end;
}
@media only screen and (min-width: 768px) {
  .card {
    width: 250px;
  }
}
</style>
