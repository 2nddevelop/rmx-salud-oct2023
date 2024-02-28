<template>
  <div class="">
    <div>
      <div class="grid grid-cols-4 p-0 m-0">
        <div class="p-1 m-1">
          <h1>{{ title }}</h1>
        </div>

        <div class="p-1 m-1">
          <div class="form-group">
            <label for="fecha" class="font-semibold">Fecha</label>
            <input type="date" v-model="filtro.fecha" class="form-control" @change="listarRegistros" :min="fechaMinima"
              name="fecha" id="fecha" placeholder="Fecha" />
          </div>
        </div>

        <div class="p-1 m-1">
          <div class="form-group">
            <label for="centro" class="font-semibold">Establ. de Salud</label>
            <select v-model="filtro.centro_id" class="form-control"
              @change="listarRegistros(); listarEspecialidades(); listarConsultorios();" name="centro" id="centro"
              placeholder="Centro de salud" required>
              <option value="0">-- seleccione --</option>
              <option v-for="c in centrosSalud" :key="c.cnt_id" :value="c.cnt_id">{{ c.cnt_descripcion }}</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end p-1 m-1">
          <button @click="refrescar()"
            class="form-control bg-green-500 disabled:bg-green-200 hover:bg-green-600 text-white py-2 px-4 m-1 rounded text-xs"
            title="Refrescar" :disabled="filtro.centro_id == '0'">
            <i class="fa-solid fa-rotate fa-xs"></i> Refrescar
          </button>
        </div>

      </div>
    </div>
    <div style="overflow-x: auto">
      <table class="table table-responsive">
        <thead class="thead-dark">
          <tr>
            <th>#</th>
            <th>
              <input type="checkbox" v-model="filtro.todos" @change="listarRegistros"> Todos
            </th>
            <th>CI / Paciente</th>
            <th>Especialidad
              <select v-model="filtro.especialidad_id" class="form-control input" @change="listarRegistros" name="esp_id"
                id="esp_id" placeholder="Espcialidad" required>
                <option value="0">-- todas --</option>
                <option v-for="e in especialidades" :key="e.esp_id" :value="e.esp_id">{{ e.esp_descripcion }}</option>
              </select>
            </th>
            <th>Consultorio
              <select v-model="filtro.consultorio_id" class="form-control input" @change="listarRegistros" name="con_id"
                id="con_id" placeholder="Consultorio" required>
                <option value="0">-- todas --</option>
                <option v-for="c in consultorios" :key="c.con_id" :value="c.con_id">{{ c.con_descripcion }}</option>
              </select>
            </th>
            <th>Hora</th>
            <th>Nro Ficha</th>
            <th>Kardex Médico</th>
            <th>Registrado</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(r, index) in regs" v-bind:key="r.fch_id">
            <td align="right">{{ index + 1 }}</td>
            <td align="left">

              <button v-if="r.fch_estado == 'E'" @click="llamarConsulta(r)"
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-1 m-1 rounded" title="Llamar Consulta">
                <i class="fa-solid fa-notes-medical fa-xs"></i>
              </button>
              <button v-if="r.fch_estado == 'C'" @click="svRegistro(r)"
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-1 m-1 rounded" title="Signos Vitales">
                <i class="fa-solid fa-heart-pulse fa-beat-fade fa-xs"></i>
              </button>
              <button v-if="r.fch_estado == 'C'" @click="cnsRegistro(r)"
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-1 m-1 rounded" title="Atención">
                <i class="fa-solid fa-user-doctor fa-bounce fa-xs"></i>
              </button>
              <button v-if="r.fch_estado == 'C'"
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-1 m-1 rounded"
                title="Derivación / Reconsulta">
                <i class="fa-solid fa-arrow-right fa-xs"></i>
              </button>
              <button v-if="r.fch_estado == 'C'"
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-1 m-1 rounded" title="Recetario">
                <i class="fa-solid fa-pills fa-xs"></i>
              </button>
              <button v-if="r.fch_estado == 'C'" @click="liberarFicha(r)"
                class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-1 m-1 rounded"
                title="Liberar ficha">
                <i class="fa-solid fa-arrow-right fa-xs"></i>
              </button>

              <i v-if="r.fch_estado == 'P'" class="fa-regular fa-folder fa-lg"></i>
              <i v-if="r.fch_estado == 'S'" class="fa-solid fa-computer fa-lg"></i>

            </td>
            <td align="left">{{ r.cli_data.cli_nit }} / {{ r.cli_data.cli_paterno }} {{ r.cli_data.cli_materno }} {{
              r.cli_data.cli_nombres }} </td>
            <td align="left" style="background-color: beige;">{{ r.esp_descripcion }}</td>
            <td align="left" style="background-color: beige;">{{ r.con_codigo }} </td>
            <td align="center">{{ r.fch_hora }}</td>
            <td align="center">{{ r.fch_nro_ficha }}</td>
            <td align="center" style="background: beige;">{{ r.fch_kdx_medico }}</td>
            <td align="center">{{ r.fch_registrado }}</td>
            <td align="center">
              <span v-if="r.fch_estado == 'S'"
                class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xxs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Adm</span>
              <span v-if="r.fch_estado == 'A'"
                class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xxs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{{
                  r.fch_estado }}</span>
              <span v-if="r.fch_estado == 'P'"
                class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xxs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/10">{{
                  r.fch_estado }}</span>
              <span v-if="r.fch_estado == 'E'"
                class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xxs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/10">En
                Espera</span>
              <span v-if="r.fch_estado == 'C'"
                class="inline-flex items-center rounded-md bg-aqua-50 px-2 py-1 text-xxs font-medium text-aqua-700 ring-1 ring-inset ring-aqua-600/10">En
                Consulta</span>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="13">Son n {{ plural }}</td>
          </tr>
        </tfoot>
      </table>

      <label>Estados</label>
      <table class="table table-responsive">
        <tr>
          <td align="center">
            <span
              class="inline-flex items-center rounded-md bg-green px-1 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600">1</span>
            Reimprimir ficha <i class="fa-solid fa-print fa-xl"></i>
          </td>
          <td align="center">
            <span
              class="inline-flex items-center rounded-md bg-green px-1 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600">2</span>
            Llamar ficha a Admisiones <i class="fa-regular fa-folder fa-xl"></i>
          </td>
          <td align="center">
            <span
              class="inline-flex items-center rounded-md bg-green px-1 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600">3</span>
            Liberar ficha para Consulta <i class="fa-solid fa-arrow-right fa-xl"></i>
          </td>
          <td align="center">
            <span
              class="inline-flex items-center rounded-md bg-green px-1 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600">4</span>
            Esperando Consulta <i class="fa-solid fa-notes-medical fa-xl"></i>
          </td>
          <td align="center">
            <span
              class="inline-flex items-center rounded-md bg-green px-1 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600">5</span>
            En Consulta <i class="fa-solid fa-user-doctor fa-bounce fa-xl"></i>
          </td>
        </tr>
      </table>
    </div>


    <!-- Modal Signos Vitales -->
    <div v-if="showModalSV" class="modal-overlay">
      <div class="modal-content">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="modal-header flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h2 class="modal-title text-xl font-semibold text-gray-900 dark:text-white">
              {{ isEditingSV ? "EDITAR " : "NUEVO " }} {{ singularSV }}
            </h2>
            <button type="button" @click="closeModalSV()"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="defaultModal">
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
                <input v-model="reg.hcd_data_sv.sv_frec_cardiaca" class="form-control" name="frec_cardiaca"
                  id="frec_cardiaca" placeholder="Frecuencia cardiaca" />
              </div>
              <div class="form-group">
                <label for="frec_respiratoria">Frecuencia Respiratoria:</label>
                <input v-model="reg.hcd_data_sv.sv_frec_respiratoria" class="form-control" name="frec_respiratoria"
                  id="frec_respiratoria" placeholder="Frecuencia respiratoria" />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="form-group">
                <label for="presion_arterial">Presión Arterial:</label>
                <input v-model="reg.hcd_data_sv.sv_presion_arterial" class="form-control" name="presion_arterial"
                  id="presion_arterial" placeholder="Presion Arterial" />
              </div>
              <div class="form-group">
                <label for="sat_oxigeno">Saturación de Oxigeno:</label>
                <input v-model="reg.hcd_data_sv.sv_sat_oxigeno" class="form-control" name="sat_oxigeno" id="sat_oxigeno"
                  placeholder="Saturación de oxigeno" />
              </div>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <div class="form-group">
                <label for="temp">Temperatura Corporal:</label>
                <input v-model="reg.hcd_data_sv.sv_temp_corporal" class="form-control" name="temp" id="temp"
                  placeholder="Temperatura corporal" />
              </div>

              <div class="form-group">
                <label for="correo">Talla:</label>
                <input v-model="reg.hcd_data_sv.sv_talla" class="form-control" name="talla" id="talla"
                  placeholder="Talla" />
              </div>

              <div class="form-group">
                <label for="peso">Peso:</label>
                <input v-model="reg.hcd_data_sv.sv_peso" class="form-control" name="peso" id="peso" placeholder="Peso" />
              </div>
            </div>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button @click="saveModalSV"
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 m-1 rounded"
              :title="isEditingSV ? 'Actualizar' : 'Guardar'">
              {{ isEditingSV ? "Actualizar" : "Guardar" }}
            </button>
          </div>
        </div>
      </div>
    </div>


    <!-- Modal Consultas -->
    <div v-if="showModalCNS" class="modal-overlay">
      <div class="modal-content">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="modal-header flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h2 class="modal-title text-xl font-semibold text-gray-900 dark:text-white">
              {{ isEditingCNS ? "EDITAR " : "NUEVO " }} {{ singularCNS }}
            </h2>
            <button type="button" @click="closeModalCNS()"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="defaultModal">
              <i class="fa-solid fa-close"></i>
              <span class="sr-only">Close modal</span>
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body p-6 space-y-1">

            <div class="grid grid-cols-4 gap-1">
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
            <div class="grid grid-cols-2 gap-1">
              <div class="form-group">
                <label for="cns_mt_con">Motivo Consulta:</label>
                <textarea v-model="reg.hcd_data_consulta.cns_mt_con" class="form-control" name="cns_mt_con"
                  id="cns_mt_con" placeholder="Motivo consulta"></textarea>
              </div>
              <div class="form-group">
                <label for="cns_exm_fsc">Examen Físico:</label>
                <textarea v-model="reg.hcd_data_consulta.cns_exm_fsc" class="form-control" name="cns_exm_fsc"
                  id="cns_exm_fsc" placeholder="Examen físico"></textarea>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-1">
              <div class="form-group">
                <label for="presion_arterial">Estado Nutricional:</label>
                <textarea v-model="reg.hcd_data_consulta.cns_est_nut" class="form-control" name="cns_est_nut"
                  id="cns_est_nut" placeholder="Estado nutricional"></textarea>
              </div>
              <div class="form-group">

              </div>
            </div>
            <div class="grid grid-cols-2 gap-1">
              <div class="form-group">
                <label for="temp">Diagnóstico Descriptivo</label>
                <textarea v-model="reg.hcd_data_consulta.cns_dia_des" class="form-control" name="temp" id="temp"
                  placeholder="Diagnóstico descriptivo"></textarea>
              </div>

              <div class="form-group">
                <label for="correo">Diagnóstico CIE 10</label>
                <textarea v-model="reg.hcd_data_consulta.cns_dia_cie" class="form-control" name="talla" id="talla"
                  placeholder="Diagnóstico CIE 10"></textarea>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-1">
              <div class="form-group">
                <label for="cns_ttm">Tratamiento</label>
                <textarea v-model="reg.hcd_data_consulta.cns_ttm" class="form-control" name="cns_ttm" id="cns_ttm"
                  placeholder="Tratamiento"></textarea>
              </div>

              <div class="form-group">
                <label for="cns_obv">Observaciones</label>
                <textarea v-model="reg.hcd_data_consulta.cns_obv" class="form-control" name="cns_obv" id="cns_obv"
                  placeholder="Observaciones"></textarea>
              </div>
            </div>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button @click="saveModalCNS"
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 m-1 rounded"
              :title="isEditingCNS ? 'Actualizar' : 'Guardar'">
              {{ isEditingCNS ? "Actualizar" : "Guardar" }}
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
  
  
<script>
import clientesService from '../../services/clientesService';
import planificacionesService from '../../services/planificacionesService';
import fichasService from '../../services/fichasService';
import historialesDetService from '../../services/historialesDetService';
import centrosService from '../../services/centrosService';
import especialidadesService from '../../services/especialidadesService';
import consultoriosService from '../../services/consultoriosService';

