<template>
  <div class="">
    <div>
      <div class="grid grid-cols-4">
        <div class="p-4 m-1">
          <h1>{{ title }}</h1>
        </div>
      </div>
    </div>
    <div style="overflow-x: auto">
      <table class="table table-responsive">
        <thead class="thead-dark">
          <tr>
            <th>#</th>
            <th></th>
            <th>ORIGEN</th>
            <th>TIPO DE MEMBRESIA</th>
            <th>NOMBRE y APELLIDO</th>
            <th>DIRECCION</th>
            <th>CELULAR</th>
            <th>CORREO</th>
            <th>REGISTRADO</th>
            <th>ESTADO</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(r, index) in regs" v-bind:key="r.usr_id">
            <td align="right">{{ index + 1 }}</td>
            <td align="center">
              <button 
                @click="editRegistro(r)"
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 m-1 rounded"
                title="Atención"
              >
                <i class="fa-solid fa-check"></i>
              </button>
              <button 
                @click="deleteRegistro(r)"
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 m-1 rounded"
                title="Signos"
              >
                <i class="fa-solid fa-heart-pulse fa-beat-fade"></i>
              </button>
            </td>
            <td align="left">{{ r.ori_codigo }} {{ r.ori_descripcion }}</td>
            <td align="left">{{ r.tme_codigo }} {{ r.tme_descripcion }}</td>
            <td align="left">{{ r.usr_primer_apellido }} {{ r.usr_segundo_apellido }} {{ r.usr_nombres }} </td>
            <td align="left">{{ r.usr_direccion }} </td>
            <td align="center">{{ r.usr_celular }}</td>
            <td align="center">{{ r.usr_email }}</td>
            <td align="center">{{ r.usr_registrado }}</td>
            <td align="center">{{ r.usr_estado }}</td>
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
          <div class="modal-body p-6 space-y-6">
            <div class="grid grid-cols-2 gap-3">
              <div class="form-group">
                <label for="fecha2" class="font-semibold">Fecha</label>
                <input type="date" v-model="filtro.fecha" class="form-control" name="fecha2" id="fecha2" placeholder="Fecha de hoy" disabled />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="form-group">
                <label for="usr_cli_id" class="font-semibold">Paciente</label>
                <select v-model="reg.usr_cli_id" class="form-control" name="usr_cli_id" id="usr_cli_id" placeholder="Centro" required disabled>
                  <option value="0">-- seleccione --</option>
                  <option v-for="c in origenes" :key="c.cli_id" :value="c.cli_id">{{ c.cli_data.cli_paterno }} {{ c.cli_data.cli_materno }} {{ c.cli_data.cli_nombres }}</option>
                </select>
              </div>
              <div class="form-group">
                  <label for="usr_pln_id" class="font-semibold">Planificacion</label>
                  <select v-model="reg.usr_pln_id" class="form-control" name="usr_pln_id" id="usr_pln_id" placeholder="Planificacion" required disabled>
                    <option value="0">-- seleccione --</option>
                    <option v-for="p in planificaciones" :key="p.pln_id" :value="p.pln_id"> [{{ p.esp_descripcion }}] {{ p.pln_data.pln_consultorio }} - {{ p.pln_data.pln_medico }} [{{ p.cnt_descripcion }}]</option>
                  </select>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div class="col-md-6">
                <label for="nro">Numero Ficha</label>
                <input v-model="reg.usr_nro_ficha" class="form-control" name="nro" id="nro" placeholder="Numero de Ficha" disabled />
              </div>
              <div class="col-md-6">
                <label for="kdx">Kardex Médico</label>
                <input v-model="reg.usr_kdx_medico" class="form-control" name="kdx" id="kdx" placeholder="Kardex Medico" />
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
import origenesService from '../../services/origenesService';
import userService from '../../services/userService';

import '@fortawesome/fontawesome-free/css/all.css';

export default {
  data() {
    return {
      regs: [],
      reg: {},
      title: "USUARIOS",
      plural: "Usuarios",
      singular: "Usuario",
      showModal: false,
      isEditing: false,

      currentDate: new Date(),
      filtro: {}
    };
  },

  mounted() {
    this.dates();
    this.listarRegistros();
    //this.listarOrigenes();
    //this.listarCentros();
  },

  methods: {
    async listarRegistros() {
      this.regs = [];
      try {
        this.regs = await userService.getData();
        console.log("Fichas: ", this.regs);
      } catch (error) {
        console.error("Error:", error.message);
      }
    },
    async listarOrigenes() {
      this.origenes = [];
      try {
        this.origenes = await origenesServiceService.getData();
        console.log("Centros: ", this.origenes);
      } catch (error) {
        console.error("Error:", error.message);
      }
    },

    async listarTiposMembresia() {
      this.tiposMembresia = [];
      try {
      this.tiposMembresia = await centrosService.getData();
      console.log('Registros: ', this.tiposMembresia);
      } catch (error) {
      console.error('Error:', error.message);
      }
    },

    newRegistro() {
      this.isEditing = false;
      this.reg = { };
      this.showModal = true;
    },
    editRegistro(reg) {
      this.isEditing = true;
      this.reg = { ...reg };
      this.showModal = true;
    },

    async saveModal() {
      this.reg.usr_usr_id = 1; 
      this.reg.usr_estado = "P";
      if (this.isEditing) {
        this.reg.usr_estado = "S";
        const updatedReg = await userService.updateData(this.reg);
      } else {
        const savedReg = await userService.saveData(this.reg);
        this.regs.push(savedReg);
      }
      this.listarRegistros();
      this.closeModal();
    },

    async deleteRegistro(reg) {
      const confirmed = window.confirm("¿Estás seguro de tomar Signos Vitales?");
      if (confirmed) {
        try {
          const index = this.regs.findIndex(item => item.usr_id === reg.usr_id);
          if (index !== -1) {
            reg.usr_usr_id = 1;
            reg.usr_estado = "X";
            const updatedReg = await userService.updateData(reg);
          } else {
            console.error('No se encontró el registro para eliminar');
          }
        } catch (error) {
          console.error('Error al eliminar el registro:', error);
        }
        this.listarRegistros();
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
