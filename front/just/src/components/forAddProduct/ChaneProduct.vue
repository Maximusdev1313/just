<script setup>
import { ref } from 'vue'
import { useCentralStore } from "../../stores/centralStore"
import ProductTable from './ProductTable.vue';
const store = useCentralStore()

let name = ref()
let bar_code = ref()

let Search = () =>{
    store.filterProductsByName(name.value)
}
</script>

<template>
    <div class="w-100 flex justify-center wrap">
        <div class="w-100 text-center ">
            <h3> Maxsulot Ma'lumotlarini taxrirlash </h3>
        </div>
        <div class="w-100 form flex justify-center wrap ">
            <input v-model="name" placeholder="Nomi" >
            <input v-model="bar_code" placeholder="Bar Kodi" >
            <button @click="Search()" > Qidirish  </button>
        </div>
        
        <ProductTable/>
        
    </div>
</template>

<style  scoped>

.form{
    width: 60%;
}
button{
    padding: 10px 40px 10px 40px ;
    background: rgb(130, 206, 245);
    font-size: 18px;
    color: white;
}
</style>