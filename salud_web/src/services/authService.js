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
      this.setRolId(token);
      this.setRolDescripcion(token);
      this.setCntId(token);
      this.setCntDescripcion(token);
      return response.data;
    } catch (error) {
      return error;
      //throw error;
    }
  },
  
  logout() {
    this.setToken(null);
    this.setRolId(null);
    this.setRolDescripcion(null);
    this.setCntId(null);
    this.setCntDescripcion(null);
  },

  // Método para obtener el token del usuario almacenado en el local storage
  setToken(tk) {
    return localStorage.setItem('token', tk);
  },
  setRolId(rol_id) {
    return localStorage.setItem('rol_id', rol_id);
  },
  setRolDescripcion(rol_descripcion) {
    return localStorage.setItem('rol_descripcion', rol_descripcion);
  },
  setCntId(cnt_id) {
    return localStorage.setItem('cnt_id', cnt_id);
  },
  setCntDescripcion(cnt_descripcion) {
    return localStorage.setItem('cnt_descripcion', cnt_descripcion);
  },

  // Método para obtener el token del usuario almacenado en el local storage
  getToken() {
    return localStorage.getItem('token');
  },
  getRolId() {
    return localStorage.getItem('rol_id');
  },
  getRolId() {
    return localStorage.getItem('rol_descripcion');
  },
  getCntId() {
    return localStorage.getItem('cnt_descripcion');
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
