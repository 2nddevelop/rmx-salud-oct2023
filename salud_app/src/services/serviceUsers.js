// apiService.ts
import { ref } from 'vue';
import axios from 'axios';

import { API_URL, API_HEADERS } from '../config.js';

export const useUsers = () => {

  const postData = async (data) => {
    try {
      const endpoint = '/login';
      
      const response = await axios.post(`${API_URL}${endpoint}`, data, {
        timeout: 10000,
        headers: API_HEADERS,
      });
        return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      throw error;
    }
  };  
  
  return {
    //fetchData,
    postData,
  };
};
