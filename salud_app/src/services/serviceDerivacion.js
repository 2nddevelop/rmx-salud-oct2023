// apiService.ts
import { ref } from 'vue';
import axios from 'axios';

import { API_URL } from '../config.js';

export const useDerivacion = () => {
  const fetchData = async () => {
    try {
      const endpoint = '/centros';
      const response = await axios.get(`${API_URL}${endpoint}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const postData = async (data) => {
    try {
      const endpoint = '/centros/';
      const response = await axios.post(`${API_URL}${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      throw error;
    }
  };
  
  return {
    fetchData,
    postData,
  };
};

