<script setup>
import { useCentralStore } from "../stores/sentralStore";
import { toRefs } from "vue";

const store = useCentralStore();
const props = defineProps({
  products: {
    type: Object,
    required: false,
  },
});
const { products } = toRefs(props);
</script>

<template>
  <div>
    <li class="list" v-for="product in products" :key="product">
      <span
        ><span class="name">{{ product.name }} </span> x
        {{ product.quantity }}</span
      >
      <span>{{ product.price * product.quantity }} so'm</span>
    </li>
  </div>
</template>
<style scoped>
.list {
  list-style: none;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid grey;
  padding: 10px 0;
}

.name {
  width: 59%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
