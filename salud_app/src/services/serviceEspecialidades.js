// apiService.ts
import { ref } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';

const apiUrl = 'http://localhost:3000/api'; // Reemplaza esto con tu URL de la API

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
      const response = await axios.get(`${apiUrl}${endpoint}`, config);
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
