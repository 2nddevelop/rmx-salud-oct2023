import axios from 'axios';
import store from '../store/modules/authModule'

const API_URL = 'http://localhost:3000/api'; // URL de tu API

const clientesService = {

  setAuthHeader(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  async getData() {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.get(API_URL + '/clientes');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getBuscar(cli_nit, cli_paterno, cli_materno, cli_nombres) {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const patron = {cli_nit: cli_nit, cli_paterno: cli_paterno, cli_materno: cli_materno, cli_nombres: cli_nombres}
      console.log("patron: ", patron);
      const response = await axios.post(API_URL + '/clientes/buscar', patron);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getBuscarClienteXCI(cli_nit) {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const patron = {cli_nit: cli_nit}
      console.log("patron: ", patron);
      const response = await axios.post(API_URL + '/clientes/buscarXCI', patron);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getBuscarHistorial(cli_id) {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const patron = {cli_id: cli_id}
      console.log("patron: ", patron);
      const response = await axios.post(API_URL + '/cliente/buscarHistorial', patron);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async saveData(newRecord) {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.post(API_URL + '/cliente', newRecord);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateData(record) {
    try {
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.put(API_URL + `/cliente/${record.cli_id}`, record);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteData(record) {
    try {
      console.log("Delete >>>", record);
      const tk = localStorage.getItem('token');
      this.setAuthHeader(tk);
      const response = await axios.post(API_URL + `/cliente/${record.cli_id}`, record);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default clientesService;