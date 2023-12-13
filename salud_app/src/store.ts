// store.ts
import { createStore } from 'vuex';

const store = createStore({
  state: {
    // tus variables globales van aquí
    globalCiudad: '-21.533709043900377, -64.73429697462147',
    globalVar: '_ _ _',
    globalUser: '_sin_usuario_',
    globalUserId: '',
    globalLogged: false,
  },
  mutations: {
    // mutaciones para cambiar el estado global
    updateGlobalVar(state, newValue) {
      state.globalVar = newValue;
    },
    updateGlobalUser(state, newValue) {
      state.globalUser = newValue;
    },
    updateGlobalUserId(state, newValue) {
      state.globalUserId = newValue;
    },
    updateGlobalLogged(state, newValue) {
      state.globalLogged = newValue;
    },
  },
  actions: {
    // acciones para realizar operaciones asíncronas
  },
});

export default store;
