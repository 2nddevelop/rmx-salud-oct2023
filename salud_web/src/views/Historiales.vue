<template>
  <div class="">
    <div>
      <div class="grid grid-cols-3">
        <div class="p-6 m-1">
          <h1>{{ title }}</h1>
        </div>
        <div></div>
        <div class="flex justify-end p-6 m-1">
          <!--button
            @click="newRegistro()"
            class="form-control bg-green-500 hover:bg-green-600 text-white py-2 px-4 m-1 rounded"
            title="Nuevo"
          >
            + Nuevo
          </button-->
        </div>
      </div>
    </div>
    <div style="overflow-x: auto">
      <table class="table table-responsive">
        <thead class="thead-dark">
          <tr>
            <th>#</th>
            <th></th>
            <th>Historial</th>
            <th>CI<br>
              <input type="text" @change="buscarRegistros" v-model="filtro.cli_nit" class="form-control input"></th>
            <th>Paterno<br>
              <input type="text" @change="buscarRegistros" v-model="filtro.cli_paterno" class="form-control input"></th>
            <th>Materno<br>
              <input type="text" @change="buscarRegistros" v-model="filtro.cli_materno" class="form-control input"></th>
            <th>Nombres<br>
              <input type="text" @change="buscarRegistros" v-model="filtro.cli_nombres" class="form-control input"></th>
            <th>Registrado</th>
            <th>Estado Historial</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(r, index) in regs" v-bind:key="r.doc_id">
            <td align="right">{{ index + 1 }} - {{ r.hc_id }}</td>
            <td>
              <button v-if="r.hc_estado == 'A'"
                @click="editRegistro(r)"
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 m-1 rounded"
                title="Editar"
              >
                <i class="fa-solid fa-pencil"></i>
              </button>

              <button v-if="r.hc_estado == 'A'"
                @click="deleteRegistro(r)"
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 m-1 rounded"
                title="Eliminar"
              >
                <i class="fa-solid fa-trash"></i>
              </button>

              <button v-if="r.hc_estado == 'A'"
                @click="verRegistroDet(r)"                  
                class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 m-1 rounded"
                title="Ver"
              >
                <i class="fa-solid fa-eye"></i>
              </button>
            </td>
            <td align="center" :style=" r.hc_codigo ? 'background: beige;' : ''">
              <button v-if="!r.hc_codigo"
                @click="newRegistro(r)"
                class="form-control bg-green-500 hover:bg-green-600 text-white py-2 px-4 m-1 rounded"
                title="Nuevo"
              >
                + Nuevo
              </button>
              {{ r.hc_codigo ? r.hc_codigo : '' }}
            </td>
            <td align="right">{{ r.cli_data ? r.cli_data.cli_nit : ''}}</td>
            <td align="left">{{ r.cli_data ? r.cli_data.cli_paterno : '' }}</td>
            <td align="left">{{ r.cli_data ? r.cli_data.cli_materno : '' }}</td>
            <td align="left">{{ r.cli_data ? r.cli_data.cli_nombres : '' }} </td>
            <td align="right">{{ r.hc_registado }}</td>
            <td align="center">
              <span v-if="r.hc_estado == 'X'" class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{{ r.hc_estado }}</span>
              <span v-if="r.hc_estado == 'A'" class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{{ r.hc_estado }}</span>
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
            
            <div class="grid grid-cols-4 gap-1">
              <div class="form-group">
                <label for="historial">Historial</label>
                <input v-model="reg.hc_codigo" style="background:beige;" class="form-control" name="historial" id="historial" placeholder="Historial" />
              </div>
            </div>

            <div class="grid grid-cols-4 gap-1">
              <div class="form-group">
                <label for="CI">CI</label>
                <input v-model="reg.cli_data.cli_nit" class="form-control" name="ci" id="ci" placeholder="CI" disabled />
              </div>
              <div class="form-group">
                <label for="paterno">Paterno</label>
                <input v-model="reg.cli_data.cli_paterno" class="form-control" name="paterno" id="paterno" placeholder="Paterno" disabled />
              </div>
              <div class="form-group">
                <label for="materno">Materno</label>
                <input v-model="reg.cli_data.cli_materno" class="form-control" name="materno" id="materno" placeholder="Materno" disabled />
              </div>
              <div class="form-group">
                <label for="nombres">Nombres</label>
                <input v-model="reg.cli_data.cli_nombres" class="form-control" name="nombres" id="nombres" placeholder="Nombres" disabled />
              </div>
            </div>

            <!--div class="grid grid-cols-2 gap-3">
              <div class="form-group">
                <label for="mtcon">Motivo de Consulta</label>
                <textarea v-model="reg.hcd_data_consulta.con_mt_con" class="form-control" name="mtcon" id="mtcon" placeholder="Motivo de Consulta">
                </textarea>
              </div>
              <div class="form-group">
                <label for="exmfis">Examen Fisico</label>
                <textarea v-model="reg.hcd_data_consulta.con_exm_fsc" class="form-control" name="exmfis" id="exmfis" placeholder="Examen Fisico">
                </textarea>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="form-group">
                <label for="estnut">Estado Nutricional</label>
                <input v-model="reg.hcd_data_consulta.con_est_nut" class="form-control" name="estnut" id="estnut" placeholder="Estado Nutricional">
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="form-group">
                <label for="diades">Diagnostico Descriptivo</label>
                <textarea v-model="reg.hcd_data_consulta.con_dia_des" class="form-control" name="diades" id="diades" placeholder="Diagnostico Descriptivo">
                </textarea>
              </div>
              <div class="form-group">
                <label for="diacie">Diagnostico CIE 10</label>
                <textarea v-model="reg.hcd_data_consulta.con_dia_cie" class="form-control" name="diacie" id="diacie" placeholder="Diagnostico CIE 10" >
                </textarea>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="form-group">
                <label for="ttm">Tratamiento</label>
                <textarea v-model="reg.hcd_data_consulta.con_ttm" class="form-control" name="ttm" id="ttm" placeholder="Tratamiento">
                </textarea>
              </div>
              <div class="form-group">
                <label for="obv">Observaciones</label>
                <textarea v-model="reg.hcd_data_consulta.con_obv" class="form-control" name="obv" id="obv" placeholder="Observaciones">
                </textarea>
              </div>
            </div-->
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

    <!-- Modal -->
    <div v-if="showModalDet" class="modal-overlay">
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
              {{ isEditingDet ? "EDITAR " : "NUEVO " }} {{ singular }}
            </h2>
            <button
              type="button"
              @click="closeModalDet()"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="defaultModal"
            >
              <i class="fa-solid fa-close"></i>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-6 space-y-6" style="overflow-y: auto; max-height: 600px;">
            <div>
              <label>Signos Vitales</label>
              <div class="grid grid-cols-8 gap-3" style="background:#00bd7e; color:white;">
                <div>Fecha</div>
                <div>Frec Cardiaca</div>
                <div>Frec Respiratoria</div>
                <div>Presion Arterial</div>
                <div>Sat Oxigeno</div>
                <div>Temp Corp</div>
                <div>Talla</div>
                <div>Peso</div>
              </div>
              <div class="grid grid-cols-8 gap-3"  style="background:beige;"
                v-for="(rd, index) in regsDet" v-bind:key="rd.hcd_id">
                <div>{{ rd.hcd_fecha.substring(0, 10) }}<br>{{ rd.hcd_fecha.substring(11, 19) }}</div>
                <div>{{ rd.hcd_data_sv.sv_frec_cardiaca }}</div>
                <div>{{ rd.hcd_data_sv.sv_frec_respiratoria }}</div>
                <div>{{ rd.hcd_data_sv.sv_presion_arterial }}</div>
                <div>{{ rd.hcd_data_sv.sv_sat_oxigeno }}</div>
                <div>{{ rd.hcd_data_sv.sv_temp_corporal }}</div>
                <div>{{ rd.hcd_data_sv.sv_talla }}</div>
                <div>{{ rd.hcd_data_sv.sv_peso }}</div>
              </div>
            </div>
            <div v-for="(rd, index) in regsDet" v-bind:key="rd.hcd_id">
              <h1>
                <strong> {{ rd.hcd_fecha.substring(0, 10) }} </strong>
              </h1>
              <label>Anamnesis</label>
              <div >
                <div >
                  <div class="grid grid-cols-2 gap-3" style="background:#00bd7e; color:white;">
                    <div>Motivo de Consulta</div>
                    <div>Examen Fisico</div>
                  </div>
                  <div class="grid grid-cols-2 gap-3"  style="background:beige;">
                    <div>{{ rd.hcd_data_consulta.cns_mt_con }}</div>
                    <div>{{ rd.hcd_data_consulta.cns_exm_fsc }}</div>
                  </div>                    
                </div>
              </div>
              
              <label>Estado Nutricional</label>
              <div >
                <div>
                  <div class="grid grid-cols-4 gap-3" style="background:#00bd7e; color:white;">
                    <div>Estado Nutricional</div>
                  </div>
                  <div class="grid grid-cols-4 gap-3"  style="background:beige;">
                    <div>{{ rd.hcd_data_consulta.cns_est_nut }}</div>
                  </div>
                </div>
              </div>

              <label>Diagnostico</label>
              <div >
                <div >
                  <div class="grid grid-cols-2 gap-3" style="background:#00bd7e; color:white;">
                    <div>Diagnostico Descriptivo</div>
                    <div>Diagnostico CIE 10</div>
                  </div>
                  <div class="grid grid-cols-2 gap-3"  style="background:beige;">
                    <div>{{ rd.hcd_data_consulta.cns_dia_des }}</div>
                    <div>{{ rd.hcd_data_consulta.cns_dia_cie }}</div>
                  </div>                    
                </div>
              </div>

              <label>Tratamiento</label>
              <div >
                <div >
                  <div class="grid grid-cols-2 gap-3" style="background:#00bd7e; color:white;">
                    <div>Tratamiento</div>
                    <div>Observaciones</div>
                  </div>
                  <div class="grid grid-cols-2 gap-3"  style="background:beige;">
                    <div>{{ rd.hcd_data_consulta.cns_ttm }}</div>
                    <div>{{ rd.hcd_data_consulta.cns_obv }}</div>
                  </div>                    
                </div>
              </div>
            </div>
          </div>
          <!-- Modal footer -->
          <div class="modal-footer">
            <button @click="saveModal" class="bg-green-500 hover-bg-green-600 text-white font-bold py-2 px-4 m-1 rounded" :title="isEditingDet ? 'Actualizar' : 'Guardar'">
              {{ isEditingDet ? "Actualizar" : "Guardar" }}
            </button>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>


