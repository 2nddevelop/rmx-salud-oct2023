<template>
    <div class="">
      <div>
        <div class="grid grid-cols-4">
          <div class="p-4 m-1">
            <h1>{{ title }}</h1>
          </div>

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

          <div class="flex justify-end p-4 m-1">
            <button
              @click="newRegistro()"
              class="form-control bg-green-500 disabled:bg-green-200 hover:bg-green-600 text-white py-2 px-4 m-1 rounded"
              title="Nuevo"
              :disabled="filtro.centro_id == '0'"
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
              <th>CI / Paciente</th>
              <th>Centro / Esp / Consultorio</th>
              <th>Planificación</th>
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
                <button v-if="r.fch_estado == 'P'"
                  @click="editRegistro(r)"
                  class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 m-1 rounded"
                  title="Editar"
                >
                  <i class="fa-solid fa-pencil"></i>
                </button>
                <button v-if="r.fch_estado == 'P'"
                  @click="deleteRegistro(r)"
                  class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 m-1 rounded"
                  title="Eliminar"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
                <button
                  @click="printRegistro(r)"
                  class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 m-1 rounded"
                  title="Imprimir"
                >
                  <i class="fa-solid fa-print"></i>
                </button>
              </td>
              <td align="left">{{ r.cli_data.cli_nit }} / {{ r.cli_data.cli_paterno }} {{ r.cli_data.cli_materno }} {{ r.cli_data.cli_nombres }} </td>
              <td align="left">{{ r.cnt_codigo }} / {{ r.esp_codigo }} / {{ r.con_codigo }} </td>
              <td align="center">{{ r.pln_data.pln_horario }} </td>
              <td align="center">{{ r.fch_nro_ficha }}</td>
              <td align="center" style="background: beige">{{ r.fch_kdx_medico }}</td>
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
              <div class="grid grid-cols-2 gap-3">
                <div class="form-group">
                  <label for="fecha2" class="font-semibold">Fecha</label>
                  <input type="date" v-model="filtro.fecha" class="form-control" name="fecha2" id="fecha2" placeholder="Fecha de hoy" disabled />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div class="form-group">
                  <label for="fch_cli_id" class="font-semibold">Paciente</label>
                  <select v-model="reg.fch_cli_id" class="form-control" name="fch_cli_id" id="fch_cli_id" placeholder="Centro" required>
                    <option value="0">-- seleccione --</option>
                    <option v-for="c in clientes" :key="c.cli_id" :value="c.cli_id">{{ c.cli_data.cli_paterno }} {{ c.cli_data.cli_materno }} {{ c.cli_data.cli_nombres }}</option>
                  </select>
                </div>
                <div class="form-group">
                    <label for="fch_pln_id" class="font-semibold">Planificacion</label>
                    <select v-model="reg.fch_pln_id" class="form-control" name="fch_pln_id" id="fch_pln_id" placeholder="Planificacion" required>
                      <option value="0">-- seleccione --</option>
                      <option v-for="p in planificaciones" :key="p.pln_id" :value="p.pln_id"> [{{ p.esp_descripcion }}] {{ p.pln_data.pln_consultorio }} - {{ p.pln_data.pln_medico }} [{{ p.cnt_descripcion }}]</option>
                    </select>
                </div>
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div class="col-md-6">
                  <label for="nro">Numero Ficha</label>
                  <input v-model="reg.fch_nro_ficha" class="form-control" name="nro" id="nro" placeholder="Numero de Ficha" />
                  <span style="font-size: x-small; color: red;">Automático</span>
                </div>
                <div class="col-md-6">
                  <label for="kdx">Kardex Médico</label>
                  <input v-model="reg.fch_kdx_medico" class="form-control" name="kdx" id="kdx" placeholder="Kardex Medico" disabled />
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
  import clientesService from '../services/clientesService';
  import planificacionesService from '../services/planificacionesService';
  import fichasService from '../services/fichasService';
  import centrosService from '../services/centrosService';

  import '@fortawesome/fontawesome-free/css/all.css';

  export default {
    data() {
      return {
        regs: [],
        reg: { },
        title: "EMISIÓN FICHAS",
        plural: "Fichas",
        singular: "Ficha",
        showModal: false,
        isEditing: false,
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
      this.listarClientes();
      // this.listarPlanificaciones();
      this.listarCentros();
    },
  
    methods: {
      async listarRegistros() {
        this.regs = [];
        try {
          this.regs = await fichasService.getData(this.filtro.fecha, this.filtro.centro_id);
          console.log("Fichas: ", this.regs);          
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

      newRegistro() {
        this.listarPlanificaciones();
        this.isEditing = false;
        this.reg = { fch_cli_id: '0', fch_pln_id: '0', fch_kdx_medico: 'a definir' };
        this.showModal = true;
      },

      editRegistro(reg) {
        this.isEditing = true;
        this.reg = Object.assign({}, reg);
        this.showModal = true;
      },

      async saveModal() {
        this.reg.fch_usr_id = 1; 
        this.reg.fch_estado = "P";
        if (this.isEditing) {
          const updatedReg = await fichasService.updateData(this.reg);
          const index = this.regs.findIndex(item => item.fch_id === updatedReg.fch_id);
          if (index !== -1) {
            this.regs.splice(index, 1, updatedReg);
          }
        } else {
          const savedReg = await fichasService.saveData(this.reg);
          this.regs.push(savedReg);
        }
        this.listarRegistros();
        this.closeModal();
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

      async printRegistro(reg) {
        const confirmed = window.confirm("¿Imprimir ficha?");
        if (confirmed) {
          try {
            const index = this.regs.findIndex(item => item.fch_id === reg.fch_id);
            if (index !== -1) {

              var html = '';
              console.log("Mensaje",reg);
              html = '<table style="font-size:50" border=\"0\" width = \"100%\">';
              html += '<tr><td colspan="1" width="30%"><img src="' + window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/img/logoEmpresa.png" width="70%"></td>';
              html += '<td colspan="2" align="right">FICHA No. ' + reg.fch_id + '</td></tr>';
              html += '<tr><td colspan="3"><hr></td></tr>';
              html += '<tr><td colspan="3">Centro: ' + reg.cnt_descripcion + '</td></tr>';
              html += '<tr><td colspan="3">Especialidad: ' + reg.esp_descripcion + '</td></tr>';
              html += '<tr><td colspan="3">Consultorio: ' + reg.con_descripcion + '</td></tr>';
              html += '<tr><td colspan="3"><hr></td></tr>';
              html += '<tr><td align="center" colspan="3">FELIZ NAVIDAD 2023</td></tr>';
              html += '<tr><td colspan="3"><hr></td></tr>';
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
  