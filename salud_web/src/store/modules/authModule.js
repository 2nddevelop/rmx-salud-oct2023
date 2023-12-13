import authService from "../../services/authService";

const state = {
  token: null,
  rol_id: null,
  rol_descripcion: null,
  cnt_id: null,
  cnt_descripcion: null,
  usr_id: null,
  usr_nombres: null,
};

const getters = {
  isAuthenticated: (state) => !state.token,
  getToken: (state) => state.token,
};

const actions = {
  async login({ commit }, { username, password }) {
    // Aquí realizarías la llamada al servicio de autenticación authService.login()
    // Luego, guardarías el token devuelto en el estado usando commit('setToken', token)
    const res = await authService.login(username, password);
    commit('setToken', res.token);
    commit('setRolId', res.rol_id);
    commit('setRolDescripcion', res.rol_descripcion);
    commit('setCntId', res.cnt_id);
    commit('setCntDescripcion', res.cnt_descripcion);
    commit('setUsrId', res.usr_id);
    commit('setUsrNombres', res.usr_nombres);
    return (res);
  },
  
  logout({ commit }) {
    // Aquí realizarías la llamada al servicio de autenticación authService.logout()
    // Luego, eliminarías el token del estado usando commit('setToken', null)
    authService.logout();
    commit('setToken', '');
    commit('setRolId', '');
    commit('setRolDescripcion', '');
    commit('setCntId', '');
    commit('setCntDescripcion', '');
    commit('setUsrId', '');
    commit('setUsrNombres', '');
  },

};

const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  setRolId(state, rol_id) {
    state.rol_id = rol_id;
  },
  setRolDescripcion(state, rol_descripcion) {
    state.rol_descripcion = rol_descripcion;
  },
  setCntId(state, cnt_id) {
    state.cnt_id = cnt_id ;
  },
  setCntDescripcion(state, cnt_descripcion) {
    state.cnt_descripcion = cnt_descripcion;
  },
  setUsrId(state, usr_id) {
    state.usr_id = usr_id ;
  },
  setUsrNombres(state, usr_nombres) {
    state.usr_nombres = usr_nombres;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
  