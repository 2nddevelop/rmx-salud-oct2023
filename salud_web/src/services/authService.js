import axios from 'axios';
import { API_URL } from '../config.js';

const authService = {
  async login(email, password) {
    try {
      const response = await axios.post(API_URL + '/login', { 
        username: email, 
        password: password 
      });

      const res = response.data;

      this.setToken(res.token);
      this.setRolId(res.rol_id);
      this.setRolDescripcion(res.rol_descripcion);
      this.setCntId(res.cnt_id);
      this.setCntDescripcion(res.cnt_descripcion);
      this.setUsrId(res.usr_id);
      this.setUsrNombres(res.usr_nombres);
      
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
    this.setUsrId(null);
    this.setUsrNombres(null);
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
  setUsrId(usr_id) {
    return localStorage.setItem('usr_id', usr_id);
  },
  setUsrNombres(usr_nombres) {
    return localStorage.setItem('usr_nombres', usr_nombres);
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
  getUsrId() {
    return localStorage.getItem('usr_id');
  },
  getUsrNombres() {
    return localStorage.getItem('usr_nombres');
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
