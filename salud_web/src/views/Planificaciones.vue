<template>
  <div class="">
    <div>
      <div class="grid grid-cols-4">
        <div class="p-3 m-1">
          <h1>{{ title }}</h1>
        </div>

        <div class="p-3 m-1">
          <div class="form-group">
            <label for="kdx">Fecha</label>
            <input type="date" v-model="filtro.fecha" class="form-control" @change="listarRegistros" name="fecha" id="fecha" placeholder="Fecha" />
          </div>
        </div>

        <div class="flex p-3 m-1">
          <button
            class="form-control disabled:bg-green-200 bg-green-500 hover:bg-green-600 text-white py-2 px-4 m-1 rounded"
            title="Clonar semana" disabled
          >
            Clonar Semana
          </button>
        </div>

        <div class="flex justify-end p-3 m-1">
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
      <table class="table table-responsive">
        <thead class="thead-dark">
          <tr>
            <th>#</th>
            <th></th>
            <th>Centro</th>
            <th>Especialidad</th>
            <th>Consultorio</th>
            <th>Médico</th>
            <th>Fecha</th>
            <th>Horario</th>
            <th>Max<br/>Fichas</th>
            <th>Max<br/>Virtuales</th>
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
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 m-1 rounded"
                title="Editar"
              >
                <i class="fa-solid fa-pencil"></i>
              </button>
              <button
                @click="deleteRegistro(r)"
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 m-1 rounded"
                title="Eliminar"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
            <td align="left">{{ r.cnt_codigo }} - {{ r.cnt_descripcion }}</td>
            <td align="left">{{ r.esp_codigo}} - {{ r.esp_descripcion}}</td>
            <td align="left">{{ r.con_codigo }} - {{ r.con_descripcion }}</td>
            <td align="left">{{ r.doc_data.doc_paterno }} {{ r.doc_data.doc_materno }} {{ r.doc_data.doc_nombres }} </td>
            <td align="center">{{ r.pln_data.pln_fecha}}</td>
            <td align="center">{{ r.pln_data.pln_horario}}</td>
            <td align="right">{{ r.pln_data.pln_max_fichas}}</td>
            <td align="right">{{ r.pln_data.pln_max_virtuales}}</td>
            <td align="center">{{ r.pln_registado}}</td>
            <td align="center">{{ r.pln_estado}}</td>
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
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-6 space-y-6">
            <div class="grid grid-cols-2 gap-3">
              <div class="form-group">
                  <label for="pln_cnt_id" class="font-semibold">Centro</label>
                  <select v-model="reg.pln_cnt_id" class="form-control" name="pln_cnt_id" id="pln_cnt_id" placeholder="Centro" required>
                    <option value="0">-- seleccione --</option>
                    <option v-for="c in centros" :key="c.cnt_id" :value="c.cnt_id">{{ c.cnt_descripcion }} - {{ c.cnt_codigo }}</option>
                  </select>
              </div>
              <div class="form-group">
                  <label for="pln_esp_id" class="font-semibold">Especialidad</label>
                  <select v-model="reg.pln_esp_id" class="form-control" name="pln_esp_id" id="pln_esp_id" placeholder="Especialidad" required>
                    <option value="0">-- seleccione --</option>
                    <option v-for="e in especialidades" :key="e.esp_id" :value="e.esp_id">{{ e.esp_descripcion }} - {{ e.esp_codigo }}</option>
                  </select>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
                <div class="form-group">
                  <label for="pln_doc_id" class="font-semibold">Doctores</label>
                  <select v-model="reg.pln_doc_id" class="form-control" name="pln_doc_id" id="pln_doc_id" placeholder="Doctores" required >
                    <option value="0">-- seleccione --</option>
                    <option v-for="doc in doctores" :key="doc.doc_id" :value="doc.doc_id">{{ doc.doc_data.doc_paterno }} {{ doc.doc_data.doc_materno }} {{ doc.doc_data.doc_nombres }}</option>
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
            <div class="grid grid-cols-2 gap-4">

              <div class="form-group">
                <label for="fichas">Max Fichas:</label>
                <input type="number" v-model="reg.pln_data.pln_max_fichas" class="form-control" name="fichas" id="fichas" placeholder="Max Fichas" />
              </div>
              <div class="form-group">
                <label for="fichas">Max Fichas Virtuales:</label>
                <input type="number" v-model="reg.pln_data.pln_max_virtuales" class="form-control" name="fichas" id="fichas" placeholder="Max Fichas" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="col-md-6">
                <label for="fecha">Fecha:</label>
                <input type="date" v-model="reg.pln_data.pln_fecha" class="form-control" name="fecha" id="fecha" placeholder="Horario Inicio" />
              </div>
              <div class="col-md-6">
                <label for="horario">Horario:</label>
                <input v-model="reg.pln_data.pln_horario" class="form-control" name="horario" id="horario" placeholder="Horario Fin" />
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
import centrosService from '../services/centrosService';
import especialidadesService from '../services/especialidadesService';
import planificacionesService from '../services/planificacionesService';

