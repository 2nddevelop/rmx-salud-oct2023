// apiService.ts
import { ref } from 'vue';
import axios from 'axios';

const apiUrl = 'http://localhost:3000/api'; // Reemplaza esto con tu URL de la API

export const useSiniestros = () => {
  const fetchData = async (param) => {
    try {
      const endpoint = '/siniestros/';
      const response = await axios.get(`${apiUrl}${endpoint}${param}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const postData = async (data) => {
    try {
      const endpoint = '/siniestros/';
      const response = await axios.post(`${apiUrl}${endpoint}`, data);
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

