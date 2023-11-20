<template>
    <div>
      <div class="grid grid-cols-2">
          <div class="p-6 m-1">
            <h1>{{ title }}</h1>
          </div>
          <div class="flex justify-end p-6 m-1">
            <button @click="newRegistro" class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 m-1 rounded" title="Nuevo">
              + Nuevo
            </button>
          </div>
      </div>
      <div style="overflow-x: auto">
        <table class="table table-responsive">
          <thead class="thead-dark">
            <tr>
              <th>#</th>
              <th></th>
              <th>CODIGO</th>
              <th>DESCRIPCION</th>
              <th>REGISTRADO</th>
              <th>ESTADO</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(r, index) in regs" :key="r.esp_id">
              <td width="3%" align="right">{{ index + 1 }}</td>
              <td>
                <button 
                    @click="editRegistro(r)" 
                    class="bg-blue-500 hover-bg-blue-600 text-white font-bold py-2 px-4 m-1 rounded" 
                    title="Editar"
                >                    
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 20 20" 
                        fill="currentColor" 
                        class="w-5 h-5"
                    >
                    <path 
                        d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z"
                    />
                    </svg>
                </button>
                <button @click="deleteRegistro(r)" 
                  class="bg-red-500 hover-bg-red-600 text-white font-bold py-2 px-4 m-1 rounded" 
                  title="Eliminar">
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
              <td align="right">{{ r.esp_codigo }}</td>
              <td align="right">{{ r.esp_descripcion }}</td>
              <td align="right">{{ r.esp_registado }}</td>
              <td align="right">{{ r.esp_estado }}</td>
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
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h2 class="modal-title text-xl font-semibold text-gray-900 dark:text-white">
                  {{ isEditing ? "Editar " : "Nuevo " }} {{ singular }}
                </h2>
                <button type="button" @click="closeModal" class="text-gray-400 bg-transparent hover-bg-gray-200 hover-text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover-bg-gray-600 dark:hover-text-white" data-modal-hide="defaultModal">
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span class="sr-only">Cerrar modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-6">
              <div class="grid grid-cols-2 m-0">
                <div>
                  <label for="codigo">Codigo:</label>
                  <input v-model="reg.esp_codigo" class="form-control" name="codigo" id="codigo" placeholder="Codigo" />
                </div>
                <div>
                  <label for="descripcion">Descripcion:</label>
                  <input v-model="reg.esp_descripcion" class="form-control" name="descripcion" id="descripcion" placeholder="Descripcion" />
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

  import especialidadesService from '../../services/especialidadesService';
  export default {
    data() {
      return {
        regs: [],
        reg: {},
        title: "LISTADO DE ESPECIALIDADES",
        plural: "Especialidades",
        singular: "Especialidad",
        showModal: false,
        isEditing: false,
      };
    },
    mounted() {
      this.listarRegistros();
    },

    methods: {
        async listarRegistros() {
            try {
            this.regs = await especialidadesService.getData();
            console.log('Registros: ', this.regs);
            } catch (error) {
            console.error('Error:', error.message);
            }
        },
        newRegistro() {
            this.isEditing = false;
            this.reg = {};
            this.showModal = true;
        },
        editRegistro(reg) {
            this.isEditing = true;
            this.reg = { ...reg };
            this.showModal = true;
        },
        async saveModal() {
              this.reg.esp_usr_id = 1; 
              this.reg.esp_estado = "A";   
            if (this.isEditing) {
                const updatedReg = await especialidadesService.updateData(this.reg);
                const index = this.regs.findIndex(item => item.esp_id === updatedReg.esp_id);
                if (index !== -1) {
                  this.regs.splice(index, 1, updatedReg);
                }
            } else {
                const savedReg = await especialidadesService.saveData(this.reg);
                this.regs.push(savedReg);
            }
            this.closeModal();
        },

        async deleteRegistro(reg) {
          const confirmed = window.confirm("¿Estás seguro de eliminar este registro?");
          if (confirmed) {
            try {
              const index = this.regs.findIndex(item => item.esp_id === reg.esp_id);
              if (index !== -1){
                reg.esp_usr_id = 1; 
                reg.esp_estado = "X";
                await especialidadesService.deleteData(reg); 
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
              this.isEditing = false;
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

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
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

/* Modal footer styles 
.modal-footer {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}*/
</style>
