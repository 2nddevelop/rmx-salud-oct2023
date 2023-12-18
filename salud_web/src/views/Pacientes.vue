  <template>
      <div class="">
        <div>
          <div class="grid grid-cols-3">
            <div class="p-6 m-1">
              <h1>{{ title }}</h1>
            </div>
            <div></div>
            <div class="flex justify-end p-6 m-1">
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
                <th>Tipo</th>
                <th>CI<br>
                  <input type="text" @change="buscarRegistros" v-model="filtro.cli_nit" class="form-control input"></th>
                <th>Paterno<br>
                  <input type="text" @change="buscarRegistros" v-model="filtro.cli_paterno" class="form-control input"></th>
                <th>Materno<br>
                  <input type="text" @change="buscarRegistros" v-model="filtro.cli_materno" class="form-control input"></th>
                <th>Nombres<br>
                  <input type="text" @change="buscarRegistros" v-model="filtro.cli_nombres" class="form-control input"></th>
                <th>
                  Teléfono<br>
                  Celular
                </th>
                <th>Dirección</th>
                <th>Fec. Nacimiento</th>
                <th>Registrado</th>
                <th>E</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(r, index) in regs" v-bind:key="r.cli_id">
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
                <td align="left">{{ r.tcli_codigo }}</td>
                <td align="right">{{ r.cli_data.cli_nit }}</td>
                <td align="left">{{ r.cli_data.cli_paterno }}</td>
                <td align="left">{{ r.cli_data.cli_materno }}</td>
                <td align="left">{{ r.cli_data.cli_nombres }}</td>
                <td align="right">
                  {{ r.cli_data.cli_telefono }}<br>
                  {{ r.cli_data.cli_celular }}
                </td>
                <td align="left">{{ r.cli_data.cli_direccion }}</td>
                <td align="left">{{ r.cli_data.cli_fec_nac }}</td>
                <td align="center">{{ r.cli_registrado.substring(0, 10) }}</td>
                <td align="center">
                  <span v-if="r.cli_estado == 'X'" class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{{ r.cli_estado }}</span>
                  <span v-if="r.cli_estado == 'A'" class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{{ r.cli_estado }}</span>
                </td>
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
                  <i class="fa-solid fa-close"></i>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <!-- Modal body -->
              <div class="p-6 space-y-1">
                <div class="form-group">
                  <label for="cli_tcli_id" class="font-semibold">Tipo de Cliente</label>
                  <select v-model="reg.cli_tcli_id" class="form-control" name="cli_tcli_id" id="cli_tcli_id" placeholder="Tipo de Cliente" required>
                    <option value="0">-- Seleccione --</option>
                    <option v-for="tc in tiposClientes" :key="tc.tcli_id" :value="tc.tcli_id">{{ tc.tcli_descripcion }} - {{ tc.tcli_codigo }}</option>
                  </select>
                </div>

                <div class="grid grid-cols-4 gap-1">
                  <div class="form-group">
                    <label for="paterno">Paterno:</label>
                    <input v-model="reg.cli_data.cli_paterno" class="form-control" name="paterno" id="paterno" placeholder="Paterno" />
                  </div>

                  <div class="form-group">
                    <label for="materno">Materno:</label>
                    <input v-model="reg.cli_data.cli_materno" class="form-control" name="materno" id="materno" placeholder="Materno" />
                  </div>

                  <div class="form-group">
                    <label for="nombres">Nombres:</label>
                    <input v-model="reg.cli_data.cli_nombres" class="form-control" name="nombres" id="nombres" placeholder="Nombres" />
                  </div>

                  <div class="form-group">
                    <label for="CI">CI:</label>
                    <input v-model="reg.cli_data.cli_nit" class="form-control" name="ci" id="ci" placeholder="CI" />
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-1">
                  <div class="form-group">
                    <label for="telefono">Teléfono:</label>
                    <input v-model="reg.cli_data.cli_telefono" class="form-control" name="telefono" id="telefono" placeholder="Teléfono" />
                  </div>

                  <div class="form-group">
                    <label for="celular">Celular:</label>
                    <input v-model="reg.cli_data.cli_celular" class="form-control" name="celular" id="celular" placeholder="Celular" />
                  </div>
                </div>
                <div class="form-group">
                  <label for="direccion">Dirección:</label>
                  <input v-model="reg.cli_data.cli_direccion" class="form-control" name="direccion" id="direccion" placeholder="Dirección" />
                </div>
                <div class="grid grid-cols-2 gap-1">
                  <div class="form-group">
                    <label for="fecnac">Fecha Nacimiento:</label>
                    <input type="date" v-model="reg.cli_data.cli_fec_nac" class="form-control" name="fecnac" id="fecnac" placeholder="Fecha Nacimiento" />
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-1">
                  <div class="form-group">
                    <label for="correo">Correo:</label>
                    <input type="email" v-model="reg.cli_data.cli_correo" class="form-control" name="correo" id="correo" placeholder="Correo" />
                  </div>

                  <div class="form-group">
                    <label for="clave">Clave:</label>
                    <input type="password" v-model="reg.cli_data.cli_clave" class="form-control" name="clave" id="clave" placeholder="Clave" />
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
    import tiposClienteService from '../services/tiposClienteService';
    import clientesService from '../services/clientesService';
    
    import '@fortawesome/fontawesome-free/css/all.css';

    export default {
      data() {
        return {
          regs: [],
          reg: { 
            cli_data:{
              cli_paterno: '',
              cli_materno: '',
              cli_nombres: '',
              cli_nit: '',
              cli_telefono: '',
              cli_celular: '',
              cli_direccion: '',
              cli_correo: '',
              cli_clave: '',
              cli_fec_nac: '',
            }
          },
          title: "PACIENTES",
          plural: "Pacientes",
          singular: "Paciente",
          showModal: false,
          isEditing: false,
          tiposClientes: [],
          filtro: { cli_nit: "", cli_paterno: "", cli_materno: "", cli_nombres: "" }
        };
      },
    
      mounted() {
        this.listarRegistros();
        this.listarTiposCliente();
      },
    
      methods: {
        async listarRegistros() {
          this.regs = [];
          try {
            this.regs = await clientesService.getData();
          } catch (error) {
            console.error("Error:", error.message);
          }
        },
        async buscarRegistros() {
          this.regs = [];
          try {
            this.regs = await clientesService.getBuscar(this.filtro.cli_nit, this.filtro.cli_paterno, this.filtro.cli_materno, this.filtro.cli_nombres);
          } catch (error) {
            console.error("Error:", error.message);
          }
        },
        async listarTiposCliente() {
          this.tiposClientes = [];
          try {
            this.tiposClientes = await tiposClienteService.getData();
          } catch (error) {
            console.error("Error:", error.message);
          }
        },
        
        newRegistro() {
          this.isEditing = false;
          this.reg = {
            cli_data: {
            cli_paterno: '',
            cli_materno: '',
            cli_nombres: '',
            cli_nit: '',
            cli_telefono: '',
            cli_celular: '',
            cli_direccion: '',
            cli_correo: '',
            cli_clave: '',
            cli_fec_nac: '',
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
          this.reg.cli_usr_id = 1; 
          this.reg.cli_estado = "A";
          if (this.isEditing) {
            const updatedReg = await clientesService.updateData(this.reg);
            const index = this.regs.findIndex(item => item.cli_id === updatedReg.cli_id);
            if (index !== -1) {
              this.regs.splice(index, 1, updatedReg);
            }
          } else {
            const savedReg = await clientesService.saveData(this.reg);
            this.regs.push(savedReg);
          }
          this.listarRegistros();
          this.closeModal();
        },
        
        async deleteRegistro(reg) {
          const confirmed = window.confirm("¿Estás seguro de eliminar este registro?");
          if (confirmed) {
            try {
              const index = this.regs.findIndex(item => item.cli_id === reg.cli_id);
              if (index !== -1) {
                reg.cli_usr_id = 1;
                reg.cli_estado = "X"; 
                await clientesService.deleteData(reg); 
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
  