import axios from 'axios';
import store from '../store/modules/authModule'
import { API_URL } from '../config.js';

const fichasService = {

  setAuthHeader(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  async getData(fecha, cnt_id) {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.get(API_URL + '/fichas/' + fecha + '/' + cnt_id);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getFichasHistoriales(fecha, cnt_id) {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.get(API_URL + '/fichas/historiales/' + fecha + '/' + cnt_id);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getFicha(fch_id) {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.get(API_URL + '/ficha/buscar/' + fch_id);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async saveData(newRecord) {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.post(API_URL + '/ficha', newRecord);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateData(record) {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.put(API_URL + `/ficha/${record.fch_id}`, record);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteData(record) {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.post(API_URL + `/ficha/${record.fch_id}`, record);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default fichasService;