<script setup></script>

<template>
  <div>
    <div class="wrapper">
      <div class="icon"><i class="fa-solid fa-truck fa-bounce fa-xl"></i></div>
      <div class="title">"Tezkor yetkazib berish"</div>
      <div class="sub-title">
        Buyurtmangiz 20-daqiqa ichida yetkazib beriladi
      </div>
    </div>
    <div class="wrapper">
      <div class="icon">
        <i class="fa-solid fa-dollar-sign fa-beat fa-xl"></i>
      </div>
      <div class="title">Bepul yetkazib berish</div>
      <div class="sub-title">Hech qanday shartlarsiz yetkazib berish</div>
    </div>
    <div class="wrapper">
      <div class="icon"><i class="fa-solid fa-rotate fa-spin fa-xl"></i></div>
      <div class="title">Mahsulotni almashtirish imkoniyati</div>
      <div class="sub-title">Sizga ma'qul kelmasa almashtirish mumkin</div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.icon {
  color: green;
  z-index: -1;
}

.title {
  font-size: larger;
  font-weight: 500;
}
.sub-title {
  font-size: small;

  color: grey;
}
</style>
