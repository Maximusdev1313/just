<script setup>
import { ref, onMounted} from "vue";
import { useCentralStore } from "../stores/centralStore";

import searchInputs from "../components/searchInputs.vue";
import productsForChoosing from "../components/productsForChoosing.vue";
import productsList from "../components/productsList.vue";
import check from "../components/check.vue";
import clients from "../components/clients.vue";
import loader from "../components/loader.vue";
import dialogMenu from "../components/dialogMenu.vue";
import outlayForm from "../components/inputsForOutlays.vue";
import sound from "../assets/notification.mp3";
const store = useCentralStore();
const isActive = ref(false);
const isOutlay = ref(false);
const newMassage = ref(false);

// const isMuted = ref(
//   sessionStorage.getItem("isMuted") === "true" ? true : false
// );

const playSound = () => {
  console.log("run");
  console.log(sound);
  const audio = new Audio(sound);
  audio.play();
};
let userHasInteracted = false;

window.addEventListener("click", () => {
  if (store.orders.length) {
    userHasInteracted = true;
    console.log("eter");
  }
});

const unmute = () => {
  if (userHasInteracted) {
    playSound();
  }
};

async function connect() {
  console.log("connn");
  // const clientChannel = pusher.subscribe("my-channel");
  // clientChannel.bind("my-event", (data) => {
  //   console.log(data, "data");
  //   store.addOrders(data.clientData);
  // });

  await store.getOrders();
  const filteredItem = store.orders.filter((item) => item.status == "waiting");
  console.log(filteredItem);
  if (filteredItem.length) {
    unmute();
    newMassage.value = true;
  }
}

onMounted(() => {
  connect();
});

setInterval(() => {
  connect();
}, 20000);

// watch(
//   () => store.orders.length,
//   function () {
//     if (userHasInteracted && store.orders.length) {
//       unmute();
//       newMassage.value = true;
//     }
//     console.log("watch");
//   }
// );

// const connect = async () => {
//   if ("serial" in navigator) {
//     try {
//       const port = await navigator.serial.requestPort();
//       await port.open({ baudRate: 9600 });

//       reader = port.readable.getReader();
//       while (true) {
//         const { value, done } = await reader.read();
//         if (done) {
//           reader.releaseLock();
//           break;
//         }
//         // Assuming the scale returns text data
//         data.value = new TextDecoder().decode(value);
//       }
//     } catch (err) {
//       console.error("There was an error opening the serial port:", err);
//     }
//   } else {
//     console.error("Web Serial API not supported");
//   }
// };

// onUnmounted(() => {
//   if (reader) {
//     reader.releaseLock();
//   }
// });
// onUnmounted(() => {
//   if (reader) {
//     reader.releaseLock();
//   }
// });

const postSoldProducts = async () => {
  if (store.productsFromStorage.length) {
    isActive.value = true;
    for (let product of store.productsFromStorage) {
      await store.postProducts(product, "sold-products");
      await store.decrementQuantityFromStore(product);
    }
    store.itemForShow = null;

    isActive.value = false;
    localStorage.removeItem("productsForSell");
    location.reload();
  }
};
</script>
<template>
  <div class="container">
    <div class="wrapper">
      <aside class="mode">
        <div class="drawer-wrapper">
          <div class="drawer">
            <div class="content">
              <button
                @click="store.addClient(clients.length)"
                class="button"
                type="button"
                v-if="!clients.length"
              >
                <i class="fas fa-plus"></i>
                Yangi mijoz qo'shish
              </button>
              <button
                @click="store.createNewClient()"
                class="button"
                type="button"
                v-else
              >
                <i class="fas fa-plus"></i>
                Yangi mijoz qo'shish
              </button>
              <clients :clients="store.clients" />
            </div>
          </div>
        </div>
      </aside>
      <div class="functional-section">
        <div class="search-inputs">
          <searchInputs />

          <productsForChoosing v-if="store.cartOpen" />

          <div class="devider"></div>

          <productsList />
        </div>
      </div>

      <aside class="mode">
        <div class="drawer-wrapper">
          <div class="drawer">
            <check
              v-for="(products, index) in store.productsFromStorage"
              :key="index"
              :orders="products"
              :index="index"
            />
          </div>
        </div>
      </aside>
    </div>

    <dialog-menu
      :content="'salom'"
      :isActive="isOutlay"
      v-if="isOutlay"
      @close="isOutlay = false"
    >
      <outlayForm @close="isOutlay = false" />
    </dialog-menu>

    <footer class="flex between item-center mode">
      <button @click="store.getProductsFromServer()" v-if="!store.loading">
        <i class="fa-solid fa-download"></i> Mahsulot olish
      </button>
      <loader v-else />
      <router-link to="/report" target="_blank"
        ><button>
          <i class="fas fa-chart-simple"></i> Hisobot
        </button></router-link
      >
      <button @click="postSoldProducts" v-if="!isActive">
        <i class="fa-solid fa-cloud-arrow-up"></i>
        Hisobot olish
      </button>
      <loader v-else />
      <router-link to="/orders">
        <button>
          <i class="fa-solid fa-box box-icon" v-if="newMassage"></i>
          Buyurtma
        </button>
      </router-link>
      <router-link
        to="/notadded"
        v-if="store.notAdded.length || store.notPatched.length"
        ><button>
          {{ store.notAdded.length || store.notPatched.length }} Kiritilmagan
          mahsulotlar
        </button></router-link
      >
      <button @click="(isOutlay = true), (store.otherComponentOpened = true)">
        Chiqimlar
      </button>
      <router-link to="/auth"
        ><button>
          <i class="fa-solid fa-arrow-right-from-bracket"></i> Chiqish
        </button></router-link
      >
    </footer>
  </div>
</template>
<style scoped>
.wrapper {
  width: 100%;
  max-height: 92vh;
  min-height: 50vh;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

aside {
  width: 20%;
  height: 92vh;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.content > * {
  width: 100%;
}

.drawer-wrapper {
  max-height: 90vh;
  overflow: hidden;
}

.drawer {
  max-height: 90vh;
  overflow-y: scroll;
  padding: 0;
  margin-right: -17px; /* Increase this value for wider scrollbars */
}
.functional-section {
  width: 60%;
}
.button {
  background-color: #3d48ee;
  margin-top: 10px;
  color: #fff;
}
.total {
  font-weight: bold;
  padding: 0 20px;
}
footer {
  width: 100%;
  height: 64px;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 3;
}
.box-icon {
  color: red;
}
</style>
