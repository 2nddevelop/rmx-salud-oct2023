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
            <input type="date" v-model="filtro.fecha" class="form-control" @change="listarRegistros" name="fecha"
              id="fecha" placeholder="Fecha" />
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


        <div class="flex justify-end p-4 m-1">
          <button @click="newRegistro()"
            class="form-control bg-green-500 disabled:bg-green-200 hover:bg-green-600 text-white py-2 px-4 m-1 rounded"
            title="Nuevo" :disabled="filtro.centro_id == '0'">
            + Nuevo
          </button>
          <button @click="refrescar()"
            class="form-control bg-green-500 disabled:bg-green-200 hover:bg-green-600 text-white py-2 px-4 m-1 rounded"
            title="Refrescar" :disabled="filtro.centro_id == '0'">
            R
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
            <td>
              <button v-if="r.fch_estado == 'P'" @click="editRegistro(r)"
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-1 m-1 rounded" title="Editar">
                <i class="fa-solid fa-pencil fa-xs"></i>
              </button>
              <button v-if="r.fch_estado == 'P'" @click="deleteRegistro(r)"
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-1 m-1 rounded" title="Eliminar">
                <i class="fa-solid fa-trash fa-xs"></i>
              </button>
              <button @click="printRegistro(r)"
                class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-1 m-1 rounded" title="Imprimir">
                <i class="fa-solid fa-print fa-xs"></i>
              </button>
              <button v-if="r.fch_estado == 'P'" @click="folderRegistro(r)"
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-1 m-1 rounded"
                title="Llamar Admisiones">
                <i class="fa-regular fa-folder fa-xs"></i>
              </button>
              <button v-if="r.fch_estado == 'S'" @click="liberarFolder(r)"
                class="bg-blue-300 hover:bg-blue-400 text-white font-bold py-1 px-1 m-1 rounded" title="Enviar CE">
                <i class="fa-solid fa-arrow-right fa-xs"></i>
              </button>

              <i v-if="r.fch_estado == 'E'" class="fa-solid fa-notes-medical fa-lg"></i>
              <i v-if="r.fch_estado == 'C'" class="fa-solid fa-user-doctor fa-bounce fa-lg"></i>

            </td>
            <td align="left">{{ r.tcli_descripcion }}</td>
            <td align="left">{{ r.cli_data.cli_nit }} / {{ r.cli_data.cli_paterno }} {{ r.cli_data.cli_materno }} {{
              r.cli_data.cli_nombres }} </td>
            <td align="left" style="background-color: beige;">{{ r.esp_descripcion }}</td>
            <td align="left" style="background-color: beige;">{{ r.con_codigo }} </td>
            <td align="center">{{ r.fch_hora }} </td>
            <td align="center">{{ r.fch_nro_ficha }}</td>
            <td align="center" style="background: beige">{{ r.fch_kdx_medico }}</td>
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

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h2 class="modal-title text-xl font-semibold text-gray-900 dark:text-white">
              {{ isEditing ? "EDITAR " : "NUEVA " }} {{ singular }}
            </h2>
            <button type="button" @click="closeModal()"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="defaultModal">
              <i class="fa-solid fa-close"></i>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="modal-body p-6 space-y-6">
            <!--div class="grid grid-cols-2 gap-1">
                <div class="form-group">
                  <label for="fecha2" class="font-semibold">Fecha</label>
                  <input type="date" v-model="filtro.fecha" class="form-control" name="fecha2" id="fecha2" placeholder="Fecha de hoy" disabled />
                </div>
              </div-->

            <div class="grid grid-cols-1 gap-1">
              <div class="grid grid-cols-5 gap-1">
                <div class="form-group">
                  <input class="form-control" v-model="filtro.cli_nit" name="ci" id="ci" placeholder="CI">
                </div>
                <div class="form-group">
                  <input class="form-control" v-model="filtro.cli_paterno" name="paterno" id="paterno"
                    placeholder="Paterno">
                </div>
                <div class="form-group">
                  <input class="form-control" v-model="filtro.cli_materno" name="materno" id="materno"
                    placeholder="Materno">
                </div>
                <div class="form-group">
                  <input class="form-control" v-model="filtro.cli_nombres" name="nombres" id="nombres"
                    placeholder="Nombres">
                </div>
                <div>
                  <button
                    class="bg-green-500 hover:bg-green-600 disabled:bg-gray-200 text-white font-bold py-2 px-4 m-1 rounded"
                    @click="buscarRegistros"
                    :disabled="!filtro.cli_nit && !filtro.cli_paterno && !filtro.cli_materno && !filtro.cli_nombres"
                    title="Buscar">
                    <i class="fa-solid fa-search"></i> Buscar
                  </button>
                </div>
              </div>

              <label for="fch_cli_id" class="font-semibold">Paciente</label>
              <select v-model="reg.fch_cli_id" @change="buscarHistorial(this)" class="form-control" name="fch_cli_id"
                id="fch_cli_id" placeholder="Centro" size="5" required>
                <option value="0">-- seleccione --</option>
                <option v-for="c in clientes" :key="c.cli_id" :value="c.cli_id">
                  {{ c.cli_data.cli_paterno }} {{ c.cli_data.cli_materno }} {{ c.cli_data.cli_nombres }} &nbsp; &nbsp; {{
                    c.cli_data.cli_nit }}
                </option>
              </select>

              <label for="fch_pln_id" class="font-semibold">Planificación</label>
              <select v-model="reg.fch_pln_id" @change="mostrarFicha(this)" class="form-control" name="fch_pln_id"
                id="fch_pln_id" placeholder="Planificacion" size="5" required>
                <option value="0">-- seleccione --</option>
                <option v-for="p in planificaciones" :key="p.pln_id" :value="p.pln_id">
                  [{{ p.esp_descripcion }}] {{ p.doc_data.doc_paterno }} [{{ p.con_descripcion }}]
                </option>
              </select>

              <div class="grid grid-cols-2 gap-4">
                <!-- div class="form-group">
                    <label for="nro">Número Ficha</label>
                    <input v-model="reg.fch_nro_ficha" class="form-control" name="nro" id="nro" placeholder="Numero de Ficha" />
                  </div -->
                <div class="form-group">
                  <label for="kdx">Kardex Médico</label>
                  <input v-model="reg.fch_kdx_medico" class="form-control" name="kdx" id="kdx" placeholder="Kardex Medico"
                    style="background:beige;" disabled />
                </div>
                <div class="form-group">
                  <label for="fch_tipo_atencion" class="font-semibold">Tipo Atencion</label>
                  <select v-model="reg.fch_tipo_atencion" class="form-control" name="fch_tipo_atencion"
                    id="fch_tipo_atencion" placeholder="Tipo Atencion" required>
                    <option value="0">-- seleccione --</option>
                    <option v-for="t in tiposClientes" :key="t.tcli_id" :value="t.tcli_id">{{ t.tcli_descripcion }}
                    </option>
                  </select>
                </div>
              </div>

              <div v-if="reg.fch_tipo_atencion > 0">
                <div class="grid grid-cols-5 gap-0">
                  <div v-show="1" v-for="d in disponibles"><!-- mostrar fichas -->
                    <template v-if="d.pln_fch_id == 0">
                      <button @click="saveModal(d.pln_fch_id, d.pln_hora)"
                        class="bg-green-500 hover:bg-green-600 disabled:bg-gray-200 text-white font-bold py-2 px-4 m-1 rounded">
                        {{ d.pln_hora }}
                      </button>
                    </template>
                    <template v-else>
                      <button class="bg-gray-200 hover:bg-gray-100 text-gray font-bold py-2 px-4 m-1 rounded">
                        {{ d.pln_hora }}
                      </button>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <!--button @click="saveModal" class="bg-green-500 hover:bg-green-600 disabled:bg-gray-200 text-white font-bold py-2 px-4 m-1 rounded" 
                :title="isEditing ? 'Actualizar' : 'Guardar'"
                :disabled="reg.fch_kdx_medico == 'a definir'">
                {{ isEditing ? "Actualizar" : "Guardar" }}
              </button-->
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Folder -->
    <div v-if="showModalFolder" class="modal-overlay">
      <div class="modal-content">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h2 class="modal-title text-xl font-semibold text-gray-900 dark:text-white">
              LLAMADA ADMISIONES
            </h2>
            <button type="button" @click="closeModalFolder()"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="defaultModal">
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
                  <input type="date" v-model="filtro.fecha" class="form-control" name="fecha2" id="fecha2"
                    placeholder="Fecha de hoy" disabled />
                </div>
              </div>

              <div class="grid grid-cols-1 gap-3">
                <div class="form-group">
                  <label for="fch_cli_id" class="font-semibold">Paciente</label>
                  <select v-model="reg.fch_cli_id" class="form-control" name="fch_cli_id" id="fch_cli_id"
                    placeholder="Centro" required disabled>
                    <option value="0">-- seleccione --</option>
                    <option v-for="c in clientes" :key="c.cli_id" :value="c.cli_id">
                      {{ c.cli_data.cli_paterno }} {{ c.cli_data.cli_materno }} {{ c.cli_data.cli_nombres }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="fch_pln_id" class="font-semibold">Planificación</label>
                  <select v-model="reg.fch_pln_id" class="form-control" name="fch_pln_id" id="fch_pln_id"
                    placeholder="Planificacion" required disabled>
                    <option value="0">-- seleccione --</option>
                    <option v-for="p in planificaciones" :key="p.pln_id" :value="p.pln_id">
                      [{{ p.esp_descripcion }}] {{ p.pln_data.pln_consultorio }} - {{ p.pln_data.pln_medico }} [{{
                        p.cnt_descripcion }}]
                    </option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="col-md-6">
                  <label for="nro">Número Ficha</label>
                  <input v-model="reg.fch_nro_ficha" class="form-control" name="nro" id="nro"
                    placeholder="Numero de Ficha" disabled />
                </div>
                <div class="col-md-6">
                  <label for="kdx">Kardex Médico</label>
                  <input v-model="reg.fch_kdx_medico" class="form-control" name="kdx" id="kdx" placeholder="Kardex Medico"
                    disabled />
                </div>
                <div class="form-group">
                  <label for="fch_tipo_atencion" class="font-semibold">Tipo Atencion</label>
                  <select v-model="reg.fch_tipo_atencion" class="form-control" name="fch_tipo_atencion"
                    id="fch_tipo_atencion" placeholder="Tipo Atencion" required>
                    <option value="0">-- seleccione --</option>
                    <option v-for="t in tiposClientes" :key="t.tcli_id" :value="t.tcli_id">{{ t.tcli_descripcion }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button @click="saveModalFolder"
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 m-1 rounded"
              :title="isEditing ? 'Actualizar' : 'Guardar'">
              {{ isEditing ? "Actualizar" : "Guardar" }}
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
import centrosService from '../../services/centrosService';
import historialesService from '../../services/historialesService';
import especialidadesService from '../../services/especialidadesService';
import consultoriosService from '../../services/consultoriosService';
import tiposClienteService from '../../services/tiposClienteService';
import '@fortawesome/fontawesome-free/css/all.css';

export default {
  data() {
    return {
      regs: [],
      reg: {},
      title: "ADMISIONES",
      plural: "Fichas",
      singular: "Ficha",
      showModal: false,
      showModalFolder: false,
      isEditing: false,
      isEditingFolder: false,
      clientes: [],
      planificaciones: [],
      centrosSalud: [],
      especialidades: [],
      consultorios: [],
      tiposClientes: [],
      // dates
      currentDate: new Date(),
      // filtro
      filtro: { especialidad_id: '0', consultorio_id: '0', fecha: '', centro_id: '0', cli_nit: "", cli_paterno: "", cli_materno: "", cli_nombres: "" },
      // horas
      disponibles: [],
      pln_id: 0,
      lapso: 20 //lapso de consulta
    };
  },

  mounted() {
    this.dates();
    // this.listarRegistros();
    // this.listarClientes();
    // this.listarPlanificaciones();
    this.listarCentros();
    // this.listarEspecialidades();
    // this.listarConsultorios();
    // this.listarTiposCliente();
  },

  methods: {
    async listarRegistros() {
      try {
        fichasService.getData(this.filtro.fecha, this.filtro.centro_id).then(response => {
          const filas = [];
          response.forEach(row => {
            if ((this.filtro.especialidad_id == 0 || this.filtro.especialidad_id == row.esp_id) && (this.filtro.consultorio_id == 0 || this.filtro.consultorio_id == row.con_id)) {
              filas.push(row);
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
    async listarTiposCliente() {
      this.tiposClientes = [];
      try {
        this.tiposClientes = await tiposClienteService.getData();
      } catch (error) {
        console.error("Error:", error.message);
      }
    },
    async buscarRegistros() {
      this.clientes = [];
      try {
        this.clientes = await historialesService.getBuscar(this.filtro.cli_nit, this.filtro.cli_paterno, this.filtro.cli_materno, this.filtro.cli_nombres);
      } catch (error) {
        console.error("Error:", error.message);
      }
    },

    newRegistro() {
      this.listarPlanificaciones();
      this.isEditing = false;
      this.filtro.cli_nit = "";
      this.filtro.cli_paterno = "";
      this.filtro.cli_materno = "";
      this.filtro.cli_nombres = "";
      this.reg = { fch_cli_id: '0', fch_pln_id: '0', fch_kdx_medico: 'a definir', fch_tipo_atencion: '0' };
      this.showModal = true;
    },

    editRegistro(reg) {
      this.isEditing = true;
      this.reg = Object.assign({}, reg);
      this.showModal = true;
    },

    folderRegistro(reg) {
      this.isEditingFolder = true;
      this.reg = Object.assign({}, reg);
      this.showModalFolder = true;
    },

    async saveModal(ficha, hora) {
      this.reg.fch_usr_id = 1;
      this.reg.fch_estado = "P";
      this.reg.fch_nro_referencia = null;
      this.reg.fch_fec_fin_referencia = null;
      this.reg.filtro_fecha = this.filtro.fecha;
      this.reg.filtro_centro_id = this.filtro.centro_id;
      this.reg.fch_hora = hora;
      if (this.isEditing) {
        const updatedReg = await fichasService.updateData(this.reg);
        const index = this.regs.findIndex(item => item.fch_id === updatedReg.fch_id);
        if (index !== -1) {
          this.regs.splice(index, 1, updatedReg);
        }
      } else {
        const indexFicha = this.disponibles.findIndex(item => item.pln_hora === hora);
        if (indexFicha !== -1) {
          let updatedFicha = this.disponibles[indexFicha];
          updatedFicha.pln_fch_id = 1;
          this.disponibles.splice(indexFicha, 1, updatedFicha);
        }
        this.reg.pln_data_disponibles = this.disponibles;
        //this.reg.pln_id = this.pln_id;
        const savedReg = await fichasService.saveData(this.reg);
        this.regs.push(savedReg);
      }
      this.listarRegistros();
      this.closeModal();
    },

    async saveModalFolder() {
      this.reg.fch_usr_id = 1;
      this.reg.fch_estado = "E";
      if (this.isEditingFolder) {
        this.reg.fch_estado = "S";
        const updatedReg = await fichasService.updateData(this.reg);
      } else {
        const savedReg = await fichasService.saveData(this.reg);
        this.regs.push(savedReg);
      }
      this.listarRegistros();
      this.closeModalFolder();
    },

    async liberarFolder(reg) {
      this.reg = Object.assign({}, reg);
      this.reg.fch_usr_id = 1;
      this.reg.fch_estado = "E";
      const updatedReg = await fichasService.updateData(this.reg);
      this.listarRegistros();
    },

    async deleteRegistro(reg) {
      const confirmed = window.confirm("¿Estás seguro de eliminar este registro?");
      if (confirmed) {
        try {
          const index = this.regs.findIndex(item => item.fch_id === reg.fch_id);
          if (index !== -1) {
            reg.fch_usr_id = 1;
            reg.fch_estado = "X";
            await fichasService.deleteData(reg);
            this.regs.splice(index, 1);
          } else {
            console.error('No se encontró el registro para eliminar');
          }
        } catch (error) {
          console.error('Error al eliminar el registro:', error);
        }
      }
    },

    async buscarHistorial(registro) {
      const cli_id = registro.reg.fch_cli_id;
      const historial = await clientesService.getBuscarHistorial(cli_id);
      if (Object.keys(historial).length) {
        this.reg.fch_kdx_medico = historial[0].hc_codigo;
      } else {
        this.reg.fch_kdx_medico = 'a definir';
        const confirmed = window.alert("El Paciente NO tiene Historial !");
      }
    },

    async mostrarFicha(registro) {
      const sel = registro.reg.fch_pln_id;
      const pln = this.planificaciones.find((element) => element.pln_id == sel);
      this.disponibles = pln.pln_data_disponibles;
    },

    async printRegistro(reg) {
      const confirmed = window.confirm("¿Imprimir ficha?");
      if (confirmed) {
        try {
          const index = this.regs.findIndex(item => item.fch_id === reg.fch_id);
          if (index !== -1) {

            var html = '';
            html = '<table style="font-size:11px" border=\"0\" width = \"100%\">';
            html += '<tr><td colspan="2" width="20%"><img src="' + window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/salud/img/logo3.png" width="80%"></td>';
            html += '<td colspan="3" align="center">"Nada es mas importante que un niño"</td></tr>';
            html += '<tr><td colspan="3"><hr></td></tr>';
            html += '<tr><td colspan="3" align="center">FICHA No: ' + reg.fch_nro_ficha + '</td></tr>';
            html += '<tr><td colspan="3" align="center">HORA: ' + reg.fch_hora + '</td></tr>';
            html += '<tr><td colspan="3"><hr></td></tr>';
            html += '<tr><td colspan="3">Establ. de Salud: ' + reg.cnt_descripcion + '</td></tr>';
            html += '<tr><td colspan="3">Especialidad: ' + reg.esp_descripcion + '</td></tr>';
            html += '<tr><td colspan="3">Consultorio: ' + reg.con_descripcion + '</td></tr>';
            html += '<tr><td colspan="3"><hr></td></tr>';
            html += '<tr><td align="center" colspan="3">Recuerde estar 20 minutos antes de su consulta médica.</td></tr>';
            html += '<tr><td colspan="3"><hr></td></tr>';
            html += '<tr><td colspan="3" align="center">' + reg.fch_registrado + '</td></tr>';
            html += '</table>';
            var win = window.open("", "Impresion Boleta", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=200,top=" + (screen.height - 400) + ",left=" + (screen.width - 840));
            win.document.body.innerHTML = html;

            setTimeout(function () {
              win.document.close();
              win.focus();
              win.print();
              win.close();
            }, 1000);


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

    closeModalFolder() {
      this.showModalFolder = false;
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
  