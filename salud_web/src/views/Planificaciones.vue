<template>
  <div class="">
    <div>
      <div class="grid grid-cols-4">
        <div class="p-1 m-1">
          <h1>{{ title }}</h1>
        </div>

        <div class="p-1 m-1">
          <div class="form-group">
            <label for="kdx">Fecha</label>
            <input type="date" v-model="filtro.fecha" class="form-control" @change="listarRegistros" name="fecha" id="fecha" placeholder="Fecha" />
          </div>
        </div>

        <div class="flex p-1 m-1">
          <button
            class="form-control disabled:bg-green-200 bg-green-500 hover:bg-green-600 text-white py-2 px-4 m-1 rounded"
            title="Clonar semana" disabled
          >
            Clonar Semana
          </button>
        </div>

        <div class="flex justify-end p-1 m-1">
          <button
            @click="newRegistro()"
            class="form-control bg-green-500 hover:bg-green-600 text-white py-2 px-4 m-1 rounded"
            title="Nuevo"
          >
            + Nuevo
          </button>
        </div>
      </div>
    </div>
    <div style="overflow-x: auto">
      <table ref="myTable" class="table table-responsive" cellspacing="0" width="100%">
        <thead class="thead-dark">
          <tr>
            <th>#</th>
            <th></th>
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
            <th>Duracion</th>
            <th>Registrado</th>
            <th>E</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(r, index) in regs" v-bind:key="r.pln_id">
            <td align="right">{{ index + 1 }}</td>
            <td align="center">
              <button
                @click="editRegistro(r)"
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-1 m-1 rounded"
                title="Editar"
              >
                <i class="fa-solid fa-pencil"></i>
              </button>
              <button
                @click="deleteRegistro(r)"
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-1 m-1 rounded"
                title="Eliminar"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
              <button
                @click="verRegistro(r)"
                class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-1 m-1 rounded"
                title="Editar"
              >
                <i class="fa-solid fa-eye"></i>
              </button>
            </td>
            <td align="left" style="background-color: beige;">{{ r.cnt_descripcion }}</td>
            <td align="left" style="background-color: beige;">{{ r.esp_descripcion}}</td>
            <td align="left" style="background-color: beige;">
              {{ r.con_codigo }} - {{ r.con_descripcion }}<br>
              {{ r.doc_data.doc_paterno }} {{ r.doc_data.doc_materno }} {{ r.doc_data.doc_nombres }}
            </td>
            <td align="center">{{ r.pln_data.pln_fecha}}</td>
            <td align="center">{{ r.pln_data.pln_horario_inicio}}</td>
            <td align="center">{{ r.pln_data.pln_horario_fin  }}</td>
            <td align="right">{{ r.pln_data.pln_max_fichas}}</td>
            <td align="right">{{ r.pln_data.pln_max_virtuales}}</td>
            <td align="right">{{ r.pln_data.pln_duracion}}</td>
            <td align="center">{{ r.pln_registrado.substring(0, 10)}}</td>
            <td align="center">
              <span v-if="r.pln_estado == 'X'" class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{{ r.pln_estado }}</span>
              <span v-if="r.pln_estado == 'A'" class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{{ r.pln_estado }}</span>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="13">Son n {{ plural }}</td>
          </tr>
        </tfoot>
      </table>
      <div>
      <paginator
        :current-page="currentPage"
        :total-pages="totalPages"
        :prev-page="prevPage"
        :next-page="nextPage"
      ></paginator>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div
            class="model-header flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
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
                <label for="pln_cnt_id" class="font-semibold">Centro</label>
                <select v-model="reg.pln_cnt_id" class="form-control" @change="listarConsultorios(reg.pln_cnt_id)" name="pln_cnt_id" id="pln_cnt_id" placeholder="Centro" required>
                  <option value="0">-- seleccione --</option>
                  <option v-for="c in centros" :key="c.cnt_id" :value="c.cnt_id">{{ c.cnt_descripcion }} - {{ c.cnt_codigo }}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="pln_con_id" class="font-semibold">Consultorio</label>
                <select v-model="reg.pln_con_id" class="form-control" name="pln_con_id" id="pln_con_id" placeholder="Consultorio" required >
                  <option value="0">-- seleccione --</option>
                  <option v-for="con in consultorios" :key="con.con_id" :value="con.con_id"> {{ con.con_codigo }}  - {{ con.con_descripcion }}</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="form-group">
                <label for="pln_esp_id" class="font-semibold">Especialidad</label>
                <select v-model="reg.pln_esp_id" class="form-control" name="pln_esp_id" id="pln_esp_id" placeholder="Especialidad" required>
                  <option value="0">-- seleccione --</option>
                  <option v-for="e in especialidades" :key="e.esp_id" :value="e.esp_id">{{ e.esp_descripcion }} - {{ e.esp_codigo }}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="pln_doc_id" class="font-semibold">Doctores</label>
                <select v-model="reg.pln_doc_id" class="form-control" name="pln_doc_id" id="pln_doc_id" placeholder="Doctores" required >
                  <option value="0">-- seleccione --</option>
                  <option v-for="doc in doctores" :key="doc.doc_id" :value="doc.doc_id">{{ doc.doc_data.doc_paterno }} {{ doc.doc_data.doc_materno }} {{ doc.doc_data.doc_nombres }}</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-4">
              <div class="form-group">
                <label for="fichas">Max Fichas:</label>
                <input type="number" v-model="reg.pln_data.pln_max_fichas" class="form-control" name="fichas" id="fichas" placeholder="Max Fichas" />
              </div>
              <div class="form-group">
                <label for="fichas">Max Fichas Virtuales:</label>
                <input type="number" v-model="reg.pln_data.pln_max_virtuales" class="form-control" name="fichas" id="fichas" placeholder="Max Fichas" />
              </div>
              <div class="col-md-6">
                <label for="fecha">Fecha:</label>
                <input type="date" v-model="reg.pln_data.pln_fecha" class="form-control" name="fecha" id="fecha" placeholder="Fecha" />
              </div>
            </div>

            <div class="grid grid-cols-3 gap-4">
              <div >
                <label for="horarioini">Horario Inicio:</label>
                <input type="time" v-model="reg.pln_data.pln_horario_inicio" class="form-control" name="horarioini" id="horarioini" placeholder="Horario Inicio" />
              </div>
              <div class="col-md-6">
                <label for="horariofin">Horario Fin:</label>
                <input type="time" v-model="reg.pln_data.pln_horario_fin" class="form-control" name="horariofin" id="horariofin" placeholder="Horario Fin" />
              </div>
              <div class="col-md-6">
                <label for="duracion">Duracion:</label>
                <input v-model="reg.pln_data.pln_duracion" class="form-control" name="duracion" id="duracion" placeholder="Duracion" />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-1">
              <div class="col-md-6"  style="font-size: x-small; display: flex;">
                <div v-for="(r, index) in reg.pln_data_disponibles" class="grid grid-cols-5 gap-1" style="display: flex;" v-bind:key="index">
                  <template v-if="r.pln_fch_id == 0">
                    <button class="bg-green-400 text-white font-bold py-2 px-4 m-1 rounded">
                      {{ r.pln_hora }}
                    </button>
                  </template>
                  <template v-else>
                    <button class="bg-gray-300 text-black font-bold py-2 px-4 m-1 rounded">
                      {{ r.pln_hora }}
                    </button>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <!-- Modal footer -->
          <div class="modal-footer">
            <button @click="saveModal" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 m-1 rounded" :title="isEditing ? 'Actualizar' : 'Guardar'">
              {{ isEditing ? "Actualizar" : "Guardar" }}
            </button>
            <label></label>
          </div>
        </div>
      </div>
    </div>


    <!-- Modal Ver-->
    <div v-if="showModalVer" class="modal-overlay">
        <div class="modal-content">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div
            class="model-header flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
          >
            <h2
              class="modal-title text-xl font-semibold text-gray-900 dark:text-white"
            >
              {{ isEditing ? "VER " : "VER " }} {{ singular }}
            </h2>
            <button
              type="button"
              @click="closeModalVer()"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="defaultModal"
            >
              <i class="fa-solid fa-close"></i>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="modal-body p-6 space-y-6">
            

            <div class="grid grid-cols-2 gap-4">
              <div class="form-group">
                <label for="fichas">Max Fichas:</label>
                <input type="number" v-model="reg.pln_data.pln_max_fichas" class="form-control" name="fichas" id="fichas" placeholder="Max Fichas" disabled/>
              </div>
              <div class="form-group">
                <label for="fichas">Max Fichas Virtuales:</label>
                <input type="number" v-model="reg.pln_data.pln_max_virtuales" class="form-control" name="fichas" id="fichas" placeholder="Max Fichas" disabled/>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="col-md-6">
                <label for="fecha">Fecha:</label>
                <input type="date" v-model="reg.pln_data.pln_fecha" class="form-control" name="fecha" id="fecha" placeholder="Fecha" disabled/>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div >
                <label for="horarioini">Horario Inicio:</label>
                <input type="time" v-model="reg.pln_data.pln_horario_inicio" class="form-control" name="horarioini" id="horarioini" placeholder="Horario Inicio" disabled/>
              </div>
              <div class="col-md-6">
                <label for="horariofin">Horario Fin:</label>
                <input type="time" v-model="reg.pln_data.pln_horario_fin" class="form-control" name="horariofin" id="horariofin" placeholder="Horario Fin" disabled/>
              </div>
            </div>
            <div class="grid grid-cols-1 gap-1">
              <div class="col-md-6"  style="font-size: x-small; display: flex;">
                <div v-for="(r, index) in reg.pln_data_disponibles" class="grid grid-cols-5 gap-1" style="display: flex;" v-bind:key="index">
                  <template v-if="r.pln_fch_id == 0">
                    <button class="bg-green-400 text-white font-bold py-2 px-4 m-1 rounded">
                      {{ r.pln_hora }}
                    </button>
                  </template>
                  <template v-else>
                    <button class="bg-gray-300 text-black font-bold py-2 px-4 m-1 rounded">
                      {{ r.pln_hora }}
                    </button>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
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

