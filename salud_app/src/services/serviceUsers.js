// apiService.ts
import { ref } from 'vue';
import axios from 'axios';

import { API_URL, API_HEADERS } from '../config.js';

export const useUsers = () => {

  const postData = async (data) => {
    try {
      const endpoint = '/login';
      console.log('endpoint >>>', `${API_URL}${endpoint}`);
      
      const response = await axios.post(`${API_URL}${endpoint}`, data, {
        timeout: 10000,
        headers: API_HEADERS,
      });
  
      console.log('service > resultado: ', response.data);
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
