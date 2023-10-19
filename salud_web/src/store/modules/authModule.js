import authService from "../../services/authService";

const state = {
  token: null,
};

const getters = {
  isAuthenticated: (state) => !state.token,
  getToken: (state) => state.token,
};

const actions = {
  async login({ commit }, { username, password }) {
    // Aquí realizarías la llamada al servicio de autenticación authService.login()
    // Luego, guardarías el token devuelto en el estado usando commit('setToken', token)
    console.log('llego al vuex login');
    console.log('trajo: ', username, password);
    const res = await authService.login(username, password);
    console.log('Respuesta: ', res.token);
    commit('setToken', res.token);
  },
  
  logout({ commit }) {
    // Aquí realizarías la llamada al servicio de autenticación authService.logout()
    // Luego, eliminarías el token del estado usando commit('setToken', null)
    authService.logout();
    commit('setToken', '');
  },

};

const mutations = {
  setToken(state, token) {
    state.token = token;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
  