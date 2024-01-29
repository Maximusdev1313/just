<script setup>
import {ref} from 'vue'
import { useCentralStore } from '../../stores/centralStore'
const store = useCentralStore()
const name = ref()
const bar_code = ref()

</script>

<template>
    <div>
        {{ store.api }}
    </div>
</template>



<style lang="scss" scoped>

</style>