<script>
import centrosService from '../services/centrosService';
import especialidadesService from '../services/especialidadesService';
import doctoresService from '../services/doctoresService';
import historialesService from '../services/historialesService';
import historialesDetService from '../services/historialesDetService';

import '@fortawesome/fontawesome-free/css/all.css';

export default {
  data() {
    return {
      regs: [],
      reg: {            
        hc_cli_id: '',
        hc_codigo: '',
        hc_fecha: '',
        hc_data:  {
        },
        hcd_data_sv:{
            sv_peso: '',
            sv_temp_corporal: '',
            sv_frec_cardiaca: '',
            sv_frec_respiratoria: '',
            sv_presion_arterial: '',
            sv_sat_oxigeno: ''
        },
        hcd_data_consulta:{
            con_mt_con: '',
            con_exm_fsc: '',
            con_est_nut: '',
            con_dia_des: '',
            con_dia_cie: '',
            con_ttm: '',
            con_obv: ''
        }
      },
      title: "HISTORIALES CLÍNICOS",
      plural: "Historiales Clínicos",
      singular: "Historial Clínico",
      showModal: false,
      isEditing: false,
      showModalDet: false,
      isEditingDet: false,
      centros: [],
      especialidades: [],
      filtro: { cli_nit: "", cli_paterno: "", cli_materno: "", cli_nombres: "" }
    };
  },

  mounted() {
    this.listarRegistros();
    //this.listarCentros();
    this.listarEspecialidades();
  },

  methods: {
    async listarRegistros() {
      this.regs = [];
      try {
        this.regs = await historialesService.getData();
        console.log("Historiales: ", this.regs);          
      } catch (error) {
        console.error("Error:", error.message);
      }
    },
    async buscarRegistros() {
      this.regs = [];
      try {
        this.regs = await historialesService.getBuscar(this.filtro.cli_nit, this.filtro.cli_paterno, this.filtro.cli_materno, this.filtro.cli_nombres);
        console.log("Historiales: ", this.regs);          
      } catch (error) {
        console.error("Error:", error.message);
      }
    },
    async listarRegistrosDet(reg) {
      this.regsDet = [];
      try {
        this.regsDet = await historialesDetService.getData(reg.hc_id);
        console.log("2 regsDet: ", this.regsDet);
      } catch (error) {
        console.error("Error:", error.message);
      }
    },
    async listarCentros() {
      this.centros = [];
      try {
        this.centros = await centrosService.getData();
        console.log("Centros: ", this.centros);
      } catch (error) {
        console.error("Error:", error.message);
      }
    },
    async listarEspecialidades() {
      this.especialidades = [];
      try {
        this.especialidades = await especialidadesService.getData();
        console.log("Especialidades: ", this.especialidades);
      } catch (error) {
        console.error("Error:", error.message);
      }
    },

    newRegistro(reg) {
      this.isEditing = false;
      this.reg = Object.assign({}, reg);
      this.regSV = {
        hcd_data_sv: {
          sv_peso: '',
          sv_temp_corporal: '',
          sv_frec_cardiaca: '',
          sv_frec_respiratoria: '',
          sv_presion_arterial: '',
          sv_sat_oxigeno: ''
        }
      };
      this.regCon = { 
        hcd_data_consulta: {
          con_mt_con: '',
          con_exm_fsc: '',
          con_est_nut: '',
          con_dia_des: '',
          con_dia_cie: '',
          con_ttm: '',
          con_obv: ''
        }
      };
      this.showModal = true;
    },

    editRegistro(reg) {
      this.isEditing = true;
      this.reg = Object.assign({}, reg);
      this.showModal = true;
    },

    verRegistroDet(reg) {
      console.log('1 reg', reg);
      this.listarRegistrosDet(reg);
      setTimeout(() => {
        this.isEditingDet = true;
        //this.regsDet = Object.assign({}, reg);
        this.showModalDet = true;          
      }, 1000);
    },

    async saveModal() {
      this.reg.hc_usr_id = 1; 
      this.reg.hc_estado = "A";
      if (this.isEditing) {
        const updatedReg = await historialesService.updateData(this.reg);
        const index = this.regs.findIndex(item => item.hcd_id === updatedReg.hcd_id);
          if (index !== -1) {
            this.regs.splice(index, 1, updatedReg);
          }
      } else {
        console.log('cliente: ', this.reg);
        this.reg.hc_cli_id = this.reg.cli_id
        const savedReg = await historialesService.saveData(this.reg);
        this.regs.push(savedReg);
      }
      this.listarRegistros();
      this.closeModal();
    },

    async deleteRegistro(reg) {
      const confirmed = window.confirm("¿Estás seguro de eliminar este registro?");
      if (confirmed) {
        try {
          const index = this.regs.findIndex(item => item.doc_id === reg.doc_id);
          if (index !== -1) {
            reg.doc_usr_id = 1;
            reg.doc_estado = "X"; 
            await doctoresService.deleteData(reg); 
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

    closeModalDet() {
      this.showModalDet = false;
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
