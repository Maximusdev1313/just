<script setup>
import { toRefs, ref } from "vue";
const props = defineProps({
  content: {
    type: String,
    required: false,
  },
});
const { content } = toRefs(props);
</script>
<template>
  <div class="big-layer" @dblclick="$emit('close')">
    <slot></slot>
  </div>
</template>
