<script setup></script>

<template>
  <div>
    <spline-viewer
      class="wrapper"
      hint
      loading-anim-type="spinner-small-light"
      url="https://prod.spline.design/PDVT9s24vOigG258/scene.splinecode"
    ></spline-viewer>
    <div class="contents">
      <div class="sub-content">Razzoq market</div>
      <div class="content">Siz dam oling biz bozorlik qilamiz</div>
      <button type="button">Buyurtma berish</button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  height: 400px;
  background-color: aquamarine;
  /* background-image: url("../assets/heroImage.png");
  background-size: cover;
  background-repeat: no-repeat; */
  -webkit-border-bottom-right-radius: 15px;
  -webkit-border-bottom-left-radius: 15px;
  -moz-border-radius-bottomright: 15px;
  -moz-border-radius-bottomleft: 15px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  position: absolute;
  top: 0;
  left: 0;
}
.contents {
  margin-top: 20px;
  margin-left: 20px;
  position: relative;
  color: #fff;
}
.content {
  font-size: 25px;
  width: 60%;
  padding: 20px 0;
  font-weight: bold;
}
button {
  border: none;
  border-radius: 15px;
  padding: 10px 30px;
  background-color: rgb(224, 56, 84);
  color: #fff;
  font-weight: bold;
}
</style>
