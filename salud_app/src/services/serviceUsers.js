// apiService.ts
import { ref } from 'vue';
import axios from 'axios';

const apiUrl = 'http://localhost:3000/api'; // Reemplaza esto con tu URL de la API

export const useUsers = () => {

  const postData = async (data) => {
    try {
      const endpoint = '/login';
      const response = await axios.post(`${apiUrl}${endpoint}`, data);
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
