import axios from 'axios';
import store from '../../store/modules/authModule.js'
import { API_URL } from '../../config.js';

const cuadernosService = {

  setAuthHeader(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  async getData() {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.get(API_URL + '/cuadernos');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getBuscar(cua_codigo) {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const patron = {doc_ci: doc_ci, doc_paterno: doc_paterno, doc_materno: doc_materno, doc_nombres: doc_nombres}
      const response = await axios.post(API_URL + '/cuadernos/${cua_codigo}', patron);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  /*
  async saveData(newRecord) {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.post(API_URL + '/doctor', newRecord);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateData(record) {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.put(API_URL + `/doctor/${record.doc_id}`, record);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteData(record) {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.post(API_URL + `/doctor/${record.doc_id}`, record);
      return response.data;
    } catch (error) {
      throw error;
    }
  },*/
};

export default cuadernosService;