<template>
  <div class="">
    <div>
      <div class="grid grid-cols-4">
        <div class="p-1 m-1"> <!-- text-green-500 -->
          <h1>{{ title }}</h1>
        </div>

        <div class="flex p-1 m-1">
        </div>

        <div class="flex p-1 m-1">
        </div>

        <div class="p-1 m-1">
          <div class="form-group">
            <input type="date" v-model="filtro.fecha" class="form-control" @change="listarRegistros" name="fecha" id="fecha" placeholder="Fecha" />
          </div>
        </div>

      </div>
    </div>
    <div style="overflow-x: auto">
      <table ref="myTable" class="table table-responsive" cellspacing="0" width="100%">
        <thead class="thead-dark">
          <tr>
            <th>#</th>
            <th>Centro
              <select v-model="filtro.centro_id" class="form-control input" @change="filtroLocal" 
                name="pln_cnt_id" id="pln_cnt_id" placeholder="Centro" required>
                <option value="0">-- todos --</option>
                <option v-for="c in centros" :key="c.cnt_id" :value="c.cnt_id">{{ c.cnt_descripcion }} </option>
              </select>
            </th>
            <th>Especialidad
              <select v-model="filtro.especialidad_id" class="form-control input" @change="listarRegistros" 
                name="pln_esp_id" id="pln_esp_id" placeholder="Espcialidad" required>
                <option value="0">-- todas --</option>
                <option v-for="e in especialidades" :key="e.esp_id" :value="e.esp_id">{{ e.esp_descripcion }} </option>
              </select>
            </th>
            <th>
              Consultorio<br>
              Médico
            </th>
            <th>Fecha</th>
            <th>H. Inicio</th>
            <th>H. Fin</th>
            <th>Max<br/>Fichas</th>
            <th>Max<br/>Virtuales</th>
            <th>Duración</th>
            <th>Registrado</th>
            <th>E</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(r, index) in regs" v-bind:key="r.pln_id">
          <tr >
            <td align="right" rowspan="2">{{ index + 1 }}</td>
            <td align="left" style="background-color: beige;">{{ r.cnt_descripcion }}</td>
            <td align="left" style="background-color: beige;">{{ r.esp_descripcion }}</td>
            <td align="left" style="background-color: beige;">
              {{ r.con_codigo }} - {{ r.con_descripcion }}<br>
              {{ r.doc_data.doc_paterno }} {{ r.doc_data.doc_materno }} {{ r.doc_data.doc_nombres }}
            </td>
            <td align="center">{{ r.pln_data.pln_fecha }}</td>
            <td align="center">{{ r.pln_data.pln_horario_inicio }}</td>
            <td align="center">{{ r.pln_data.pln_horario_fin }}</td>
            <td align="right">{{ r.pln_data.pln_max_fichas }}</td>
            <td align="right">{{ r.pln_data.pln_max_virtuales }}</td>
            <td align="right">{{ r.pln_data.pln_duracion }}</td>
            <td align="center">{{ r.pln_registrado.substring(0, 10) }}</td>
            <td align="center">
              <span v-if="r.pln_estado == 'X'" class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{{ r.pln_estado }}</span>
              <span v-if="r.pln_estado == 'A'" class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{{ r.pln_estado }}</span>
            </td>
          </tr>
          <tr>
            <td colspan="13">
              <div class="flex flex-wrap">
                <div v-for="(r, index) in r.pln_data_disponibles"  v-bind:key="index">
                  <template v-if="r.pln_fch_id == 0">
                    <button class="bg-green-400 text-white text-xxs py-2 px-4 m-1 rounded" disabled>
                      {{ r.pln_numero }}<br>{{ r.pln_hora }}
                    </button>
                  </template>
                  <template v-else>
                    <button class="bg-gray-300 text-black text-xxs py-2 px-4 m-1 rounded" disabled>
                      {{ r.pln_numero }}<br>{{ r.pln_hora }}
                    </button>
                  </template>
                </div>
                <label class="text-xl ml-10">Producción {{ r.plomos }} de {{ r.pln_data.pln_max_fichas }}</label>
              </div>
            </td>
          </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="13">Son n {{ plural }}</td>
          </tr>
        </tfoot>
      </table>
      <div>
      </div>
    </div>

  </div>
</template>


<script>
import centrosService from '../services/centrosService';
import especialidadesService from '../services/especialidadesService';
import planificacionesService from '../services/planificacionesService';
import doctoresService from '../services/doctoresService';
import consultoriosService from '../services/consultoriosService';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-dt';
import 'jquery';
import 'datatables.net-buttons-dt/css/buttons.dataTables.css';
import DataTable from 'datatables.net-vue3';
import '@fortawesome/fontawesome-free/css/all.css';