import '@fortawesome/fontawesome-free/css/all.css';
import Paginator from '../components/Paginator.vue';
import doctoresService from '../services/doctoresService';
import consultoriosService from '../services/consultoriosService';

export default {
  data() {
    return {
      regs: [],
      reg: {            
         pln_data:{
            pln_max_fichas: '',
            pln_fecha: '',
            pln_horario: '',
            pln_max_virtuales: ''
        } 
      },
      title: "PLANIFICACIÓN",
      plural: "PLANIFICACIONES",
      singular: "PLANIFICACION",
      showModal: false,
      isEditing: false,
      centros: [],
      especialidades: [],
      doctores: [],
      consultorios: [],

      // dates
      currentDate: new Date(),
      // filtro
      filtro: { fecha:'', centro:'' },
      // paginator
      currentPage: 1,
      itemsPerPage: 10,
    };
  },

  mounted() {
    this.dates();
    this.listarRegistros();
    this.listarCentros();
    this.listarEspecialidades();
    this.listarConsultorios();
    this.listarDoctores();
  },

  methods: {
    async listarRegistros() {
      this.regs = [];
      try {
        this.regs = await planificacionesService.getData(this.filtro.fecha);
        console.log("plntores: ", this.regs);          
      } catch (error) {
        console.error("Error:", error.message);
      }
    },
    async listarCentros() {
      this.centros = [];
      try {
        this.centros = await centrosService.getData();
        console.log("Centros: ", this.centros);
      } catch (error) {
        console.error("Error:", error.message);
      }
    },
    async listarEspecialidades() {
      this.especialidades = [];
      try {
        this.especialidades = await especialidadesService.getData();
        console.log("Especialidades: ", this.especialidades);
      } catch (error) {
        console.error("Error:", error.message);
      }
    },

    async listarConsultorios() {
      this.consultorios = [];
      try {
        this.consultorios = await consultoriosService.getData();
        console.log("Especialidades: ", this.consultorios);
      } catch (error) {
        console.error("Error:", error.message);
      }
    },

    async listarDoctores() {
      this.doctores = [];
      try {
        this.doctores = await doctoresService.getData();
        console.log("Especialidades: ", this.doctores);
      } catch (error) {
        console.error("Error:", error.message);
      }
    },
    newRegistro() {
      this.isEditing = false;
      this.reg = {
        pln_data: {
          pln_max_fichas: '',
          pln_fecha: '',
          pln_horario: '',
          pln_max_virtuales: ''
        }
      };
      this.showModal = true;
    },
    editRegistro(reg) {
      this.isEditing = true;
      this.reg = Object.assign({}, reg);
      this.showModal = true;
    },

    async saveModal() {
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
}

<style>
/* ... (otros estilos) ... */

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px; /* Aumenta el ancho máximo del modal */
  width: 100%; /* Ocupará el 100% del ancho disponible */
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
  background-color: #f0f0f0;
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
