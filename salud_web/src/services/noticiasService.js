import axios from 'axios';
import store from '../store/modules/authModule'
import { API_URL } from '../config.js';

const noticiasService = {

  setAuthHeader(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  async getData() {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.get(API_URL + '/noticias');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async saveData(newRecord) {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.post(API_URL + '/noticia', newRecord);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateData(record) {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.put(API_URL + `/noticia/${record.nt_id}`, record);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteData(record) {
    try {
      console.log("Delete >>>", record);
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.post(API_URL + `/noticia/${record.nt_id}`, record);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default noticiasService;