// apiService.ts
import { ref } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';

const apiUrl = 'http://localhost:3000/api'; // Reemplaza esto con tu URL de la API

export const useFichas = () => {
  const store = useStore();

  const saveData = async (newRecord) => {
    try {
      const token = store.state.globalToken;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const endpoint = '/ficha';
      const response = await axios.post(`${apiUrl}${endpoint}`, newRecord, config);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  return {
    saveData,
  };
};

export default fichasService;