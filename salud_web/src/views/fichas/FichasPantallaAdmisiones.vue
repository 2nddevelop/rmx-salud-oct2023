<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import centrosService from '../../services/centrosService';
import fichasService from '../../services/fichasService';

import audioFile from '@/assets/notification-android.mp3';

const fecha = ref(new Date().toISOString().slice(0, 10));
const centro_id = ref(0);
const centrosSalud = ref();
const regs = ref();
const count = ref(0);
const last = ref(0);

const plural = ref('ADMISIONES');

const listarCentros = () => {
  centrosService.getData(1).then(response => {
    centrosSalud.value = response;
  })
}

const listarRegistros = () => {
  fichasService.getData(fecha.value, centro_id.value).then(response => {
    regs.value = response;
    //    const countLast = regs.value.filter((reg) => reg.fch_estado == 'S').length;
    console.log('Ultimo: ', last.value);
    if ((last.value !== regs.value[0].fch_id) && (regs.value[0].fch_estado == 'S')) {
      last.value = regs.value[0].fch_id
      console.log('Cambió');
      const audio = new Audio(audioFile);
      audio.play();
    }
  })
}

let intervalo = null;

onMounted(() => {
  listarCentros();
  intervalo = setInterval(() => {
    fecha.value = new Date().toISOString().slice(0, 10);
    listarRegistros();
  }, 5000);
})

onUnmounted(() => {
  clearInterval(intervalo);
})
</script>

<template>
  <div>
    <div class="grid grid-cols-4 p-0 m-0">
      <div class="p-1 m-1">
        <h1>{{ plural }}</h1>
      </div>

      <div class="p-1 m-1">
        <div class="form-group">
          <label for="fecha" class="font-semibold">Fecha</label>
          <input type="date" v-model="fecha" class="form-control" @change="listarRegistros()" name="fecha" id="fecha"
            placeholder="Fecha" />
        </div>
      </div>

      <div class="p-1 m-1">
        <div class="form-group">
          <label for="centro" class="font-semibold">Establ. de Salud</label>
          <select v-model="centro_id" class="form-control" @change="listarRegistros()" name="centro" id="centro"
            placeholder="Centro de salud" required>
            <option value="0">-- seleccione --</option>
            <option v-for="c in centrosSalud" :key="c.cnt_id" :value="c.cnt_id">{{ c.cnt_descripcion }}</option>
          </select>
        </div>
      </div>

      <div class="p-1 m-1"></div>
    </div>
  </div>

  <table class="table table-responsive table-border">
    <thead class="text-xl">
      <tr>
        <th>Paciente</th>
        <th>Ficha</th>
        <th>Especialidad</th>
        <th> </th>
        <th>Ventanilla
        </th>
      </tr>
    </thead>
    <tbody class="text-4xl">
      <tr v-for="(r, index) in regs" v-bind:key="r.fch_id">
        <template v-if="r.fch_estado == 'S'">
          <td align="left">{{ r.cli_data.cli_nombres }} {{ r.cli_data.cli_paterno }} {{ r.cli_data.cli_materno }}</td>
          <td align="center">{{ r.fch_hora }}
            <!-- span class="rounded-md bg-blue-50 px-4 py-1 text-blue-800 ring-1 ring-inset ring-blue-600/10">
              {{ r.fch_nro_ficha }}
            </span -->
          </td>
          <td align="left" style="background-color: beige;">{{ r.esp_descripcion }}</td>
          <td align="center">
            <i v-if="r.fch_id == last" class="fa-solid fa-bullhorn fa-sm"></i>
            <i v-else class="fa-solid fa-arrow-right fa-sm"></i>
          </td>
          <td align="center" style="background-color: beige;">
            <label v-show="r.fch_estado == 'S'">ADMISIONES</label>
            <label v-show="r.fch_estado !== 'S'" class="font-bold">{{ r.con_codigo }}</label>
          </td>
        </template>
      </tr>
    </tbody>
    <tfoot class="text-xs">
      <tr style="background: beige;">
        <td colspan="6">
          <p>En pantalla solo se listan las fichas llamadas a Admisiones o Consulta Externa.</p>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<style scoped>
.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 40px;
  /*font-size: x-small;*/
}

.table th {
  padding: 7px 10px;
  border: 1px solid;
  font-weight: bold;
  color: white;
  background: hsla(160, 100%, 37%, 1);
  vertical-align: top;
}

.table td {
  padding: 7px 10px;
  border: 1px solid;
  border-block-color: rgb(190, 197, 195);
}
</style>