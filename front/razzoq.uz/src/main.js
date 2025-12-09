import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
const tg = window.Telegram.WebApp;



function applyMode() {
    const mode = tg.colorScheme; // "light" or "dark"

    document.documentElement.classList.remove("tg-light", "tg-dark");
    document.documentElement.classList.add(`tg-${mode}`);
}

applyMode();

// If user switches theme in Telegram while your app is open
tg.onEvent("themeChanged", applyMode);


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
