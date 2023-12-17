import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

// vuex
import { ref } from "vue";
import { useStore } from 'vuex';
//const store = useStore();
//const globalLogged = ref(store.state.globalLogged);

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/folder/:id',
    component: () => import ('@/views/FolderPage.vue')
  },
  {
    path: '/home',
    component: () => import ('@/views/Home.vue')
  },
  {
    path: '/principales/derivacion',
    component: () => import ('@/views/principales/Derivacion.vue')
  },
  {
    path: '/varios/avisos',
    component: () => import ('@/views/varios/Avisos.vue')
  },
  {
    path: '/varios/noticias',
    component: () => import ('@/views/varios/Noticias.vue')
  },
  {
    path: '/varios/normativa',
    component: () => import ('@/views/varios/Normativa.vue')
  },
  {
    path: '/adm/dashboard',
    component: () => import ('@/views/Dashboard.vue')
  },
  //{
  //  path: '/login',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
  //  component: () => import ('@/views/usuarioPassword.vue')
  //},
  {
    path: '/login',
    component: () => import ('@/views/Login.vue')
  },
  {
    path: '/register',
    component: () => import ('@/views/Register.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const store = useStore(); // Mueve la declaración de useStore aquí
  const globalLogged = ref(store.state.globalLogged);
  console.log('Logged >>>', globalLogged.value);
  if (to.path === '/principales/memos' && !globalLogged.value) {
    next({ path: '/login' });
  } else if (to.path === '/principales/siniestros' && !globalLogged.value) {
    next({ path: '/login' });
  } else {
    next();
  }
});

export default router
