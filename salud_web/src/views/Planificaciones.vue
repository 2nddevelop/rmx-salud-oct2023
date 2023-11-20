<template>
  <div class="">
    <div>
      <div class="grid grid-cols-2">
        <div class="p-6 m-1">
          <h1>{{ title }}</h1>
        </div>
        <div class="flex justify-end p-6 m-1">
          <button
            @click="newRegistro()"
            class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 m-1 rounded"
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
            <th>CENTRO</th>
            <th>ESPECIALIDAD / MEDICO / CONSULTORIO</th>
            <th>MAX FICHAS</th>
            <th>FECHA</th>
            <th>HORARIO</th>
            <th>REGISTRADO</th>
            <th>ESTADO</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(r, index) in regs" v-bind:key="r.pln_id">
            <td align="right">{{ index + 1 }}</td>
            <td>
              <button
                @click="editRegistro(r)"
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 m-1 rounded"
                title="Editar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z"
                  />
                </svg>
              </button>
              <button
                @click="deleteRegistro(r)"
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 m-1 rounded"
                title="Eliminar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </td>
            <td align="right">{{ r.cnt_codigo }} - {{ r.cnt_descripcion }}</td>
            <td align="right">
                <strong>{{ r.esp_descripcion}}</strong><br>
                {{ r.pln_data.pln_medico}}<br>
                {{ r.pln_data.pln_consultorio}}
            </td>
            <td align="right">{{ r.pln_data.pln_max_fichas}}</td>
            <td align="right">{{ r.pln_data.pln_fecha}}</td>
            <td align="right">{{ r.pln_data.pln_horario}}</td>
            <td align="right">{{ r.pln_registado}}</td>
            <td align="right">{{ r.pln_estado}}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="13">Son n {{ plural }}</td>
          </tr>
        </tfoot>
      </table>
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
                  <label for="medico">Medico:</label>
                  <input v-model="reg.pln_data.pln_medico" class="form-control" name="medico" id="medico" placeholder="Medico" />
                </div>
                <div class="form-group">
                  <label for="consultorio">Consultorio:</label>
                  <input v-model="reg.pln_data.pln_consultorio" class="form-control" name="consultorio" id="consultorio" placeholder="Consultorio" />
                </div>
            </div>
            <div class="form-group">
              <label for="fichas">Max Fichas:</label>
              <input type="number" v-model="reg.pln_data.pln_max_fichas" class="form-control" name="fichas" id="fichas" placeholder="Max Fichas" />
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

export default {
  data() {
    return {
      regs: [],
      reg: {            
         pln_data:{
            pln_medico: '',
            pln_consultorio: '',
            pln_max_fichas: '',
            pln_fecha: '',
            pln_horario: ''
        } 
      },
      title: "LISTADO DE PLANIFICACIONES",
      plural: "PLANIFICACIONES",
      singular: "PLANIFICACION",
      showModal: false,
      isEditing: false,
      centros: [],
      especialidades: [],
    };
  },

  mounted() {
    this.listarRegistros();
    this.listarCentros();
    this.listarEspecialidades();
  },

  methods: {
    async listarRegistros() {
      this.regs = [];
      try {
        this.regs = await planificacionesService.getData();
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
    newRegistro() {
      this.isEditing = false;
      this.reg = {
        pln_data: {
          pln_medico: '',
          pln_consultorio: '',
          pln_max_fichas: '',
          pln_fecha: '',
          pln_horario: ''
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
