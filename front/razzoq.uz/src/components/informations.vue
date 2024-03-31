<script setup></script>

<template>
  <div>
    <div class="wrapper">
      <div class="icon"><i class="fa-solid fa-truck fa-bounce fa-xl"></i></div>
      <div class="title">title ipsum dolor sit amet</div>
      <div class="sub-title">Lorem ipsum dolor sit amet, consectetur</div>
    </div>
    <div class="wrapper">
      <div class="icon">
        <i class="fa-solid fa-dollar-sign fa-beat fa-xl"></i>
      </div>
      <div class="title">title ipsum dolor sit amet</div>
      <div class="sub-title">Lorem ipsum dolor sit amet, consectetur</div>
    </div>
    <div class="wrapper">
      <div class="icon"><i class="fa-solid fa-rotate fa-spin fa-xl"></i></div>
      <div class="title">title</div>
      <div class="sub-title">Lorem ipsum dolor sit amet, consectetur</div>
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
