// apiService.ts
import { ref } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';

const apiUrl = 'http://localhost:3000/api'; // Reemplaza esto con tu URL de la API

export const useClientes = () => {
  const store = useStore();

  const getBuscarClienteXCI = async (cli_nit) => {
    try {
      const token = store.state.globalToken;
      console.log('cli_nit: ', cli_nit);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const endpoint = '/clientes/buscarXCI';
      const bodyData = {cli_nit: cli_nit}
      const response = await axios.post(`${apiUrl}${endpoint}`, bodyData,  config);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const getBuscarHistorialXCliId = async (cli_id) => {
    try {
      const token = store.state.globalToken;
      console.log('cli_id >>> ', cli_id);
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const endpoint = '/clientes/buscarXCI';
      const bodyData = {cli_id: cli_id}
      const response = await axios.post(`${apiUrl}${endpoint}`, bodyData, config);
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
