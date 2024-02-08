<script setup>
import { ref } from 'vue';
import InputGroup from '../components/forAddProduct/InputGroup.vue';
import Panel from '../components/forAddProduct/Panel.vue';
import ChaneProduct from "../components/forAddProduct/ChaneProduct.vue";

let panel_name = ref('add')
let ChangeName = (event) =>{
    panel_name.value = event
}
</script>

<template>
    <div class="" >
        <Panel @ChangeName = "ChangeName" />
        <InputGroup v-if="panel_name=='add'" />
        <ChaneProduct v-if="panel_name=='change'" />
    </div>
</template>

<style>
input{
	padding: 15px;
	border: 1px solid #ccc;
	border-radius: 3px;
	margin-bottom: 10px;
	width: 100%;
	box-sizing: border-box;
	font-family: montserrat;
	color: #2C3E50;
	font-size: 18px;
}
::placeholder {
  font-size:20px;
}
</style>