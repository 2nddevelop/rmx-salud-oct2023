// apiService.ts
import { ref } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';

import { API_URL } from '../config.js';

export const useClientes = () => {
  const store = useStore();

  const getBuscarClienteXCI = async (cli_nit) => {
    try {
      const token = store.state.globalToken;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const endpoint = '/clientes/buscarXCI';
      const bodyData = {cli_nit: cli_nit}
      const response = await axios.post(`${API_URL}${endpoint}`, bodyData,  config);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const getBuscarHistorialXCliId = async (cli_id) => {
    try {
      const token = store.state.globalToken;      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const endpoint = '/cliente/buscarHistorial';
      const bodyData = {cli_id: cli_id}
      const response = await axios.post(`${API_URL}${endpoint}`, bodyData, config);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  return {
    getBuscarClienteXCI,
    getBuscarHistorialXCliId
  };
};