import '@fortawesome/fontawesome-free/css/all.css';

export default {
  data() {
    return {
      regs: [],
      reg: {},
      title: "CONSULTA EXTERNA",
      plural: "Consultas",
      singular: "Consulta Externa",
      singularSV: "Signos Vitales",
      singularCNS: "Consulta Externa",
      showModal: false,
      showModalSV: false,
      showModalCNS: false,
      isEditing: false,
      isEditingSV: false,
      isEditingCNS: false,
      clientes: [],
      planificaciones: [],
      centrosSalud: [],
      especialidades: [],
      consultorios: [],
      // dates
      currentDate: new Date(),
      // filtro
      filtro: { especialidad_id: 0, consultorio_id: 0, fecha: '', centro_id: 0, todos: false }
    };
  },

  mounted() {
    this.filtro.centro_id = localStorage.getItem('cnt_id'); // importante insumo para this.listarRegistros()

    this.dates();
    this.listarRegistros();
    //    this.listarPlanificaciones();
    //    this.listarClientes();
    this.listarCentros();
    this.listarEspecialidades();
    this.listarConsultorios();
  },

  methods: {
    async listarRegistros() {
      try {
        fichasService.getFichasHistoriales(this.filtro.fecha, this.filtro.centro_id).then(response => {
          const filas = [];
          response.forEach(row => {
            if ((this.filtro.especialidad_id == 0 || this.filtro.especialidad_id == row.esp_id) && (this.filtro.consultorio_id == 0 || this.filtro.consultorio_id == row.con_id)) {
              if (this.filtro.todos) {
                filas.push(row);
              } else if (row.fch_estado == 'E' || row.fch_estado == 'C' || row.fch_estado == 'A') {
                filas.push(row);
              }
            }
          })
          this.regs = filas;
        })
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
        this.consultorios = await consultoriosService.getData(this.filtro.centro_id);
      } catch (error) {
        console.error("Error:", error.message);
      }
    },

    editRegistro(reg) {
      this.isEditing = true;
      this.reg = Object.assign({}, reg);
      this.showModal = true;
    },

    svRegistro(reg) {
      this.isEditingSV = true;

      this.reg = Object.assign({}, reg);
      if (!this.reg.hcd_data_sv) {
        this.reg.hcd_data_sv = { sv_frec_cardiaca: '', sv_frec_respiratoria: '' };
      }
      if (!this.reg.hcd_data_consulta) {
        this.reg.hcd_data_consulta = {};
      }
      if (!this.reg.hcd_data_recetario) {
        this.reg.hcd_data_recetario = {};
      }
      this.showModalSV = true;
    },

    cnsRegistro(reg) {
      this.isEditingSV = true;

      this.reg = Object.assign({}, reg);
      if (!this.reg.hcd_data_sv) {
        this.reg.hcd_data_sv = { sv_frec_cardiaca: '', sv_frec_respiratoria: '' };
      }
      if (!this.reg.hcd_data_consulta) {
        this.reg.hcd_data_consulta = {};
      }
      if (!this.reg.hcd_data_recetario) {
        this.reg.hcd_data_recetario = {};
      }
      this.showModalCNS = true;
    },
    /*
          async saveModal() {
            this.reg.fch_usr_id = 1; 
            this.reg.fch_estado = "P";
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
    */

    async llamarConsulta(reg) {
      this.reg = Object.assign({}, reg);
      this.reg.fch_usr_id = 1;
      this.reg.fch_estado = "C";
      const updatedReg = await fichasService.updateData(this.reg);
      this.listarRegistros();
    },

    async saveModalSV() {
      this.reg.hcd_modificado = this.filtro.fecha;
      this.reg.hcd_usr_id = 11;
      ////////////////////////////this.reg.hcd_estado = "A";
      this.reg.hcd_fecha = this.filtro.fecha;
      //this.reg.hcd_data_sv = ;
      if (!this.reg.hcd_id) {
        const updatedReg = await historialesDetService.saveData(this.reg);
      } else {
        const updatedReg = await historialesDetService.updateData(this.reg);
      }
      this.listarRegistros();
      this.closeModalSV();
    },

    async saveModalCNS() {
      this.reg.hcd_modificado = this.filtro.fecha;
      this.reg.hcd_usr_id = 11;
      this.reg.hcd_estado = "A";
      this.reg.hcd_fecha = this.filtro.fecha;
      //this.reg.hcd_data_sv = ;
      if (!this.reg.hcd_id) {
        const updatedReg = await historialesDetService.saveData(this.reg);
      } else {
        const updatedReg = await historialesDetService.updateData(this.reg);
      }
      this.listarRegistros();
      this.closeModalCNS();
    },

    async liberarFicha(reg) {
      this.reg = Object.assign({}, reg);
      this.reg.fch_usr_id = 1;
      this.reg.fch_estado = "A";
      const updatedReg = await fichasService.updateData(this.reg);
      this.listarRegistros();
    },

    closeModal() {
      this.showModal = false;
    },

    closeModalSV() {
      this.showModalSV = false;
    },

    closeModalCNS() {
      this.showModalCNS = false;
    },

    dates() {
      const year = this.currentDate.getFullYear();
      const month = ('0' + (this.currentDate.getMonth() + 1)).slice(-2); // Se agrega 1 ya que los meses van de 0 a 11
      const day = ('0' + this.currentDate.getDate()).slice(-2);

      this.filtro.fecha = `${year}-${month}-${day}`;
    },

    refrescar() {
      this.dates();
      this.listarRegistros();
      this.listarEspecialidades();
      this.listarConsultorios();
    }

  },

  computed: {
    fechaMinima() {
      // Calcular la fecha mínima permitida (hoy)
      const hoy = new Date();
      const year = hoy.getFullYear();
      const month = hoy.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
      const day = hoy.getDate();
      return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
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
  