export default {
  data() {
    return {
      regs: [],
      reg: {            
         pln_data:{
            pln_max_fichas: '10',
            pln_fecha: '',
            pln_horario_inicio: '',
            pln_horario_fin: '',
            pln_max_virtuales: '5',
            pln_duracion: '20'
        } 
      },
      title: "PLANIFICACIÓN REPORTE",
      plural: "PLANIFICACIONES",
      singular: "PLANIFICACION",
      showModal: false,
      showModalVer: false,
      isEditing: false,
      centros: [],
      especialidades: [],
      doctores: [],
      consultorios: [],

      // dates
      currentDate: new Date(),
      // filtro
      filtro: { fecha: '', centro_id: '0', especialidad_id: '0' },

      // disponibles horas
      lapso: 20 // 20 minutos
    };
  },

  mounted() {
    this.dates();
    this.listarRegistros();
    this.listarCentros();
    this.listarEspecialidades();
    this.listarDoctores();
  },

  methods: {
    async listarRegistros() {
      this.regs = [];
      try {
        const registros = [];
        this.regs = await planificacionesService.getData(this.filtro.fecha);
        this.regs.forEach((r) => {
          let plomos = 0;
          let verdes = 0;
          r.pln_data_disponibles.forEach((f) => {
            if (f.pln_fch_id == '1') {
              plomos++;
            } else {
              verdes++;
            }
          });
          r.plomos = plomos;
          r.verdes = verdes;
          if (this.filtro.especialidad_id == '0') {
            registros.push(r);
          } else {
            if (r.pln_esp_id == this.filtro.especialidad_id) {
              registros.push(r);
            }
          }
        });
        this.regs = registros;
      } catch (error) {
        console.error("Error:", error.message);
      }
    },

    async listarCentros() {
      this.centros = [];
      try {
        this.centros = await centrosService.getData();
      } catch (error) {
        console.error("Error:", error.message);
      }
    },

    async listarEspecialidades() {
      this.especialidades = [];
      try {
        this.especialidades = await especialidadesService.getData();
      } catch (error) {
        console.error("Error:", error.message);
      }
    },

    async listarConsultorios(cnt_id) {
      this.consultorios = [];
      try {
        this.consultorios = await consultoriosService.getData(cnt_id);
      } catch (error) {
        console.error("Error:", error.message);
      }
    },

    async listarDoctores() {
      this.doctores = [];
      try {
        this.doctores = await doctoresService.getData();
      } catch (error) {
        console.error("Error:", error.message);
      }
    },

    dates() {
      const year = this.currentDate.getFullYear();
      const month = ('0' + (this.currentDate.getMonth() + 1)).slice(-2); // Se agrega 1 ya que los meses van de 0 a 11
      const day = ('0' + this.currentDate.getDate()).slice(-2);

      this.filtro.fecha = `${year}-${month}-${day}`;
    },

  },

  computed: {
    fechaMinima() {
      // Calcular la fecha mínima permitida (hoy)
      const hoy = new Date();
      const year = hoy.getFullYear();
      const month = hoy.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
      const day = hoy.getDate();
      return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    },
  },

};
</script>


<style>
* {
  box-sizing: border-box;
}

.input {
  color: black;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 40px;
  font-size: x-small;
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

.word-break {
  word-break: break-all;
}

.scroll-container {
  overflow: auto;
  margin-bottom: 40px;
  border-left: 1px solid;
  border-right: 1px solid;
}

.scroll {
  margin: 0;
}

.scroll td:first-of-type {
  position: sticky;
  left: 0;
  border-left: none;
  background: #f4f4f4;
  color: #212121;
  font-weight: bold;
}

.scroll td:last-of-type {
  border-right: none;
}

@media screen and (max-width: 600px) {
  .responsive thead {
    visibility: hidden;
    height: 0;
    position: absolute;
  }

  .responsive tr {
    display: block;
    margin-bottom: 0.625em;
  }

  .responsive td {
    border: 1px solid;
    border-bottom: none;
    display: block;
    font-size: 0.8em;
    text-align: right;
  }

  .responsive td::before {
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }

  .responsive td:last-child {
    border-bottom: 1px solid;
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999; 
}

.modal-content {
  background-color: #fff;
  padding: 5px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 70%; 
  max-width: 80vw;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
}

.modal-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.modal-footer {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}

.modal-footer button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-footer button:hover {
  b___ackground-color: #f0f0f0;
}

/* Form field styles */
.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>