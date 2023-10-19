<template>
  <div class="about">
    <h1>ORIGENES</h1>
    <div>
      <table class="table table-responsive">
        <thead class="thead-dark">
          <tr>
            <th>#</th>
            <th>CÓDIGO</th>
            <th>DESCRIPCIÓN</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(r, index) in regs" v-bind:key="r.ori_id">
            <td>{{ index + 1 }}</td>
            <td>{{ r.ori_codigo }}</td>
            <td>{{ r.ori_descripcion }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import origenesService from '../services/origenesService';
//import { mapActions } from 'vuex';

export default {
  data() {
    return {
      regs: [],
      campo1: '',
      campo2: ''
    }
  },

  mounted() {
      // Llama al método por defecto
      this.listarRegistros();
    },

  methods: {
    //...mapActions('auth/', ['login']),
    async listarRegistros() {
      try {
        this.regs = await origenesService.getData();
        console.log('Registros: ', this.regs);
      } catch (error) {
        // Manejar el error de inicio de sesión aquí
        console.error('Error:', error.message);
      }
    },
  },
};
</script>

<style>
@media (min-width: 1024px) {
  .th {
    font-style: bold;
    color: primary;
  }
}
</style>
