<script setup>
import { ref } from "vue";
import { removeBackground } from "@imgly/background-removal";
import { useCentralStore } from "../../stores/centralStore";
const store = useCentralStore();
const original = ref(null);
const result = ref(null);
const isLoading = ref(false);
const onFile = async (e) => {
  result.value = null;
  isLoading.value = true;
  const file = e.target.files[0];
  if (!file) return;

  original.value = URL.createObjectURL(file);

  try {
    // ⬅ PASS FILE DIRECTLY (important!)
    const outputBlob = await removeBackground(file);

    result.value = URL.createObjectURL(outputBlob);
    store.removedBgImage = new File([outputBlob], "product.png", {
      type: "image/png",
    });

    console.log(result.value);
  } catch (error) {
    console.error("Background removal error:", error);
    alert("Error removing background");
  }
  isLoading.value = false;
};
</script>

<template>
  <div class="remove-bg">
    <div class="input">
      <h3>Removing background...</h3>
      <input type="file" @change="onFile" />
    </div>
    <div class="container">
      <div v-if="original">
        <h3>Original</h3>
        <img :src="original" style="width: 200px" />
      </div>
      <div class="">
        <div v-if="isLoading">
          <div><i class="fa-solid fa-spinner fa-spin-pulse"></i></div>
        </div>
        <div v-if="result">
          <h3>Result</h3>
          <img :src="result" style="width: 200px" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.remove-bg {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
