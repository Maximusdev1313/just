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
    <div class="card" v-for="item of products" :key="item">
      <div class="card__image" v-if="item.img">
        <img
          src="https://www.freeiconspng.com/thumbs/coca-cola-png/bottle-coca-cola-png-transparent-2.png"
          alt="image"
          class="image"
        />
      </div>
      <div class="card__image" v-else>
        <img src="../assets/cart.png" alt="image" class="image" />
      </div>
      <div class="card__category">{{ item.category }}</div>
      <div class="card__title">{{ item.name.toUpperCase() }}</div>
      <div class="card__price">{{ item.price }} so'm</div>

      <div class="add-button">
        <button class="button" @click="store.addProductToCart(item)">
          {{ item.quantity > 0 ? item.quantity : "" }}
          <i class="fa-solid fa-cart-shopping icon"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 85%;
  margin: 0 auto;
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
}
.card__image {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  color: rgb(151, 150, 150);
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
  color: rgb(78, 78, 79);
}
.card__price {
  font-weight: bold;
  color: grey;
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
@media only screen and (min-width: 768px) {
  .card {
    width: 250px;
  }
}
</style>
