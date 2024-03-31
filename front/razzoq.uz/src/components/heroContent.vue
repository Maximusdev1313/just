<script setup></script>

<template>
  <div class="wrapper">
    <div class="contents">
      <div class="sub-content">Best quality plants</div>
      <div class="content">Amazing Variety Of Plants Starting Just $6</div>
      <button type="button">Shop now</button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  height: 400px;
  background-color: aquamarine;
  background-image: url("../assets/heroImage.png");
  background-size: cover;
  background-repeat: no-repeat;
  -webkit-border-bottom-right-radius: 15px;
  -webkit-border-bottom-left-radius: 15px;
  -moz-border-radius-bottomright: 15px;
  -moz-border-radius-bottomleft: 15px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  display: flex;
  justify-content: start;
  align-items: center;
}
.contents {
  margin-left: 20px;

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
  background-color: rgb(236, 98, 121);
  color: #fff;
  font-weight: bold;
}
</style>
