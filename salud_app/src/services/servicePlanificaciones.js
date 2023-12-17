// apiService.ts
import { ref } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';

const apiUrl = 'http://localhost:3000/api'; // Reemplaza esto con tu URL de la API

export const usePlanificaciones = () => {
  const store = useStore();

  const fetchData = async (fecha, cnt_id) => {
    try {
      const token = store.state.globalToken;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const endpoint = '/planificaciones/';
      const response = await axios.get(`${apiUrl}${endpoint}${fecha}/${cnt_id}`, config);
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
