// apiService.ts
import { ref } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';

import { API_URL } from '../config.js';

export const useEspecialidades = () => {
  const store = useStore();

  const fetchData = async () => {
    try {
      const token = store.state.globalToken;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const endpoint = '/especialidades';
      const response = await axios.get(`${API_URL}${endpoint}`, config);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  
  return {
    fetchData,
  };
};