import Paginator from '../components/Paginator.vue';

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
      title: "PLANIFICACIÓN",
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
      // paginator
      currentPage: 1,
      itemsPerPage: 10,

      //disponibles horas
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
      this.initDataTable();
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
    initDataTable() {
      if (this.dataTable) {
        this.dataTable.destroy();
      }
      const dataTableOptions = {
      };
      this.dataTable = $(this.$refs.myTable).DataTable(dataTableOptions);
    },
    newRegistro() {
      this.isEditing = false;
      this.reg = {
        pln_data: {
          pln_max_fichas: '10',
          pln_fecha: '',
          pln_horario_inicio: '',
          pln_horario_fin: '',
          pln_max_virtuales: '5',
          pln_duracion: '20'
        }
      };
      this.showModal = true;
    },
    editRegistro(reg) {
      this.listarConsultorios(reg.pln_cnt_id);
      this.isEditing = true;
      this.reg = Object.assign({}, reg);
      this.showModal = true;
    },

    verRegistro(reg) {
      //this.listarConsultorios(reg.pln_cnt_id);
      //this.isEditing = true;
      this.reg = Object.assign({}, reg);
      this.showModalVer = true;
    },

    sumarMinutosAHora(hora, minutosASumar) {
      var partesHora = hora.split(":");
      var horas = parseInt(partesHora[0]);
      var minutos = parseInt(partesHora[1]);
      
      minutos += minutosASumar;
      horas += Math.floor(minutos / 60);
      minutos = minutos % 60;
      horas = horas % 24;
      var horaResultante = (horas < 10 ? "0" : "") + horas + ":" + (minutos < 10 ? "0" : "") + minutos;
      return horaResultante;
    },

    async saveModal() {
      // calcula horas
      this.reg.pln_data_disponibles = [];
      let hora = this.reg.pln_data.pln_horario_inicio;
      let disponibles = [];
      for(let i = 0; i < this.reg.pln_data.pln_max_fichas; i++) {
        let item = {};
        item = {pln_fch_id: 0, pln_hora: hora};
        disponibles.push(item);
        // 777 hora = this.sumarMinutosAHora(hora, this.lapso);
        hora = this.sumarMinutosAHora(hora, this.reg.pln_data.pln_duracion); // a pedido de Hosman y cidar
      }
      
      // actualiza
      this.reg.pln_data_disponibles = disponibles;
      this.reg.pln_usr_id = 1; 
      this.reg.pln_estado = "A";
      if (this.isEditing) {
        const updatedReg = await planificacionesService.updateData(this.reg);
        const index = this.regs.findIndex(item => item.pln_id === updatedReg.pln_id);
        if (index !== -1) {
          this.regs.splice(index, 1, updatedReg);
        }
      } else {
        const savedReg = await planificacionesService.saveData(this.reg);
        this.regs.push(savedReg);
      }
      this.listarRegistros();
      this.closeModal();
    },

    async deleteRegistro(reg) {
      const confirmed = window.confirm("¿Estás seguro de eliminar este registro?");
      if (confirmed) {
        try {
          const index = this.regs.findIndex(item => item.pln_id === reg.pln_id);
          if (index !== -1) {
            reg.pln_usr_id = 1;
            reg.pln_estado = "X"; 
            await planificacionesService.deleteData(reg); 
            this.regs.splice(index, 1); 
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

    closeModalVer() {
      this.showModalVer = false;
    },

    dates() {
      const year = this.currentDate.getFullYear();
      const month = ('0' + (this.currentDate.getMonth() + 1)).slice(-2); // Se agrega 1 ya que los meses van de 0 a 11
      const day = ('0' + this.currentDate.getDate()).slice(-2);

      this.filtro.fecha = `${year}-${month}-${day}`;
    },

    // paginator
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    watch: {
      paginatedRegs() {
        this.$nextTick(() => {
          if (this.$refs.myTable) {
            $(this.$refs.myTable).DataTable().destroy(); // Destruye DataTable existente antes de recrearlo
            $(this.$refs.myTable).DataTable({
              // Configuración de DataTables según tus necesidades
              paging: true,
              searching: true,
              // ... más opciones según sea necesario
            });
          }
        });
      },
    },
    components: {
      DataTable,
    },
  },

  computed: {
    // paginator
    totalPages() {
      return Math.ceil(this.regs.length / this.itemsPerPage);
    },
    paginatedRegs() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.regs.slice(startIndex, endIndex);
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