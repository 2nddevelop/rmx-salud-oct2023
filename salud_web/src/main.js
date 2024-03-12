//import './assets/main.css'
import './assets/index.css';

import { createStore } from 'vuex';
import authModule from './store/modules/authModule';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// --- PivotTable ---
import VuePivottable from 'vue-pivottable'
import 'vue-pivottable/dist/vue-pivottable.css'
// --- PivotTable --- fin

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const store = createStore({
    modules: {
      auth: authModule,
      // Otros módulos de Vuex si los tienes
    },
  });

const app = createApp(App)

app.use(VueToast);
app.use(router)
app.use(store)

// --- PivotTable ---
app.use(VuePivottable)
// --- PivotTable --- fin

app.mount('#app')
