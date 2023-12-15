import axios from 'axios';
import store from '../store/modules/authModule'
import { API_URL } from '../config.js';

const userService = {

  setAuthHeader(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  async getData() {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.get(API_URL + '/users');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getDataXId(usr_id) {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.get(API_URL + '/userXId/' + usr_id);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  async saveData(newRecord) {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.post(API_URL + '/user', newRecord);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateData(record) {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.put(API_URL + `/user/${record.usr_id}`, record);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteData(record) {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.post(API_URL + `/user/${record.usr_id}`, record);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default userService;
