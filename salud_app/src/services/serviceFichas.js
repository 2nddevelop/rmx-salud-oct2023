// apiService.ts
import { ref } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';

import { API_URL } from '../config.js';

export const useFichas = () => {
  const store = useStore();

  const saveData = async (newRecord) => {
    console.log('newRecord:  ', newRecord);
    try {
      const token = store.state.globalToken;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const endpoint = '/ficha';
      const response = await axios.post(`${API_URL}${endpoint}`, newRecord, config);
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
