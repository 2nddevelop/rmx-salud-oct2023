import clientesService from '../services/clientesService';
import planificacionesService from '../services/planificacionesService';
import fichasService from '../services/fichasService';
import centrosService from '../services/centrosService';

export default (await import('vue')).defineComponent({
data() {
return {
regs: [],
reg: {},
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
filtro: { fecha: '', centro_id: '0' },
// horas
disponibles: [],
pln_id: 0,
lapso: 20 //lapso de consulta
};
},

mounted() {
this.dates();
this.listarRegistros();
this.listarClientes();
//this.listarPlanificaciones();
this.listarCentros();
},

methods: {
async listarRegistros() {
this.regs = [];
try {
this.listarPlanificaciones();

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
console.log("Pacientes: ", this.clientes);
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

async saveModal(ficha, hora) {
this.reg.fch_usr_id = 1;
this.reg.fch_estado = "P";
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
console.log("Mensaje", reg);
html = '<table style="font-size:50" border=\"0\" width = \"100%\">';
html += '<tr><td colspan="1" width="30%"><img src="' + window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/img/logoEmpresa.png" width="70%"></td>';
html += '<td colspan="2" align="right"></td></tr>';
html += '<tr><td colspan="3"><hr></td></tr>';
html += '<td colspan="2" align="center">FICHA No: ' + reg.fch_nro_ficha + '</td></tr>';
html += '<td colspan="2" align="center">HORA: ' + reg.fch_hora + '</td></tr>';
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
});
