<template>
    <div class="login-container">
      <div class="login-grid">
        <div class="login-logo">
          <i class="fas fa-user-circle"></i>
        </div>
        <div class="login-form">
          <h2>Iniciar sesión</h2>
          <form @submit.prevent="validarUsuario">
            <div class="form-group">
              <i class="fas fa-envelope"></i>
              <input type="email" v-model="email" placeholder="Correo electrónico" />
            </div>
            <div class="form-group">
              <i class="fas fa-lock"></i>
              <input type="password" v-model="password" placeholder="Contraseña" />
            </div>
            <button
              type="submit"
              class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 m-1 rounded"
              title="Nuevo"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
</template>
  
<script>
//import authService from '../services/authService';
import { mapActions } from 'vuex';

import '@fortawesome/fontawesome-free/css/all.css';

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    ...mapActions('auth/', ['login']),

    async validarUsuario() {
      try {
        const username = this.email; 
        const password = this.password; 
        const resp = await this.login({ username, password });
        if (resp.token) {
          this.$toast.success('Ingreso autorizado!');
          this.$router.push('/');
        } else {
          this.$toast.error('Ingreso NO autorizado!', {});
          this.email = '';
          this.password = '';
        }

      } catch (error) {
        this.$toast.error('¡Error!');
        console.error('Error al iniciar sesión:', error.message);
      }
    },
  },
};
</script>
  
<style>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
  }
  
  .login-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    max-width: 400px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 20px;
  }
  
  .login-logo {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .login-logo i {
    font-size: 48px;
    color: #ccc;
  }
  
  .login-form h2 {
    margin: 0 0 20px;
  }
  
  .form-group {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .form-group i {
    margin-right: 10px;
  }
  
  input[type="email"],
  input[type="password"] {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    padding: 10px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #555;
  }
</style>
  