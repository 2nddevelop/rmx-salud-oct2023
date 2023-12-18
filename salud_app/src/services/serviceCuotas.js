// apiService.ts
import { ref } from 'vue';
import axios from 'axios';

import { API_URL } from '../config.js';

export const useCuotas = () => {
  const fetchData = async (param) => {
    try {
      const endpoint = '/cuotas/';
      const response = await axios.get(`${API_URL}${endpoint}${param}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  /*
  const postData = async (data) => {
    try {
      const endpoint = '/cuotas/';
      const response = await axios.post(`${API_URL}${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      throw error;
    }
  };
  */
  return {
    fetchData
    //,
    //postData,
  };
};

