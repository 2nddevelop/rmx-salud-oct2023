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
            <th>ÁREA</th>
            <th>CODIGO</th>
            <th>DESCRIPCION</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(r, index) in regs" v-bind:key="r.gp_id">
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
            <td align="right">{{ r.ar_codigo }}</td>
            <td align="right">{{ r.gp_codigo }}</td>
            <td align="right">{{ r.gp_descripcion }}</td>
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
    <div v-if="showModal" class="modal-overlay items-center justify-center">
      <div class="relative w-full max-w-2xl max-h-full">
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
            <div class="grid grid-cols-3 m-0">
              <div class="p-6 m-0">
                <label for="gp_ar_id">Código Área</label>
                <select v-model="gp_ar_id" class="form-control"
                  name="gp_ar_id" id="gp_ar_id"
                  placeholder="Código Área"
                  required>
                  <option value="0">-- seleccione --</option>
                  <option v-for="a in areas" :key="a.ar_id" :value="a.ar_id">{{ a.ar_descripcion }} - {{ a.ar_codigo }}</option>
                </select>
              </div>
            </div>
            <div>
              <div class="col-md-6">
                <label for="codigo">Codigo:</label>
                <input
                  v-model="reg.gp_codigo"
                  class="form-control"
                  name="codigo"
                  id="codigo"
                  placeholder="Codigo"
                />
              </div>
              <div class="col-md-6">
                <label for="descripcion">Descripcion:</label>
                <input
                  v-model="reg.gp_descripcion"
                  class="form-control"
                  name="descripcion"
                  id="descripcion"
                  placeholder="Descripcion"
                />
              </div>
            </div>
          </div>
          <!-- Modal footer -->
          <div
            class="flex justify-end items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
          >
            <button
              @click="saveModal"
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 m-1 rounded"
            >
              {{ isEditing ? "Actualizar" : "Guardar" }}
            </button>
            <button
              @click="closeModal()"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 m-1 rounded"
            >
              Cerrar
            </button>
            <!--button
              data-modal-hide="defaultModal"
              type="button"
              class="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 m-1 rounded"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              I accept
            </button-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import galponesService from '../services/galponesService';
import areasService from "../services/areasService";
//import { mapActions } from 'vuex';

export default {
  data() {
    return {
      regs: [],
      reg: {},
      title: "LISTADO DE GALPONES",
      plural: "Galpones",
      singular: "Galpon",
      showModal: false,
      isEditing: false,
      // -- otros
      areas: [],
    }
  },

  mounted() {
      // Llama al método por defecto
      this.listarRegistros();
      this.listarAreas();
    },

  methods: {
    //...mapActions('auth/', ['login']),
    async listarRegistros() {
      this.regs = [];
      try {
        this.regs = await galponesService.getData();
        console.log('Registros: ', this.regs);
        this.regs.forEach((element) => {
        });
      } catch (error) {
        // Manejar el error de inicio de sesión aquí
        console.error('Error:', error.message);
      }
    },
    async listarAreas() {
      this.areas = [];
      try {
        this.areas = await areasService.getData();
        console.log("Areas: ", this.areas);
      } catch (error) {
        console.error("Error:", error.message);
      }
    },
    newRegistro() {
      this.isEditing = false;
      this.reg = {};
      this.openModal(false);
    },
    editRegistro(reg) {
      this.isEditing = true;
      this.reg = { ...reg };
      this.openModal(true);
      console.log("Reg >>> ", this.reg);
    },
    async saveModal() {
      console.log("Reg: ", this.reg);
      this.reg.gp_usr_id = 1; // <----- Avito completar
      this.reg.gp_estado = "A";
      if (this.isEditing) {
        const updatedReg = await galponesService.updateData(this.reg);
        this.regs[
          this.regs.findIndex((reg) => reg.gp_id === updatedReg.gp_id)
        ] = updatedReg;
      } else {
        const savedReg = await galponesService.saveData(this.reg);
        this.regs.push(savedReg);
      }
      this.closeModal();
    },
    async deleteRegistro(reg) {
      this.reg = { ...reg };

      const indexL = this.regs.findIndex((regX) => reg.gp_id === regX.gp_id);
      console.log("Index: ", indexL);
      console.log("Data: ", this.regs[indexL]);

      this.reg.gp_usr_id = 1; // <----- Avito completar
      this.reg.gp_estado = "X";
      if (window.confirm("¿Estás seguro de eliminar este registro?")) {
        const savedReg = await galponesService.deleteData(this.reg);
        this.regs.splice(indexL, 1);
      }
    },
    openModal(editing) {
      this.showModal = true;
      this.isEditing = editing;
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

/* Modal content styles */
.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
}

/* Modal title styles */
.modal-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
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

/* Modal footer styles */
.modal-footer {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}
</style>
