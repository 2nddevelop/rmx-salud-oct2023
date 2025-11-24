import axios from 'axios';
import store from '../store/modules/authModule'
import { API_URL } from '../config.js';

const historialesService = {

  setAuthHeader(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  async getData() {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.get(API_URL + '/historiales');
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
      const response = await axios.post(API_URL + '/historiales/buscar', patron);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async saveData(newRecord) {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.post(API_URL + '/historial', newRecord);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateData(record) {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.put(API_URL + `/historial/${record.hc_id}`, record);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteData(record) {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.post(API_URL + `/historial/${record.fch_id}`, record);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default historialesService;