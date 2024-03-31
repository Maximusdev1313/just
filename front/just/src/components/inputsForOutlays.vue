<script setup>
import axios from "axios";
import { ref } from "vue";
import { useCentralStore } from "../stores/centralStore";
const store = useCentralStore();

const outlayType = ref("internal");
const amount = ref();
const comment = ref("");

const createOutlay = async () => {
  try {
    const request = await axios.post(store.api + "/outlays", {
      status: outlayType.value,
      price: parseFloat(amount.value),
      description: comment.value,
      market_name: store.user.market_name,
      salesman: store.user.name,
    });
    alert("Muvaffaqiyatli qo'shildi!");
    amount.value = "";
    comment.value = "";
  } catch (error) {
    alert("Muammo mavjud. Qayta urunib ko'ring ");
    console.log(error.message);
  }
};
</script>

<template>
  <div class="card flex item-center col">
    <div class="title">Chiqim</div>
    <form class="flex">
      <label class="form-control">
        <input
          type="radio"
          name="internal"
          id="internal"
          value="internal"
          v-model="outlayType"
          checked="checked"
        />
        Ichki
      </label>

      <label class="form-control">
        <input
          type="radio"
          name="for_agent"
          id="for_agent"
          value="for_agent"
          v-model="outlayType"
        />
        Agent uchun
      </label>
      <label class="form-control">
        <input
          type="radio"
          name="for_market"
          id="for_market"
          value="for_market"
          v-model="outlayType"
        />
        Bozorlik
      </label>
    </form>
    <label for="amount" class="mt-md">Miqdori:</label>
    <input type="number" name="amount" id="amount" v-model="amount" />
    <label for="comment">Comment:</label>
    <textarea type="text" name="comment" id="comment" v-model="comment" />
    <div class="button-group">
      <button class="cancel" @click="$emit('close')">
        Bekor qilish<i class="fas fa-cancel ml-md"></i>
      </button>
      <button class="submit" @click="createOutlay">
        Kiritish<i class="fas fa-plus ml-md"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.card {
  padding-bottom: 10px;
}
form {
  display: flex;
  justify-content: space-between;
  align-items: end;
}

.form-control {
  font-family: system-ui, sans-serif;
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 1.1;
  margin-left: 15px;
  display: grid;
  grid-template-columns: 1em auto;
  gap: 0.5em;
}

.form-control:focus-within {
  color: #fff;
}

input[type="radio"] {
  /* Add if not using autoprefixer */
  -webkit-appearance: none;
  /* Remove most all native input styles */
  appearance: none;
  /* For iOS < 15 */
  background-color: var(--form-background);
  /* Not removed via appearance */
  margin: 0;

  font: inherit;
  color: red;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid red;
  border-radius: 50%;
  transform: translateY(-0.075em);

  display: grid;
  place-content: center;
}

input[type="radio"]::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  border-radius: 50%;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--form-control-color);
  /* Windows High Contrast Mode */
  background-color: red;
}

input[type="radio"]:checked::before {
  transform: scale(1);
}

input[type="radio"]:focus {
  outline: max(2px, 0.15em) solid red;
  outline-offset: max(2px, 0.15em);
}

.button-group {
  margin-top: 30px;
  width: 100%;
  text-align: right;
}
button {
  margin-left: 15px;
}
.cancel {
  background-color: #f09090;
}
.submit {
  background-color: #464ff3;
}
</style>
