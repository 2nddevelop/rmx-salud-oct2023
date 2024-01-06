<template>
  <div class="">
    <div>
      <div class="grid grid-cols-5">
        <div class="p-1 m-1"></div>

        <div class="p-1 m1 col-span-3" style="font-size: 24px;">
          <!--div class="p-1 m-1">
            <h1>{{ title }}</h1>
          </div-->

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

          <div class="grid grid-cols-2">
            <div class="flex justify-end pl-4 pr-2 m-1">
              <button
                @click="newRegistro()"
                class="form-control bg-green-500 disabled:bg-green-200 hover:bg-green-600 text-white py-2 px-4 m-1 rounded"
                title="Nuevo"
                :disabled="filtro.centro_id == '0'"
              >
                + Nueva Ficha
              </button>
            </div>
            <div class="flex justify-end pl-2 pr-4 m-1">
              <button
                @click="reimprimirUltimaFicha"
                class="form-control bg-green-500 disabled:bg-green-200 hover:bg-green-600 text-white py-2 px-4 m-1 rounded"
                title="Reimprimir"
                :disabled="filtro.centro_id == '0' || !ultimaFichaImpresa"
              >
                <i class="fa-solid fa-print"></i>
                Reimprimir Última Ficha
              </button>
            </div>
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
          <div class="modal-body p-1 space-y-1">
            <div class="grid grid-cols-3 gap-1">
              <div class="form-group">
                <label for="fecha2" class="font-semibold">Fecha</label>
                <input type="date" v-model="filtro.fecha" class="form-control" name="fecha2" id="fecha2" placeholder="Fecha de hoy" disabled />
              </div>
              
            </div>
            
            <div class="grid grid-cols-5 gap-1">
              <div class="form-group">
                <input class="form-control" v-model="filtro.cli_nit" name="ci" id="ci" placeholder="CI" >
              </div>
              <div class="form-group">
                <input class="form-control" v-model="filtro.cli_paterno" name="paterno" id="paterno" placeholder="Paterno" >
              </div>
              <div class="form-group">
                <input class="form-control" v-model="filtro.cli_materno" name="materno" id="materno" placeholder="Materno" >
              </div>
              <div class="form-group">
                <input class="form-control" v-model="filtro.cli_nombres" name="nombres" id="nombres" placeholder="Nombres" >
              </div>
              <div>
                <button class="bg-green-500 hover:bg-green-600 disabled:bg-gray-200 text-white font-bold py-2 px-4 m-1 rounded" 
                  @click="buscarRegistros"
                  title="Buscar">
                  <i class="fa-solid fa-search"></i> Buscar
                </button>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-1">
              <div class="form-group">
                <label for="fch_cli_id" class="font-semibold">Paciente</label>
                <select v-model="reg.fch_cli_id" @change="buscarHistorial(this)" 
                  class="form-control" name="fch_cli_id" id="fch_cli_id" placeholder="Centro" size="3" required>
                  <option value="0">-- seleccione --</option>
                  <option v-for="c in clientes" :key="c.cli_id" :value="c.cli_id">{{ c.cli_data.cli_paterno }} {{ c.cli_data.cli_materno }} {{ c.cli_data.cli_nombres }}</option>
                </select>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-1">
              <div class="col-md-6">
                <label for="nro">Numero Ficha</label>
                <input v-model="reg.fch_nro_ficha" class="form-control" name="nro" id="nro" placeholder="Numero de Ficha" />
              </div>
              <div class="col-md-6">
                <label for="kdx">Kardex Médico</label>
                <input v-model="reg.fch_kdx_medico" class="form-control" name="kdx" id="kdx" placeholder="Kardex Medico" style="background:beige;" disabled />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-1">                
              <div v-for="p in planificaciones" class="form-group">
                <button @click="mostrarFicha(this, p.pln_id)" 
                  class="bg-green-500 hover:bg-green-600 disabled:bg-gray-200 text-white font-bold py-2 px-4 m-1 rounded"
                  :disabled="reg.fch_kdx_medico == 'a definir'"> 
                  {{ p.esp_descripcion }} - {{ p.doc_data.doc_paterno }} [{{ p.con_descripcion }}]
                </button>
              </div>
              <label class="content-center text-red-400" v-show="planificaciones.length < 1">
                No hay planificacion para este día
              </label>
            </div>

            <div class="grid grid-cols-5 gap-0">
              <div v-show="1" v-for="d in disponibles"><!-- mostrar fichas -->
                <template v-if="d.pln_fch_id == 0">
                  <button @click="saveModal(d.pln_fch_id, d.pln_hora)"
                    class="bg-green-500 hover:bg-green-600 disabled:bg-gray-200 text-white font-bold py-2 px-4 m-1 rounded">
                    {{ d.pln_hora }}
                  </button>
                </template>
                <template v-else>
                  <button
                    class="bg-gray-200 hover:bg-gray-100 text-gray font-bold py-2 px-4 m-1 rounded">
                    {{ d.pln_hora }}
                  </button>
                </template>
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
import historialesService from '../services/historialesService';
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
      filtro: { fecha:'', centro_id:'0', cli_nit: "", cli_paterno: "", cli_materno: "", cli_nombres: "" },
      // horas
      disponibles: [],
      pln_id: 0,
      lapso: 20, //lapso de consulta
      ultimaFichaImpresa: null,

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

    async buscarRegistros() {
        this.clientes = [];
        try {
          this.clientes = await historialesService.getBuscar(this.filtro.cli_nit, this.filtro.cli_paterno, this.filtro.cli_materno, this.filtro.cli_nombres);
          console.log("Historiales11111: ", this.clientes);          
        } catch (error) {
          console.error("Error:", error.message);
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

    async saveModal(ficha, hora) {
      this.reg.fch_usr_id = 1; 
      this.reg.fch_estado = "P";
      this.reg.filtro_fecha = this.filtro.fecha;
      this.reg.filtro_centro_id = this.filtro.centro_id;
      this.reg.fch_hora = hora;
      
        const indexFicha = this.disponibles.findIndex(item => item.pln_hora === hora );
        if (indexFicha !== -1) {
          let updatedFicha = this.disponibles[indexFicha];
          updatedFicha.pln_fch_id = 1;
          this.disponibles.splice(indexFicha, 1, updatedFicha);
        }
        this.reg.pln_data_disponibles = this.disponibles;

        try {
          // Guarda la ficha sin esperar la respuesta
          await fichasService.saveData(this.reg);
        } catch (error) {
          console.error('Error al guardar la ficha:', error);
          return;
        }

        const savedReg = await fichasService.saveData(this.reg);
        
        this.ultimaFichaImpresa = {
          fch_id: savedReg.fch_id,
          fch_nro_ficha: savedReg.fch_nro_ficha,
        };

        await fichasService.getFicha(savedReg.fch_id)
          .then( (value) => {
            setTimeout(async () => {
              await this.printRegistro( value[0] );
            }, 500);
        });
      this.closeModal();
    },

    async buscarHistorial(registro) {
      const cli_id = registro.reg.fch_cli_id;
      const historial = await clientesService.getBuscarHistorial(cli_id); 
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
      if (Object.keys(clientes).length) {
        this.clientes = clientes;
      } else {
        this.clientes = [];
        const confirmed = window.alert("El CI indicado NO existe !");
      }
    },

    async mostrarFicha(registro, pln_id) {
      registro.reg.fch_pln_id = pln_id;
      const sel = registro.reg.fch_pln_id;        
      const pln = this.planificaciones.find((element) => element.pln_id == sel);
      this.disponibles = pln.pln_data_disponibles;
    },


    async printRegistro(reg) {
      const confirmed = window.confirm("¿Imprimir ficha?");
      if (confirmed) {
        try {
          await this.listarRegistros();
          const foundReg = this.regs.find(item => item.fch_id === reg.fch_id);
          if (foundReg) {
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
            console.error('No se encontró el registro para imprimir');
          }
        } catch (error) {
          console.error('Error al imprimir el registro:', error);
        }
      }
    },

    async reimprimirUltimaFicha() {
      if (this.ultimaFichaImpresa && this.ultimaFichaImpresa.fch_id) {
        const confirmed = window.confirm('¿Seguro que quieres reimprimir la última ficha?');
        if (confirmed) {
          const { fch_id } = this.ultimaFichaImpresa;
          try {
            const value = await fichasService.getFicha(fch_id);
            if (value && value.length > 0) {
              this.printRegistro(value[0]);
            } else {
              console.error('No se pudo encontrar la última ficha impresa.');
            }
          } catch (error) {
            console.error('Error al obtener la última ficha impresa:', error);
          }
        }
      } else {
        console.error('No hay última ficha impresa disponible.');
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
