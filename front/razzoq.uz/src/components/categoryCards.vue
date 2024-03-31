<script setup></script>

<template>
  <div class="">
    <div class="card">
      <div class="card__image">
        <img
          src="https://www.freeiconspng.com/thumbs/coca-cola-png/bottle-coca-cola-png-transparent-2.png"
          alt="image"
          width="100"
          height="150"
          style="object-fit: cover"
        />
      </div>
      <div class="content">
        <div class="card__title">Trendy Cactus Varieties</div>
        <div class="card__sub-title">
          Luctus nec ullamcorper mattis, pulvinar dapibus leo.
        </div>
        <router-link to="/">see more</router-link>
      </div>
    </div>
    <div class="card">
      <div class="card__image">
        <img
          src="https://www.freeiconspng.com/thumbs/coca-cola-png/bottle-coca-cola-png-transparent-2.png"
          alt="image"
          width="100"
          height="150"
          style="object-fit: cover"
        />
      </div>
      <div class="content">
        <div class="card__title">Trendy Cactus Varieties</div>
        <div class="card__sub-title">
          Luctus nec ullamcorper mattis, pulvinar dapibus leo.
        </div>
        <router-link to="/">see more</router-link>
      </div>
    </div>
    <div class="card">
      <div class="card__image">
        <img
          src="https://www.freeiconspng.com/thumbs/coca-cola-png/bottle-coca-cola-png-transparent-2.png"
          alt="image"
          width="100"
          height="150"
          style="object-fit: cover"
        />
      </div>
      <div class="content">
        <div class="card__title">Trendy Cactus Varieties</div>
        <div class="card__sub-title">Luctus nec ullamcorper mattis,</div>
        <router-link to="/">see more</router-link>
      </div>
    </div>
  </div>
</template>
<style scoped>
.card {
  width: 85%;
  height: 300px;
  background-color: rgb(227, 231, 231);
  margin: 0 auto;
  border-radius: 15px;
  padding: 10px 15px;
  box-sizing: border-box;
  text-transform: capitalize;
  margin-top: 30px;
  transition: 1s;
  line-height: 30px;
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
}
.content {
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
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
