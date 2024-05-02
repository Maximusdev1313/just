<script setup>
import { useCentralStore } from "../stores/sentralStore";
const store = useCentralStore();
</script>

<template>
  <div class="wrapper">
    <router-link to="/" active-class="active" class="nav-link">
      <div class="round">
        <div class="round2"><i class="fa-solid fa-home fa-xl"></i></div>
      </div>
    </router-link>
    <router-link to="/cart" active-class="active" class="nav-link">
      <div class="round">
        <div class="round2">
          <i class="fa-solid fa-cart-shopping fa-xl icon"></i>
          <div class="item-quantity">
            {{ store.subTotal }}
          </div>
        </div>
      </div>
    </router-link>
    <router-link to="/about" active-class="active" class="nav-link">
      <div class="round">
        <div class="round2">
          <i class="fa-solid fa-heart fa-xl"></i>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.wrapper {
  width: 90%;
  margin: 0 auto;
  height: 60px;
  border-radius: 15px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #f6f6f6d8;
}
.nav-link {
  text-decoration: none;
  color: dark;
  width: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.active {
  color: #fd0404;
  transition: 0.5s;
}

.active > .round {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  color: #fff;
  background-color: #f6f6f6d8;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
}
.active > .round > .round2 {
  background-color: green;
  width: 50px;
  height: 50px;
  color: #fff;
  transition: 0.5s;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.active > .round > .round2 > i {
  color: #fff;
}
i {
  color: #274c14;
}
.round2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.item-quantity {
  font-size: small;
  margin-top: 10px;
  color: #0f9f11;
  font-weight: bold;
}
.icon {
  margin-top: 10px;
}
</style>
