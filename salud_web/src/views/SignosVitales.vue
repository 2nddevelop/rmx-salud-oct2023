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
                <th>Fecha</th>
                <th>CI</th>
                <th>Nombres</th>
                <th>Frec Cardiaca</th>
                <th>Frec Respiratoria</th>
                <th>Presión Arterial</th>
                <th>Sat. Oxigeno</th>
                <th>Temp. Corporal</th>
                <th>Talla</th>
                <th>Peso</th>
                <th>Registrado</th>
                <th>E</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(r, index) in regs" v-bind:key="r.cli_id">
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
                <td >{{ r.sv_fecha }}</td>
                <td >{{ r.cli_data.cli_nit }}</td>
                <td >{{ r.cli_data.cli_paterno }} {{ r.cli_data.cli_materno }} {{ r.cli_data.cli_nombres }} </td>
                <td align="right">{{ r.sv_data.sv_frec_cardiaca }}</td>
                <td align="right">{{ r.sv_data.sv_frec_respiratoria }}</td>
                <td align="right">{{ r.sv_data.sv_presion_arterial }}</td>
                <td align="right">{{ r.sv_data.sv_sat_oxigeno }}</td>
                <td align="right">{{ r.sv_data.sv_temp_corporal }}</td>
                <td align="right">{{ r.sv_data.sv_talla }}</td>
                <td align="right">{{ r.sv_data.sv_peso }}</td>
                <td >{{ r.sv_registado }}</td>
                <td >{{ r.sv_estado }}</td>
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
                <!--div class="form-group">
                  <label for="cli_tcli_id" class="font-semibold">Tipo de Cliente</label>
                  <select v-model="reg.cli_tcli_id" class="form-control" name="cli_tcli_id" id="cli_tcli_id" placeholder="Tipo de Cliente" required>
                    <option value="0">-- Seleccione --</option>
                    <option v-for="tc in tiposClientes" :key="tc.tcli_id" :value="tc.tcli_id">{{ tc.tcli_descripcion }} - {{ tc.tcli_codigo }}</option>
                  </select>

                </div-->

                <div class="grid grid-cols-4 gap-3">
                  <div class="form-group">
                    <label for="CI">CI:</label>
                    <input v-model="reg.cli_data.cli_nit" class="form-control" name="ci" id="ci" placeholder="CI" disabled/>
                  </div>

                  <div class="form-group">
                    <label for="paterno">Paterno:</label>
                    <input v-model="reg.cli_data.cli_paterno" class="form-control" name="paterno" id="paterno" placeholder="Paterno" disabled/>
                  </div>

                  <div class="form-group">
                    <label for="materno">Materno:</label>
                    <input v-model="reg.cli_data.cli_materno" class="form-control" name="materno" id="materno" placeholder="Materno" disabled/>
                  </div>

                  <div class="form-group">
                    <label for="nombres">Nombres:</label>
                    <input v-model="reg.cli_data.cli_nombres" class="form-control" name="nombres" id="nombres" placeholder="Nombres" disabled/>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div class="form-group">
                    <label for="frec_cardiaca">Frecuencia Cardiaca:</label>
                    <input v-model="reg.sv_data.sv_frec_cardiaca" class="form-control" name="frec_cardiaca" id="frec_cardiaca" placeholder="Frecuencia cardiaca" />
                  </div>
                    <div class="form-group">
                      <label for="frec_respiratoria">Frecuencia Respiratoria:</label>
                      <input v-model="reg.sv_data.sv_frec_respiratoria" class="form-control" name="frec_respiratoria" id="frec_respiratoria" placeholder="Frecuencia respiratoria" />
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div class="form-group">
                    <label for="presion_arterial">Presion Arterial:</label>
                    <input v-model="reg.sv_data.sv_presion_arterial" class="form-control" name="presion_arterial" id="presion_arterial" placeholder="Presion Arterial" />
                  </div>
                  <div class="form-group">
                    <label for="sat_oxigeno">Saturacion de Oxigeno:</label>
                    <input v-model="reg.sv_data.sv_sat_oxigeno" class="form-control" name="sat_oxigeno" id="sat_oxigeno" placeholder="Saturación de oxigeno" />
                  </div>
                </div>
                <div class="grid grid-cols-3 gap-4">
                  <div class="form-group">
                    <label for="temp">Temperatura Corporal:</label>
                    <input v-model="reg.sv_data.sv_temp_corporal" class="form-control" name="temp" id="temp" placeholder="Temperatura corporal" />
                  </div>

                  <div class="form-group">
                    <label for="correo">Talla:</label>
                    <input v-model="reg.sv_data.sv_talla" class="form-control" name="talla" id="talla" placeholder="Talla" />
                  </div>

                  <div class="form-group">
                    <label for="peso">Peso:</label>
                    <input v-model="reg.sv_data.sv_peso" class="form-control" name="peso" id="peso" placeholder="Peso" />
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
    import signosVitalesService from '../services/signosVitalesService';
    
    export default {
      data() {
        return {
          regs: [],
          reg: { 
            sv_cli_id: 0,
            sv_fecha: '',
            cli_data: [],
            sv_data:{
              sv_talla: '0',
              sv_peso: '0',
              sv_temp_corporal: '0',
              sv_frec_cardiaca: '',
              sv_frec_respiratoria: '',
              sv_presion_arterial: '',
              sv_sat_oxigeno: ''
            }
          },
          title: "Signos Vitales",
          plural: "Signos Vitales",
          singular: "Signo Vital",
          showModal: false,
          isEditing: false,
          tiposClientes: [],
        };
      },
    
      mounted() {
        this.listarRegistros();
      },
    
      methods: {
        async listarRegistros() {
          this.regs = [];
          try {
            this.regs = await signosVitalesService.getData();
            console.log("Clientes: ", this.regs);          
          } catch (error) {
            console.error("Error:", error.message);
          }
        },
        
        newRegistro() {
          this.isEditing = false;
          this.reg = {
            sv_cli_id: 0,
            sv_fecha: '',
            cli_data: [],
            sv_data:{
              sv_talla: '',
              sv_peso: '',
              sv_temp_corporal: '',
              sv_frec_cardiaca: '',
              sv_frec_respiratoria: '',
              sv_presion_arterial: '',
              sv_sat_oxigeno: ''
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
    