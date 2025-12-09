import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
const tg = window.Telegram.WebApp;

function applyTelegramColors() {
    const theme = tg.themeParams;

    document.documentElement.style.setProperty('--tg-bg-color', theme.bg_color || '#ffffff');
    document.documentElement.style.setProperty('--tg-text-color', theme.text_color || '#000000ff');
    document.documentElement.style.setProperty('--tg-hint-color', theme.hint_color || '#888888');
    document.documentElement.style.setProperty('--tg-secondary-bg', theme.secondary_bg_color || '#f0f0f0');
}

applyTelegramColors();

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
