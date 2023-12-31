import axios from 'axios';
import store from '../store/modules/authModule'
import { API_URL } from '../config.js';

const planificacionesService = {

  setAuthHeader(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  async getData(fecha) {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.get(API_URL + '/planificaciones/' + fecha);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getDataXFechaCntId(fecha, cnt_id) {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.get(API_URL + '/planificaciones/' + fecha + '/' + cnt_id);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async saveData(newRecord) {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.post(API_URL + '/planificacion', newRecord);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateData(record) {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.put(API_URL + `/planificacion/${record.pln_id}`, record);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteData(record) {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.post(API_URL + `/planificacion/${record.pln_id}`, record);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default planificacionesService;