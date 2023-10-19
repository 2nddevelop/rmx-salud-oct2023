import axios from 'axios';
import store from '../store/modules/authModule'

const API_URL = 'http://localhost:3000/api'; // URL de tu API

const origenesService = {
  
  setAuthHeader(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  async getData() {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.get(API_URL + '/origenes');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
};

export default origenesService;
