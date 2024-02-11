<script setup>
import { computed, toRefs, watch } from "vue";
import { useCentralStore } from "../stores/centralStore";
import { format } from "date-fns";

const store = useCentralStore();
const props = defineProps({
  orders: {
    type: Array,
    required: false,
  },
  index: {
    type: Number,
    required: false,
  },
});
const { orders, index } = toRefs(props);

const grandToTalSum = computed(() => {
  return orders.value.reduce((sum, item) => sum + item?.totalSum, 0);
});

const printElement = (elementId) => {
  const printContent = document.getElementById(elementId).innerHTML;
  // Get all stylesheets HTML
  let stylesHtml = "";
  for (const node of [
    ...document.querySelectorAll('link[rel="stylesheet"], style'),
  ]) {
    stylesHtml += node.outerHTML;
  }
  const originalContent = document.body.innerHTML;

  // Include the styles in the print content
  document.body.innerHTML = stylesHtml + printContent;

  window.print();

  document.body.innerHTML = originalContent;

  // You may want to comment out the next two lines if you don't want to reload and close the window after printing
  window.location.reload(); // Reload the page after printing
  // window.close();
};

const formatHours = (dateString) => {
  const date = new Date(dateString);
  return format(date, "MM-dd/HH:mm");
};
</script>
<template>
  <div>
    <div :id="`printElement${index}`" style="width: 208px">
      <div class="list">
        <div class="title logo">Razzoq</div>
        <div class="subtitle text-center">
          Arzon, sifatli va bepul yetkazib berish
        </div>
        <div class="date">
          {{ formatHours(orders[0].created) }}
        </div>
        <div class="wrapper">
          <div
            class="item flex justify-between items-center no-wrap"
            v-for="order in orders"
            :key="order"
          >
            <div class="item-name">{{ order.name }}</div>
            <div class="item-counts">
              <div class="item-quantity">
                {{ order.quantity }} {{ order.size }} &bull;
              </div>
              <div class="item-price">{{ order.price }}</div>
              <div class="item-total">
                &bullet;

                {{ order.quantity * order.price }} so'm
              </div>
            </div>
          </div>
          <div class="total flex justify-around mt-md">
            <span>Umumiy: {{ grandToTalSum }} so'm</span>
          </div>
        </div>

        <div class="subtitle text-black text-center q-my-sm">
          Xizmatimizdan foydalanganingiz uchun rahmat!
        </div>
        <div class="tel">Tel: 95 091 2123, 95 643 2123</div>
        <div class="">Saytimiz: razzoq.uz</div>
      </div>
    </div>
    <button
      @click="() => printElement(`printElement${index}`)"
      type="button"
      class="mb-md"
    >
      print
    </button>
  </div>
</template>
<style scoped>
.date {
  width: 100%;
  text-align: right;
  margin: 5px;
}
.logo {
  font-family: "Merriweather", sans-serif;
  font-size: medium;
  text-align: center;
}
.list {
  border: 1px solid #000000;
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
}
.item {
  border-bottom: 1px dotted #000;
}
.item-name {
  max-width: 40%;
}
.item-counts {
  width: 60%;
  display: flex;
  justify-content: right;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
}
.wrapper {
  min-height: 100px;
}
button {
  width: 200px;
}
.total {
  margin-top: 25px;
}
</style>
