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
    <button
      @click="store.addClient(clients.length)"
      class="ma-md"
      type="button"
    >
      add
    </button>

    <div class="card">
      <div
        class="client hover"
        v-for="(client, index) in clients"
        :key="index"
        @click="store.getClients(index)"
      >
        {{ index + 1 }}-Mijoz
        <div class="" v-for="cli in client" :key="cli">
          {{ cli.name }}
        </div>
      </div>
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
</style>
