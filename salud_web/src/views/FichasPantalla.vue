<template>
    <div class="">
      <div class="grid grid-cols-4 p-0 m-0">
        <div class="p-1 m-1">
          <!--h1>{{ title }}</h1-->
        </div>

        <div class="p-1 m-1">
          <div class="form-group">
            <label for="fecha" class="font-semibold">Fecha</label>
            <input type="date" v-model="filtro.fecha" class="form-control" @change="listarRegistros" name="fecha" id="fecha" placeholder="Fecha" />
          </div>
        </div>

        <div class="p-1 m-1">
          <div class="form-group">
            <label for="centro" class="font-semibold">Establ. de Salud</label>
            <select v-model="filtro.centro_id" class="form-control" @change="listarRegistros" name="centro" id="centro" placeholder="Centro de salud" required>
              <option value="0">-- seleccione --</option>
              <option v-for="c in centrosSalud" :key="c.cnt_id" :value="c.cnt_id">{{ c.cnt_descripcion }}</option>
            </select>
          </div>
        </div>

        <div class="p-1 m-1"></div>
      </div>
    </div>
    <div class="">
      <div class="grid grid-cols-6">
        <div class="col-span-3 p-1 m-1 content-center content-stretch	" style="background-color: beige;">
          Video
        </div>

        <div class="col-span-3 p-1 m-1" style="overflow-x: auto;">
          <table class="table table-responsive table-border">
            <thead class="text-xl">
              <tr>
                <th>Paciente</th>
                <th>Ficha</th>
                <th></th>
                <th>Especialidad
              </th>
              <th>Consultorio
              </th>
                <th>E</th>
              </tr>
            </thead>
            <tbody class="text-xl">
              <tr v-for="(r, index) in regs" v-bind:key="r.fch_id">
                <template v-if="r.fch_estado !== 'P'">
                <td align="left">{{ r.cli_data.cli_nombres }} </td>
                <td align="center">{{ r.fch_hora }} - {{ r.fch_nro_ficha }}</td>
                <td align="center"><i class="fa-solid fa-arrow-right fa-2xl"></i></td>
                <td align="left" style="background-color: beige;">{{ r.esp_descripcion }}</td>
                <td align="left" style="background-color: beige;">{{ r.con_codigo }} </td>
                <td align="center">
                  <span v-if="r.fch_estado == 'S'" class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{{ r.fch_estado }}</span>
                  <span v-if="r.fch_estado == 'A'" class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{{ r.fch_estado }}</span>
                  <span v-if="r.fch_estado == 'P'" class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/10">{{ r.fch_estado }}</span>
                  <span v-if="r.fch_estado == 'E'" class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/10">{{ r.fch_estado }}</span>
                </td  >
                </template>
              </tr>
            </tbody>
            <tfoot class="text-xs">
              <tr style="background: beige;">
                <td colspan="6"><p>En pantalla solo se listan las fichas llamadas a Signos Vitales o Consulta Externa.</p></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
  
    </div>
  </template>
  
  
  <script>
  import clientesService from '../services/clientesService';
  import planificacionesService from '../services/planificacionesService';
  import fichasService from '../services/fichasService';
  import centrosService from '../services/centrosService';
  import especialidadesService from '../services/especialidadesService';
  import consultoriosService from '../services/consultoriosService';

  import '@fortawesome/fontawesome-free/css/all.css';

  export default {
    data() {
      return {
        regs: [],
        reg: { },
        title: "PANTALLA",
        plural: "Fichas",
        singular: "Ficha",
        showModal: false,
        isEditing: false,
        clientes: [],
        planificaciones: [],
        centrosSalud: [],
        especialidades: [],
        consultorios: [],
        // dates
        currentDate: new Date(),
        // filtro
        filtro: { especialidad_id:'0', consultorio_id:'0', fecha:'', centro_id:'0' }
      };
    },
  
    mounted() {
      this.dates();
      this.listarClientes();
      this.listarCentros();
      this.listarEspecialidades();
      this.listarConsultorios();

      this.listarRegistros();        
      
    },
  
    methods: {
      async listarRegistros() {
        setTimeout(() => {
          this.regs = [];
          try {
            const registros = [];
            this.regs = await fichasService.getData(this.filtro.fecha, this.filtro.centro_id);
            console.log("Fichas: ", this.regs);    
            this.regs.forEach((r) => {
              if (this.filtro.especialidad_id == '0') {
                registros.push(r);
              } else {
                if (r.esp_id == this.filtro.especialidad_id) {
                  registros.push(r);
                }
              }
            });
            this.regs = registros;      
          } catch (error) {
            console.error("Error:", error.message);
          }
        }, 10000);
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
          this.consultorios = await consultoriosService.getData();
        } catch (error) {
          console.error("Error:", error.message);
        }
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
  
  .input {
    color: black;
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
  