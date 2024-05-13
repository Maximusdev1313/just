<script setup></script>

<template>
  <div class="wrapper">
    <div class="contents">
      <div class="sub-content">Razzoq market</div>
      <div class="content">Siz dam oling biz bozorlik qilamiz</div>
      <p>Razzoq Market - Tezkor, bepul va sifatli yetkazib berish...</p>
      <button type="button">Buyurtma berish</button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  height: 350px;
  background-color: aquamarine;
  background-image: url("../assets/scooter_mobile.png");
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: start;
  align-items: center;
  -webkit-border-bottom-right-radius: 15px;
  -webkit-border-bottom-left-radius: 15px;
  -moz-border-radius-bottomright: 15px;
  -moz-border-radius-bottomleft: 15px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
}
.contents {
  margin-left: 20px;
  color: #fff;
  line-height: 40px;
}
.content {
  font-size: 25px;
  width: 60%;
  font-weight: bold;
}
p {
  padding: 0;
  margin: 0;
  width: 65%;
}
button {
  border: none;
  border-radius: 15px;
  padding: 10px 30px;
  background-color: rgb(224, 56, 84);
  color: #fff;
  font-weight: bold;
}
@media only screen and (min-width: 768px) {
  .wrapper {
    height: 600px;
  }
  .contents {
    margin-left: 80px;
    width: 80%;
    line-height: 60px;
  }
  .content {
    font-size: 30px;
  }
}
</style>
