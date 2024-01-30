import axios from 'axios';
import store from '../../store/modules/authModule.js'
import { API_URL, API_URL_SICE } from '../../config.js';

const cuadernosService = {

  setAuthHeader(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  async getData() {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.get(API_URL_SICE + '/cuadernos');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getBuscar(cua_codigo) {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      //const patron = {CUA: doc_ci, doc_paterno: doc_paterno, doc_materno: doc_materno, doc_nombres: doc_nombres}
      const response = await axios.get(API_URL_SICE + `/columnas/${cua_codigo}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getListas(col_codigo) {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.get(API_URL_SICE + `/listas/${col_codigo}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default cuadernosService;