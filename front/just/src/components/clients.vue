<script setup>
import { toRefs, watch } from "vue";
import { useCentralStore } from "../stores/centralStore";
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
  <div class="">
    <div class="card" v-if="clients.length">
      <div
        class="client hover"
        v-for="(client, index) in clients"
        :key="index"
        @click="store.getClient(index)"
      >
        <div class="flex between">
          <div class="">{{ index + 1 }}-Mijoz</div>
          <div class="">Soni: {{ client.length }}</div>
        </div>
        <div class="" v-for="cli in client" :key="cli">
          {{ cli.name }}
        </div>
      </div>
    </div>
    <div class="flex around">
      <button
        @click="store.addClient(clients.length)"
        class="ma-md button"
        type="button"
        v-if="!clients.length"
      >
        Qo'shish
      </button>
      <button
        @click="store.createNewClient()"
        class="ma-md button"
        type="button"
        v-if="clients.length"
      >
        Qo'shish
      </button>

      <button
        v-if="clients.length"
        @click="store.deleteClient(store.clientIndex)"
        class="ma-md button"
        type="button"
      >
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.client {
  border-bottom: 1px solid #fff;
  width: 200px;
  height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.card {
  overflow: auto;
  max-height: 400px;
  padding: auto;
}
.button {
  width: 90%;
}
</style>
