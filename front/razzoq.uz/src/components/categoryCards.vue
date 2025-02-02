<script setup>
import { ref } from "vue";
import { useCentralStore } from "../stores/sentralStore";
const store = useCentralStore();

const changeLink = (link) => {
  store.searchName = link;
};
</script>

<template>
  <div class="">
    <div class="card">
      <div class="card__image">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS47HVr-akyCs3vxm2pDD143yO8ApCdsrivVFjZzPxYXw&s"
          alt="image"
          style="object-fit: cover"
        />
      </div>
      <div class="content">
        <div class="card__title">Sevimli ta'm, yangi ko'rinish</div>
        <div class="card__sub-title">"Pepsi" siz dam olish???</div>
        <router-link to="/search" @click="changeLink('pepsi')"
          >Barchasi -></router-link
        >
      </div>
    </div>
    <div class="card">
      <div class="card__image">
        <img
          src="https://pngimg.com/d/flour_PNG11.png"
          alt="image"
          style="object-fit: cover"
        />
      </div>
      <div class="content">
        <div class="card__title">"Un" uchun bozorga borish?</div>
        <div class="card__sub-title">
          Og'ir ko'tarib nima qilasiz? Bizga qo'ying...
        </div>
        <router-link to="/search" @click="changeLink('un')"
          >Barchasi -></router-link
        >
      </div>
    </div>
    <div class="card">
      <div class="card__image">
        <img
          src="https://pngimg.com/d/sunflower_oil_PNG50.png"
          alt="image"
          style="object-fit: cover"
        />
      </div>
      <div class="content">
        <div class="card__title">Yog'lar qimmatlik qilmoqdami?</div>
        <div class="card__sub-title">
          Ro'zg'orga yog' olmasa bo'lmaydi. Bizda bari sifatli va arzon
        </div>
        <router-link to="/search" @click="changeLink('yog\'')"
          >Barchasi -></router-link
        >
      </div>
    </div>
  </div>
</template>
<style scoped>
.card {
  width: 85%;
  height: 400px;
  background-color: rgba(255, 255, 255, 0.365);
  margin: 0 auto;
  border-radius: 15px;
  padding: 10px 15px;
  box-sizing: border-box;
  text-transform: uppercase;
  margin-top: 30px;
  transition: 1s;
  line-height: 30px;
  display: flex;
  /* justify-content: center; */
  flex-wrap: wrap;
  flex-direction: column;
  align-content: space-around;
  -webkit-box-shadow: 2px 1px 18px -11px rgba(186, 186, 186, 1);
  -moz-box-shadow: 2px 1px 18px -11px rgba(186, 186, 186, 1);
  box-shadow: 2px 1px 18px -11px rgba(186, 186, 186, 1);
}
.card:hover {
  -webkit-box-shadow: 10px 11px 72px -11px rgba(186, 186, 186, 1);
  -moz-box-shadow: 10px 11px 72px -11px rgba(186, 186, 186, 1);
  box-shadow: 10px 11px 72px -11px rgba(186, 186, 186, 1);
}
.card__image {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
}
img {
  height: 100%;
  background-color: rgba(255, 255, 255, 0.365);
}
.content {
  height: 50%;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.7rem;
  align-content: space-between;
}
/* .content > div {
  height: 33%;
} */
.card__title {
  font-size: 20px;
  color: rgb(82, 81, 81);
  font-weight: 500;
}
.card__sub-title {
  font-weight: 400;
  font-size: small;
}
a {
  color: red;
  text-transform: uppercase;
  text-decoration: none;
}
</style>
