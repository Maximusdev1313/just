
<script setup>
import { computed, toRefs, ref } from "vue";
import { useCentralStore } from "../stores/centralStore";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useCentralStore();
const props = defineProps({
  orders: {
    type: Object,
    required: false,
  },
  index: {
    type: Number,
    required: false,
  },
});
const { orders, index } = toRefs(props);

const grandToTalSum = computed(() => {
  console.log(orders.value);
  return orders.value?.reduce((sum, item) => sum + item?.totalSum, 0);
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
  document.body.innerHTML =  printContent;

  window.print();

  document.body.innerHTML = originalContent;

  // You may want to comment out the next two lines if you don't want to reload and close the window after printing
  window.location.reload(); // Reload the page after printing
  // window.close();
};
const changeCheck = (order) => {
  store.checkItemsForChange = [...order];
  console.log(order);
  router.push({ path: "/changeCheck" });
};
</script>
<template>
  <div class="flex col item-center">
    <div
      :id="`printElement${index}`"
      style="width: 80%"
      class="mt-md check"
      @dblclick="changeCheck(orders)"
    >
      <div class="list">
        <div class="date">
          <span>
            {{ orders[0]?.salesman }}
          </span>
          <span>
            {{ store.formatHours(orders[0]?.created) }}
          </span>
        </div>
        <div class="title logo">{{ store.user.market_name }}</div>

        <div class="wrapper items">
          <div
            class="item flex justify-between items-center no-wrap"
            :class="order.status == 'changed' ? 'red' : ''"
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
          <div class="w-100 flex around mt-md">
              <span>
              Umumiy:
            </span>
            <span>
              {{ grandToTalSum }} so'm
            </span>
          </div>
          <div class="w-100 flex item-center justify-center">

            ****************************
          </div>
          <div class="total  mt-md">
            <div class="paid_type flex between">To'lov turi: <div>

              {{ 
            orders[0].status == 'cash' ? 'Naqt' : 
            orders[0].status == 'by_card' ? 'Karta orqali' : 
            orders[0].status == 'dept' ? 'Qarz' : ''
          }}
          </div>
          </div>
            
          <div class="" v-if="orders[0]?.clientName">

            <div class="w-100 flex between  " >
              <span>Mijoz ismi: </span>
              <span>{{ orders[0]?.clientName }}</span>
            </div>
            <div class="w-100 flex between">
              <span>Mijoz raqami: </span>
              <span>{{ orders[0]?.clientNumber}}</span>
            </div>
            <div class="w-100 flex between wrap">
              <span>Manzil: </span> 
              <span> {{ orders[0]?.clientAddress}}</span>
            </div>
          </div>
          </div>
        </div>
        <div class="qr-code">

          <img src="../assets/qr-code.svg" alt="qr-code" width="200" height="200" >
        </div>

        <div class="subtitle text-black text-center mt-md q-my-sm">
          Xizmatimizdan foydalanganingiz uchun rahmat!
        </div>
        <div class="tel mt-md">Tel: {{ store.user.phone_number }}</div>
        <div class="">Saytimiz: razzoq.uz</div>
      </div>
    </div>
    <button
      @click="() => printElement(`printElement${index}`)"
      type="button"
      class="mb-md enable"
    >
      Chop etish
    </button>
  </div>
</template>
<style scoped>
.check{
  width: 80%;
}

.date {
  width: 100%;
  margin: 5px;
  font-size: 10px;
  display: flex;
  justify-content: space-between;
  text-transform: uppercase;
}
.logo {
  font-family: "Merriweather", sans-serif;
  font-size: medium;
  text-align: center;
}
.list {
  border: 1px solid #000000;
  padding: 10px;
  font-size: medium;
  font-weight: normal;
 
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
  width: 80%;
  margin-top: 5px;
}
.total {
  margin-top: 25px;
}
.red {
  color: red;
}
.qr-code{
  display: none;
}
.subtitle{
  display: none;
}
.tel{
  display: none;
}
.paid_type{
  width: 100%;

}
@media print {
  .logo{
    font-size: 24px;
    font-weight: bolder;
  }
  .list {
    border: none;
    border-bottom: 3px solid #000;
    color: black !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    font-size: 20px;
    font-weight: bold;
  }
  .items>*{
    margin-top: 20px;
  }
  .red {
    color: black !important;
  }
  .list>*{
  padding: 10px 0;

}
  .qr-code{
    width: 100%;
    display: flex;
    margin: 20px 0;
    justify-content: center;
    align-items: center;
  }
  /* .tel{
    margin-bottom: 20px;
  } */
  .tel,.subtitle{
    display: block;
  }
}
</style>
