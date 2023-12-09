<template>
    <div class="">
      <div>
        <div class="grid grid-cols-4">
          <div class="p-4 m-1">
            <h1>{{ title }}</h1>
          </div>

          <div></div>
          
          <div class="p-4 m-1">
            <div class="form-group">
              <label for="fecha" class="font-semibold">Fecha</label>
              <input type="date" v-model="filtro.fecha" class="form-control" @change="listarRegistros" name="fecha" id="fecha" placeholder="Fecha" />
            </div>
          </div>

          <div class="p-4 m-1">
            <div class="form-group">
              <label for="centro" class="font-semibold">Centro de Salud</label>
              <select v-model="filtro.centro_id" class="form-control" @change="listarRegistros" name="centro" id="centro" placeholder="Centro de salud" required>
                <option value="0">-- seleccione --</option>
                <option v-for="c in centrosSalud" :key="c.cnt_id" :value="c.cnt_id">{{ c.cnt_codigo }} {{ c.cnt_descripcion }}</option>
              </select>
            </div>
          </div>

        </div>
      </div>
      <div style="overflow-x: auto">
        <table class="table table-responsive">
          <thead class="thead-dark">
            <tr>
              <th>#</th>
              <th></th>
              <th>CI / Paciente</th>
              <th>Esp / Consultorio</th>
              <th>Planificación</th>
              <th>Nro Ficha</th>
              <th>Kardex Médico</th>
              <th>Registrado</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(r, index) in regs" v-bind:key="r.fch_id">
              <td align="right">{{ index + 1 }} - {{ r.fch_id }}</td>
              <td align="left">
                <button v-if="r.fch_estado == 'P' || r.fch_estado == 'S'"
                  @click="editRegistro(r)"
                  class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 m-1 rounded"
                  title="Atención"
                >
                  <i class="fa-regular fa-folder fa-xl"></i>
                </button>
                <button v-if="r.fch_estado == 'S'"
                  @click="svRegistro(r)"
                  class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 m-1 rounded"
                  title="Signos Vitales"
                >
                  <i class="fa-solid fa-heart-pulse fa-beat-fade fa-xl"></i>
                </button>
                <i v-if="r.fch_estado == 'E'" class="fa-solid fa-user-doctor fa-bounce fa-lg"></i>
              </td>
              <td align="left">{{ r.cli_data.cli_nit }} / {{ r.cli_data.cli_paterno }} {{ r.cli_data.cli_materno }} {{ r.cli_data.cli_nombres }} </td>
              <td align="left">{{ r.esp_descripcion }} / {{ r.con_codigo }} </td>
              <td align="center">{{ r.pln_data.pln_horario }} 
                [{{ r.hc_id }}][{{ r.hcd_id }}]
              </td>
              <td align="center">{{ r.fch_nro_ficha }}</td>
              <td align="center" style="background: beige;">{{ r.fch_kdx_medico }}</td>
              <td align="center">{{ r.fch_registrado }}</td>
              <td align="center">{{ r.fch_estado }}</td>
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
            <div class="modal-body p-6 space-y-6">
              <div class="grid grid-cols-1 gap-1">
                <div class="grid grid-cols-2 gap-3">
                  <div class="form-group">
                    <label for="fecha2" class="font-semibold">Fecha</label>
                    <input type="date" v-model="filtro.fecha" class="form-control" name="fecha2" id="fecha2" placeholder="Fecha de hoy" disabled />
                  </div>
                </div>

                <div class="grid grid-cols-1 gap-3">
                  <div class="form-group">
                    <label for="fch_cli_id" class="font-semibold">Paciente</label>
                    <select v-model="reg.fch_cli_id" class="form-control" name="fch_cli_id" id="fch_cli_id" placeholder="Centro" required disabled>
                      <option value="0">-- seleccione --</option>
                      <option v-for="c in clientes" :key="c.cli_id" :value="c.cli_id">
                        {{ c.cli_data.cli_paterno }} {{ c.cli_data.cli_materno }} {{ c.cli_data.cli_nombres }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group">
                      <label for="fch_pln_id" class="font-semibold">Planificación</label>
                      <select v-model="reg.fch_pln_id" class="form-control" name="fch_pln_id" id="fch_pln_id" placeholder="Planificacion" required disabled>
                        <option value="0">-- seleccione --</option>
                        <option v-for="p in planificaciones" :key="p.pln_id" :value="p.pln_id">
                          [{{ p.esp_descripcion }}] {{ p.pln_data.pln_consultorio }} - {{ p.pln_data.pln_medico }} [{{ p.cnt_descripcion }}]
                        </option>
                      </select>
                  </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div class="col-md-6">
                    <label for="nro">Número Ficha</label>
                    <input v-model="reg.fch_nro_ficha" class="form-control" name="nro" id="nro" placeholder="Numero de Ficha" disabled />
                  </div>
                  <div class="col-md-6">
                    <label for="kdx">Kardex Médico</label>
                    <input v-model="reg.fch_kdx_medico" class="form-control" name="kdx" id="kdx" placeholder="Kardex Medico" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
              <button @click="saveModal" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 m-1 rounded" :title="isEditing ? 'Actualizar' : 'Guardar'">
                {{ isEditing ? "Actualizar" : "Guardar" }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Signos Vitales -->
      <div v-if="showModalSV" class="modal-overlay">
        <div class="modal-content">
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div
              class="modal-header flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
            >
              <h2
                class="modal-title text-xl font-semibold text-gray-900 dark:text-white"
              >
                {{ isEditingSV ? "EDITAR " : "NUEVO " }} {{ singularSV }}
              </h2>
              <button
                type="button"
                @click="closeModalSV()"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="defaultModal"
              >
                <i class="fa-solid fa-close"></i>
                <span class="sr-only">Close modal</span>
              </button>
            </div>

            <!-- Modal body -->
            <div class="modal-body p-6 space-y-6">

              <div class="grid grid-cols-4 gap-3">
                <div class="form-group">
                  <label for="CI"><strong>CI</strong><br>{{ reg.cli_data.cli_nit }}</label>
                </div>

                <div class="form-group">
                  <label for="paterno"><strong>Paterno</strong><br>{{ reg.cli_data.cli_paterno }}</label>
                </div>

                <div class="form-group">
                  <label for="materno"><strong>Materno</strong><br>{{ reg.cli_data.cli_materno }}</label>
                </div>

                <div class="form-group">
                  <label for="nombres"><strong>Nombres</strong><br>{{ reg.cli_data.cli_nombres }}</label>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="form-group">
                  <label for="frec_cardiaca">Frecuencia Cardiaca:</label>
                  <input v-model="reg.hcd_data_sv.sv_frec_cardiaca" class="form-control" name="frec_cardiaca" id="frec_cardiaca" placeholder="Frecuencia cardiaca" />
                </div>
                  <div class="form-group">
                    <label for="frec_respiratoria">Frecuencia Respiratoria:</label>
                    <input v-model="reg.hcd_data_sv.sv_frec_respiratoria" class="form-control" name="frec_respiratoria" id="frec_respiratoria" placeholder="Frecuencia respiratoria" />
                  </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="form-group">
                  <label for="presion_arterial">Presión Arterial:</label>
                  <input v-model="reg.hcd_data_sv.sv_presion_arterial" class="form-control" name="presion_arterial" id="presion_arterial" placeholder="Presion Arterial" />
                </div>
                <div class="form-group">
                  <label for="sat_oxigeno">Saturación de Oxigeno:</label>
                  <input v-model="reg.hcd_data_sv.sv_sat_oxigeno" class="form-control" name="sat_oxigeno" id="sat_oxigeno" placeholder="Saturación de oxigeno" />
                </div>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div class="form-group">
                  <label for="temp">Temperatura Corporal:</label>
                  <input v-model="reg.hcd_data_sv.sv_temp_corporal" class="form-control" name="temp" id="temp" placeholder="Temperatura corporal" />
                </div>

                <div class="form-group">
                  <label for="correo">Talla:</label>
                  <input v-model="reg.hcd_data_sv.sv_talla" class="form-control" name="talla" id="talla" placeholder="Talla" />
                </div>

                <div class="form-group">
                  <label for="peso">Peso:</label>
                  <input v-model="reg.hcd_data_sv.sv_peso" class="form-control" name="peso" id="peso" placeholder="Peso" />
                </div>
              </div>
            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
              <button @click="saveModalSV" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 m-1 rounded" :title="isEditingSV ? 'Actualizar' : 'Guardar'">
                {{ isEditingSV ? "Actualizar" : "Guardar" }}
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
  import historialesDetService from '../services/HistorialesDetService';
  import centrosService from '../services/centrosService';

  import '@fortawesome/fontawesome-free/css/all.css';

  export default {
    data() {
      return {
        regs: [],
        reg: { },
        title: "ATENCIÓN FICHAS",
        plural: "Fichas",
        singular: "Ficha",
        singularSV: "Signos Vitales",
        showModal: false,
        showModalSV: false,
        isEditing: false,
        isEditingSV: false,
        clientes: [],
        planificaciones: [],
        centrosSalud: [],
        // dates
        currentDate: new Date(),
        // filtro
        filtro: { fecha:'', centro_id:'0' }
      };
    },
  
    mounted() {
      this.dates();
      this.listarRegistros();
      this.listarPlanificaciones();
      this.listarClientes();
      this.listarCentros();
    },
  
    methods: {
      async listarRegistros() {
        this.regs = [];
        try {
          this.regs = await fichasService.getFichasHistoriales(this.filtro.fecha, this.filtro.centro_id);
          console.log("Fichas: ", this.regs);

          this.listarPlanificaciones();
        } catch (error) {
          console.error("Error:", error.message);
        }
      },
      async listarClientes() {
        this.clientes = [];
        try {
          this.clientes = await clientesService.getData();
          console.log("Centros: ", this.clientes);
        } catch (error) {
          console.error("Error:", error.message);
        }
      },
      async listarPlanificaciones() {
        this.planificaciones = [];
        try {
          this.planificaciones = await planificacionesService.getDataXFechaCntId(this.filtro.fecha, this.filtro.centro_id);
          console.log("planificaciones: ", this.planificaciones);
        } catch (error) {
          console.error("Error:", error.message);
        }
      },
      async listarCentros() {
        try {
        this.centrosSalud = await centrosService.getData();
        console.log('Registros: ', this.regs);
        } catch (error) {
        console.error('Error:', error.message);
        }
      },

      editRegistro(reg) {
        this.isEditing = true;
        this.reg = Object.assign({}, reg);
        this.showModal = true;
      },
      svRegistro(reg) {
        console.log("reg SV", reg);
        this.isEditingSV = true;
        
        this.reg = Object.assign({}, reg);
        if (!this.reg.hcd_data_sv) {
          this.reg.hcd_data_sv = {sv_frec_cardiaca:'', sv_frec_respiratoria:''};
        }
        if (!this.reg.hcd_data_consulta) {
          this.reg.hcd_data_consulta = {};
        }
        if (!this.reg.hcd_data_recetario) {
          this.reg.hcd_data_recetario = {};
        }
        this.showModalSV = true;
      },

      async saveModal() {
        this.reg.fch_usr_id = 1; 
        this.reg.fch_estado = "E";
        if (this.isEditing) {
          this.reg.fch_estado = "S";
          const updatedReg = await fichasService.updateData(this.reg);
        } else {
          const savedReg = await fichasService.saveData(this.reg);
          this.regs.push(savedReg);
        }
        this.listarRegistros();
        this.closeModal();
      },

      async saveModalActivarCE() {
        this.reg.fch_usr_id = 1; 
        this.reg.fch_estado = "E";
        if (this.isEditing) {
          this.reg.fch_estado = "E";
          const updatedReg = await fichasService.updateData(this.reg);
        } else {
          const savedReg = await fichasService.saveData(this.reg);
          this.regs.push(savedReg);
        }
        // 777 this.listarRegistros();
        // 777 this.closeModal();
      },

      async saveModalSV() {
        // registrar Ficha
        this.isEditing = true;
        this.saveModalActivarCE();
        console.log('activado aaaaaaaaaaa');

        // registrar SV
        this.reg.hcd_modificado = this.filtro.fecha;
        this.reg.hcd_usr_id = 11;
        this.reg.hcd_estado = "A";
        console.log('HC: ', this.reg.hc_id);
        console.log('HCD: ', this.reg.hcd_id);
        this.reg.hcd_fecha = this.filtro.fecha;
        //this.reg.hcd_data_sv = ;
        if (!this.reg.hcd_id) {
          console.log('NEW');
          const updatedReg = await historialesDetService.saveData(this.reg);
        } else {
          console.log('EDIT');
          const updatedReg = await historialesDetService.updateData(this.reg);
        }
      
        this.listarRegistros();
        this.closeModalSV();
      },

      closeModal() {
        this.showModal = false;
      },

      closeModalSV() {
        this.showModalSV = false;
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
  