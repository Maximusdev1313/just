<script setup></script>

<template>
  <input type="text" name="search" id="search" placeholder="Qidiruv" />
</template>

<style scoped>
input {
  width: 90%;
  height: 80%;
  border-radius: 15px;
  border: none;
  color: grey;
  /* box-shadow: 5px 4px 38px -4px rgba(0, 0, 0, 0.55);
  -webkit-box-shadow: 5px 4px 38px -4px rgba(0, 0, 0, 0.55);
  -moz-box-shadow: 5px 4px 38px -4px rgba(0, 0, 0, 0.55); */
}
input::placeholder {
  padding-left: 10px;
  font-size: large;
}
input:focus {
  border: none;
  font-size: large;
  color: black;
}
</style>
