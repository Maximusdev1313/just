<script setup>
import { toRefs, watch } from "vue";
import { useCentralStore } from "../stores/centralStore";

import { format } from "date-fns";

const store = useCentralStore();
const props = defineProps({
  clients: {
    type: Array,
    required: false,
  },
});
const { clients, index } = toRefs(props);
</script>

<template>
  <div class="container">
    <div class="mt-xl" v-if="clients.length">
      <div
        class="client hover card mt-xl"
        v-for="(client, index) in clients"
        @contextmenu.prevent="store.deleteClient(index)"
        :key="index"
        @click="store.getClient(index)"
      >
        <div class="flex between">
          <div class="">{{ index + 1 }}-mijoz</div>
          <div class="">Mahsulot soni: {{ client.length }}</div>
        </div>
        <div class="time">Vaqt: {{ store.formatHours(client[0].created) }}</div>
        <div class="devider"></div>
        <div class="" v-for="products in client" :key="products">
          {{ products.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* .client {
  max-height: 160px;
  text-overflow: ellipsis;
  white-space: nowrap;
} */
.card {
  overflow: auto;
  max-height: 175px;
  padding: auto;
  width: 100%;
}
.button {
  width: 90%;
}
</style>
