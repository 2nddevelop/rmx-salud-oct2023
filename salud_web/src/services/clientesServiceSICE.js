import axios from 'axios';
// import store from '../store/modules/authModule'
import { API_URL_SICE } from '../config.js';

const clientesService = {

  setAuthHeader(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  async getData() {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.get(API_URL_SICE + '/clientes');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getBuscar(cli_nit, cli_paterno, cli_materno, cli_nombres) {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const patron = {cli_nit: cli_nit, cli_paterno: cli_paterno, cli_materno: cli_materno, cli_nombres: cli_nombres}
      const response = await axios.post(API_URL_SICE + '/clientes/buscar', patron);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default clientesService;