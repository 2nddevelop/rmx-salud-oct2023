<template>
  <div class="">
    <div class="grid grid-cols-4 p-0 m-0">
      <div class="p-1 m-1">
        <!--h1>{{ title }}</h1-->
      </div>

      <div class="p-1 m-1">
        <div class="form-group">
          <label for="fecha" class="font-semibold">Fecha</label>
          <input type="date" v-model="filtro.fecha" class="form-control" @change="listarRegistros" name="fecha" id="fecha" placeholder="Fecha" />
        </div>
      </div>

      <div class="p-1 m-1">
        <div class="form-group">
          <label for="centro" class="font-semibold">Establ. de Salud</label>
          <select v-model="filtro.centro_id" class="form-control" @change="listarRegistros" name="centro" id="centro" placeholder="Centro de salud" required>
            <option value="0">-- seleccione --</option>
            <option v-for="c in centrosSalud" :key="c.cnt_id" :value="c.cnt_id">{{ c.cnt_descripcion }}</option>
          </select>
        </div>
      </div>

      <div class="p-1 m-1"></div>
    </div>
  </div>
  <div class="">
    <div class="grid grid-cols-6">
      <div class="col-span-3 p-1 m-1 content-center content-stretch	" style="background-color: beige;">
        Video
      </div>

      <div class="col-span-3 p-1 m-1" style="overflow-x: auto;">
        <table class="table table-responsive table-border">
          <thead class="text-xl">
            <tr>
              <th>Paciente</th>
              <th>Ficha</th>
              <th>Especialidad</th>
              <th>
                <!--select v-model="filtro.especialidad_id" class="form-control input" @change="listarRegistros" 
                  name="esp_id" id="esp_id" placeholder="Espcialidad" required>
                  <option value="0">-- todas --</option>
                  <option v-for="e in especialidades" :key="e.esp_id" :value="e.esp_id">{{ e.esp_descripcion }}</option>
                </select-->
              </th>
              <th>Consultorio
                <!--select v-model="filtro.consultorio_id" class="form-control input" @change="listarRegistros" 
                  name="con_id" id="con_id" placeholder="Consultorio" required>
                  <option value="0">-- todas --</option>
                  <option v-for="c in consultorios" :key="c.con_id" :value="c.con_id">{{ c.con_descripcion }}</option>
                </select-->
              </th>
            </tr>
          </thead>
          <tbody class="text-xl">
            <tr v-for="(r, index) in regs" v-bind:key="r.fch_id">
              <template v-if="r.fch_estado == 'S' || r.fch_estado == 'E' || r.fch_estado == 'C'">
              <td align="left">{{ r.cli_data.cli_nombres }} </td>
              <td align="center">{{ r.fch_hora }}
                <span
                  class="inline-flex items-center rounded-md bg-blue-50 px-4 py-1 text-lg font-medium text-blue-700 ring-1 ring-inset ring-blue-600/10">
                  {{ r.fch_nro_ficha }}
                </span>
              </td>
              <td align="left" style="background-color: beige;">{{ r.esp_descripcion }}</td>
              <td align="center"><i class="fa-solid fa-arrow-right fa-xl"></i></td>
              <td align="center" style="background-color: beige;">
                <label v-show="r.fch_estado == 'S'">ADMISIONES</label>
                <label v-show="r.fch_estado !== 'S'" class="text-3xl font-bold">{{ r.con_codigo }}</label>
              </td>
              <!--td align="center">
                <span v-if="r.fch_estado == 'S'" class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{{ r.fch_estado }}</span>
                <span v-if="r.fch_estado == 'A'" class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{{ r.fch_estado }}</span>
                <span v-if="r.fch_estado == 'P'" class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/10">{{ r.fch_estado }}</span>
                <span v-if="r.fch_estado == 'E'" class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/10">{{ r.fch_estado }}</span>
              </td-->
              </template>
            </tr>
          </tbody>
          <tfoot class="text-xs">
            <tr style="background: beige;">
              <td colspan="6"><p>En pantalla solo se listan las fichas llamadas a Admisiones o Consulta Externa.</p></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div
            class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
          >
            <h2
              class="modal-title text-xl font-semibold text-gray-900 dark:text-white"
            >
              {{ isEditing ? "EDITAR " : "NUEVO " }} {{ singular }}
            </h2>
            <button
              type="button"
              @click="closeModal()"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="defaultModal"
            >
              <i class="fa-solid fa-close"></i>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="modal-body p-6 space-y-6">
            <div class="grid grid-cols-2 gap-3">
              <div class="form-group">
                <label for="fecha2" class="font-semibold">Fecha</label>
                <input type="date" v-model="filtro.fecha" class="form-control" name="fecha2" id="fecha2" placeholder="Fecha de hoy" disabled />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="form-group">
                <label for="fch_cli_id" class="font-semibold">Paciente</label>
                <select v-model="reg.fch_cli_id" class="form-control" name="fch_cli_id" id="fch_cli_id" placeholder="Centro" required>
                  <option value="0">-- seleccione --</option>
                  <option v-for="c in clientes" :key="c.cli_id" :value="c.cli_id">{{ c.cli_data.cli_paterno }} {{ c.cli_data.cli_materno }} {{ c.cli_data.cli_nombres }}</option>
                </select>
              </div>
              <div class="form-group">
                  <label for="fch_pln_id" class="font-semibold">Planificacion</label>
                  <select v-model="reg.fch_pln_id" class="form-control" name="fch_pln_id" id="fch_pln_id" placeholder="Planificacion" required>
                    <option value="0">-- seleccione --</option>
                    <option v-for="p in planificaciones" :key="p.pln_id" :value="p.pln_id"> [{{ p.esp_descripcion }}] {{ p.pln_data.pln_consultorio }} - {{ p.pln_data.pln_medico }} [{{ p.cnt_descripcion }}]</option>
                  </select>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div class="col-md-6">
                <label for="nro">Numero Ficha</label>
                <input v-model="reg.fch_nro_ficha" class="form-control" name="nro" id="nro" placeholder="Numero de Ficha" />
                <span style="font-size: x-small; color: red;">Automático</span>
              </div>
              <div class="col-md-6">
                <label for="kdx">Kardex Médico</label>
                <input v-model="reg.fch_kdx_medico" class="form-control" name="kdx" id="kdx" placeholder="Kardex Medico" disabled />
              </div>
            </div>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button @click="saveModal" class="bg-green-500 hover-bg-green-600 text-white font-bold py-2 px-4 m-1 rounded" :title="isEditing ? 'Actualizar' : 'Guardar'">
              {{ isEditing ? "Actualizar" : "Guardar" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import clientesService from '../services/clientesService';
import planificacionesService from '../services/planificacionesService';
import fichasService from '../services/fichasService';
import centrosService from '../services/centrosService';
import especialidadesService from '../services/especialidadesService';
import consultoriosService from '../services/consultoriosService';

import '@fortawesome/fontawesome-free/css/all.css';

export default {
  data() {
    return {
      regs: [],
      reg: { },
      title: "PANTALLA",
      plural: "Fichas",
      singular: "Ficha",
      showModal: false,
      isEditing: false,
      clientes: [],
      planificaciones: [],
      centrosSalud: [],
      especialidades: [],
      consultorios: [],
      // dates
      currentDate: new Date(),
      // filtro
      filtro: { especialidad_id:'0', consultorio_id:'0', fecha:'', centro_id:'0' }
    };
  },

  mounted() {
    this.dates();
    this.listarClientes();
    // this.listarPlanificaciones();
    this.listarCentros();
    this.listarEspecialidades();
    this.listarConsultorios();

    setTimeout(() => {
      this.listarRegistros();        
    }, 10000);
    
  },

  methods: {
    async listarRegistros() {
      this.regs = [];
      try {
        const registros = [];
        this.regs = await fichasService.getData(this.filtro.fecha, this.filtro.centro_id);
        this.regs.forEach((r) => {
          if (this.filtro.especialidad_id == '0') {
            registros.push(r);
          } else {
            if (r.esp_id == this.filtro.especialidad_id) {
              registros.push(r);
            }
          }
        });
        this.regs = registros;      
      } catch (error) {
        console.error("Error:", error.message);
      }
    },
    async listarClientes() {
      this.clientes = [];
      try {
        this.clientes = await clientesService.getData();
      } catch (error) {
        console.error("Error:", error.message);
      }
    },
    async listarPlanificaciones() {
      this.planificaciones = [];
      try {
        this.planificaciones = await planificacionesService.getDataXFechaCntId(this.filtro.fecha, this.filtro.centro_id);
      } catch (error) {
        console.error("Error:", error.message);
      }
    },
    async listarCentros() {
      try {
      this.centrosSalud = await centrosService.getData();
      } catch (error) {
      console.error('Error:', error.message);
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
    async listarConsultorios() {
      this.consultorios = [];
      try {
        this.consultorios = await consultoriosService.getData();
      } catch (error) {
        console.error("Error:", error.message);
      }
    },

    newRegistro() {
      this.listarPlanificaciones();
      this.isEditing = false;
      this.reg = { fch_cli_id: '0', fch_pln_id: '0', fch_kdx_medico: 'a definir' };
      this.showModal = true;
    },

    editRegistro(reg) {
      this.isEditing = true;
      this.reg = Object.assign({}, reg);
      this.showModal = true;
    },

    async saveModal() {
      this.reg.fch_usr_id = 1; 
      this.reg.fch_estado = "P";
      if (this.isEditing) {
        const updatedReg = await fichasService.updateData(this.reg);
        const index = this.regs.findIndex(item => item.fch_id === updatedReg.fch_id);
        if (index !== -1) {
          this.regs.splice(index, 1, updatedReg);
        }
      } else {
        const savedReg = await fichasService.saveData(this.reg);
        this.regs.push(savedReg);
      }
      this.listarRegistros();
      this.closeModal();
    },

    async deleteRegistro(reg) {
      const confirmed = window.confirm("¿Estás seguro de eliminar este registro?");
      if (confirmed) {
        try {
          const index = this.regs.findIndex(item => item.fch_id === reg.fch_id);
          if (index !== -1) {
            reg.fch_usr_id = 1;
            reg.fch_estado = "X"; 
            await fichasService.deleteData(reg); 
            this.regs.splice(index, 1); 
          } else {
            console.error('No se encontró el registro para eliminar');
          }
        } catch (error) {
          console.error('Error al eliminar el registro:', error);
        }
      }
    },

    async printRegistro(reg) {
      const confirmed = window.confirm("¿Imprimir ficha?");
      if (confirmed) {
        try {
          const index = this.regs.findIndex(item => item.fch_id === reg.fch_id);
          if (index !== -1) {

            var html = '';
            html = '<table style="font-size:11px" border=\"0\" width = \"100%\">';
            html += '<tr><td colspan="2" width="20%"><img src="' + window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/salud/img/logo3.png" width="80%"></td>';
            html += '<td colspan="3" align="center">"Nada es mas importante que un niño"</td></tr>';
            html += '<tr><td colspan="3"><hr></td></tr>';
            html += '<tr><td colspan="3" align="center">FICHA No: ' + reg.fch_nro_ficha + '</td></tr>';
            html += '<tr><td colspan="3" align="center">HORA: ' + reg.fch_hora + '</td></tr>';
            html += '<tr><td colspan="3"><hr></td></tr>';
            html += '<tr><td colspan="3">Establ. de Salud: ' + reg.cnt_descripcion + '</td></tr>';
            html += '<tr><td colspan="3">Especialidad: ' + reg.esp_descripcion + '</td></tr>';
            html += '<tr><td colspan="3">Consultorio: ' + reg.con_descripcion + '</td></tr>';
            html += '<tr><td colspan="3"><hr></td></tr>';
            html += '<tr><td align="center" colspan="3">Recuerde estar 20 minutos antes de su consulta médica.</td></tr>';
            html += '<tr><td colspan="3"><hr></td></tr>';
            html += '<tr><td colspan="3" align="center">' + reg.fch_registrado + '</td></tr>';
            html += '</table>';
            var win = window.open("", "Impresion Boleta", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=200,top=" + (screen.height - 400) + ",left=" + (screen.width - 840));
            win.document.body.innerHTML = html;

            setTimeout(function () {
                win.document.close();
                win.focus();
                win.print();
                win.close();
            }, 1000);
  

          } else {
            console.error('No se encontró el registro para eliminar');
          }
        } catch (error) {
          console.error('Error al eliminar el registro:', error);
        }
      }
    },

    closeModal() {
      this.showModal = false;
    },

    dates() {
      const year = this.currentDate.getFullYear();
      const month = ('0' + (this.currentDate.getMonth() + 1)).slice(-2); // Se agrega 1 ya que los meses van de 0 a 11
      const day = ('0' + this.currentDate.getDate()).slice(-2);

      this.filtro.fecha = `${year}-${month}-${day}`;
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
  width: 80%; 
  max-width: 90vw;
  max-height: 90vh;
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
