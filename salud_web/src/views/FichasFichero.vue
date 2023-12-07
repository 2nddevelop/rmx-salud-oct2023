<template>
    <div class="">
      <div>
        <div class="grid grid-cols-5">
          <div class="p-4 m-1"></div>

          <div class="p-4 m1 col-span-3" style="font-size: 24px;">
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
                + Nueva Ficha
              </button>
            </div>
            <div class="flex justify-end p-4 m-1">
              <button
                @click="reimprimirRegistro()"
                class="form-control bg-green-500 disabled:bg-green-200 hover:bg-green-600 text-white py-2 px-4 m-1 rounded"
                title="Nuevo"
                :disabled="filtro.centro_id == '0'"
              >
                <i class="fa-solid fa-print"></i>
                Reimprimir Ficha
              </button>
            </div>
          </div>

          <div class="p-4 m-1"></div>

        </div>
      </div>
  
      <!-- Modal -->
      <div v-if="showModal" class="modal-overlay">
          <div class="modal-content">
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h2
                class="modal-title text-xl font-semibold text-gray-900 dark:text-white"
              >
                {{ isEditing ? "EDITAR " : "NUEVA " }} {{ singular }}
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
                  <label for="ci" class="font-semibold">C.I.</label>
                  <input v-model="ci" class="form-control" name="ci" id="ci" placeholder="Carnet de identidad"  />
                </div>
                <div class="form-group">
                  <br>
                  <button @click="buscarClienteXCI(this)" 
                    class="bg-green-500 hover:bg-green-600 disabled:bg-gray-200 text-white font-bold py-2 px-4 m-1 rounded" >
                    <i class="fa-solid fa-search"></i> Buscar
                  </button>
                </div>
              </div>
              <div class="grid grid-cols-1 gap-3">
                <div class="form-group">
                  <label for="fch_cli_id" class="font-semibold">Paciente</label>
                  <select v-model="reg.fch_cli_id" @change="buscarHistorial(this)" 
                    class="form-control" name="fch_cli_id" id="fch_cli_id" placeholder="Centro" size="3" required>
                    <option value="0">-- seleccione --</option>
                    <option v-for="c in clientes" :key="c.cli_id" :value="c.cli_id">{{ c.cli_data.cli_paterno }} {{ c.cli_data.cli_materno }} {{ c.cli_data.cli_nombres }}</option>
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
                  <input v-model="reg.fch_kdx_medico" class="form-control" name="kdx" id="kdx" placeholder="Kardex Medico" style="background:beige;" disabled />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-1">                
                <div v-for="p in planificaciones" class="form-group">
                    <button @click="saveModal(p.pln_id)" 
                      class="bg-green-500 hover:bg-green-600 disabled:bg-gray-200 text-white font-bold py-2 px-4 m-1 rounded"
                      :disabled="reg.fch_kdx_medico == 'a definir'"> 
                      [{{ p.cnt_descripcion }}] {{ p.esp_descripcion }} - {{ p.doc_data.doc_paterno }} [{{ p.con_descripcion }}]
                    </button>
                </div>
              </div>
            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
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
        title: "FICHERO",
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

      newRegistro() {
        this.listarPlanificaciones();
        this.isEditing = false;
        this.clientes = []; // aumentado
        this.ci = ''; //aumentado
        this.reg = { fch_cli_id: '0', fch_pln_id: '0', fch_kdx_medico: 'a definir' };
        this.showModal = true;
      },

      editRegistro(reg) {
        this.isEditing = true;
        this.reg = Object.assign({}, reg);
        this.showModal = true;
      },

      async saveModal(pln_id) {
        this.reg.fch_usr_id = 1; 
        this.reg.fch_estado = "P";
        this.reg.fch_pln_id = pln_id;
        let that = this;
        if (this.isEditing) {
          const updatedReg = await fichasService.updateData(this.reg)
            .then((value) => {
              console.log('>>>>>> ', value);
            });          
        } else {
          const savedReg = await fichasService.saveData(this.reg)
          .then(async (value) => {
              that.reg = await fichasService.getFicha(value.fch_id);
              setTimeout(() => {
                this.printRegistro( that.reg[0] );
              }, 200);
            });          
        }
        //this.listarRegistros();
        this.closeModal();
      },

      async buscarHistorial(registro) {
        const cli_id = registro.reg.fch_cli_id;
        console.log("original cli_id", cli_id);
        const historial = await clientesService.getBuscarHistorial(cli_id); 
        console.log("Cliente Historial: ", historial);
        if (Object.keys(historial).length) {
          this.reg.fch_kdx_medico = historial[0].hc_codigo;
        } else {
          this.reg.fch_kdx_medico = 'a definir';
          const confirmed = window.alert("No tiene Kardex Médico !");
        }
      },

      async buscarClienteXCI(registro) {
        const cli_nit = registro.ci;
        const clientes = await clientesService.getBuscarClienteXCI(cli_nit); 
        console.log("Clientes x CI: ", clientes);
        if (Object.keys(clientes).length) {
          this.clientes = clientes;
        } else {
          this.clientes = [];
          const confirmed = window.alert("El CI indicado NO existe !");
        }
      },

      async printRegistro(reg) {
        var html = '';
        console.log("Imprimir este reg",reg);
        html = '<table style="font-size:50" border=\"0\" width = \"100%\">';
        html += '<tr><td colspan="1" width="30%"><img src="' + window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/img/logoEmpresa.png" width="70%"></td>';
        html += '<td colspan="2" align="right">ID: ' + reg.fch_id + '</td></tr>';
        html += '<tr><td colspan="3" align="center">FICHA No: ' + reg.fch_nro_ficha+ '</td></tr>';
        html += '<tr><td colspan="3"><hr></td></tr>';
        html += '<tr><td colspan="3">Centro: ' + reg.cnt_descripcion + '</td></tr>';
        html += '<tr><td colspan="3">Especialidad: ' + reg.esp_descripcion + '</td></tr>';
        html += '<tr><td colspan="3">Consultorio: ' + reg.con_descripcion + '</td></tr>';
        html += '<tr><td colspan="3"><hr></td></tr>';
        html += '<tr><td align="center" colspan="3">FELIZ NAVIDAD 2023</td></tr>';
        html += '<tr><td colspan="3"><hr></td></tr>';
        html += '<td colspan="2" align="center">' + reg.fch_registrado + '</td></tr>';
        html += '</table>';
        var win = window.open("", "Impresion Boleta", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=200,top=" + (screen.height - 400) + ",left=" + (screen.width - 840));
        win.document.body.innerHTML = html;
        setTimeout(function () {
            win.document.close();
            win.focus();
            win.print();
            win.close();    
        }, 1000);
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
    /*font-size: x-small;*/
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
  