import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // URL de tu API

const authService = {
  async login(email, password) {
    try {
      const response = await axios.post(API_URL + '/login', { 
        username: email, 
        password: password 
      });

      const token = response.data.token;
      this.setToken(token);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  logout() {
    this.setToken(null);
  },

  // Método para obtener el token del usuario almacenado en el local storage
  setToken(tk) {
    console.log('payload: ', tk);
    return localStorage.setItem('token', tk);
  },

  // Método para obtener el token del usuario almacenado en el local storage
  getToken() {
    return localStorage.getItem('token');
  },

  // Método para verificar si el usuario está autenticado
  isAuthenticated() {
    const token = this.getToken();
    // Verificar si el token existe y no está caducado
    return token && !this.isTokenExpired(token);
  },

  // Método para verificar si el token ha caducado
  isTokenExpired(token) {
    const decodedToken = this.decodeToken(token);
    if (!decodedToken) {
      return true;
    }
    const expiryDate = new Date(decodedToken.exp * 1000);
    const currentDate = new Date();
    return expiryDate < currentDate;
  },

  // Método para decodificar el token JWT
  decodeToken(token) {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken;
    } catch (error) {
      return null;
    }
  }
};

export default authService;
