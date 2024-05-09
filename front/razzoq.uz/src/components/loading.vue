<script setup></script>

<template>
  <div class="wrapper">
    <div class="loader"></div>
  </div>
</template>
<style scoped>
.wrapper {
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}
.loader {
  width: 100px;
  aspect-ratio: 1;
  display: grid;
}
.loader::before,
.loader::after {
  content: "";
  grid-area: 1/1;
  --c: no-repeat radial-gradient(farthest-side, #064b20 92%, #036e1100);
  background: var(--c) 50% 0, var(--c) 50% 100%, var(--c) 100% 50%,
    var(--c) 0 50%;
  background-size: 12px 12px;
  animation: l12 1s infinite;
}
.loader::before {
  margin: 4px;
  filter: hue-rotate(45deg);
  background-size: 8px 8px;
  animation-timing-function: linear;
}

@keyframes l12 {
  100% {
    transform: rotate(0.5turn);
  }
}
</style>
