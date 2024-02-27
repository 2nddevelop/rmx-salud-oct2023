// middleware/router.ts
import express from 'express';
import UserController from '../controllers/UserController';
import MembresiaController from '../controllers/MembresiaController';
import DoctorController from '../controllers/DoctorController';
import CentroController from '../controllers/CentroController';
import EspecialidadController from '../controllers/EspecialidadController';
import PlanificacionController from '../controllers/PlanificacionController';
import ConsultorioController from '../controllers/ConsultorioController';
import TiposClienteController from '../controllers/TiposClienteController';
import ClienteController from '../controllers/ClienteController';
import FichaController from '../controllers/FichaController';
import HistorialesController from '../controllers/HistorialesController';
import authMiddleware from '../middleware/authMiddleware';
import HistorialesDetController from '../controllers/HistorialesDetController';
import RolController from '../controllers/RolController';
import UsuarioRolController from '../controllers/UsuarioRolController';
import AvisoController from '../controllers/AvisoController';
import NoticiaController from '../controllers/NoticiaController';
import SiceController from '../controllers/SiceController';

const router = express.Router();

// --- autenticación ------------------------------------------------------------------
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Dirección de correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *             example:
 *               username: "example@gmail.com"
 *               password: "123456"
 *     responses:
 *       200:
 *         description: Usuario autenticado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticación JWT
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', UserController.login);

// --- base_usuarios ------------------------------------------------------------------
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/users', authMiddleware, UserController.getAllUsers);
router.post('/user', authMiddleware, UserController.createUser);
router.put('/user/:usr_id', authMiddleware, UserController.updateUser);
router.delete('/user/:usr_id', authMiddleware, UserController.deleteUser);
router.get('/userXId/:usr_id', authMiddleware, UserController.getUserXId);

// --- roles ------------------------------------------------------------------
router.get('/roles', RolController.getAllRoles);
router.post('/rol', authMiddleware, RolController.createRol);
router.put('/rol/:rol_id', authMiddleware, RolController.updateRol);
router.post('/rol/:rol_id', authMiddleware, RolController.deleteRol);

// --- usuarios roles ------------------------------------------------------------------
router.get('/usuariosrol', UsuarioRolController.getAllUsuariosRol);
router.post('/usuariorol', authMiddleware, UsuarioRolController.createUsuarioRol);
router.put('/usuariorol/:urol_id', authMiddleware, UsuarioRolController.updateUsuarioRol);
router.post('/usuariorol/:urol_id', authMiddleware, UsuarioRolController.deleteUsuarioRol);


// --- base_membresias ------------------------------------------------------------------
router.get('/tiposmembresias', MembresiaController.getAllTiposMembresias);
router.post('/tipomembresia', authMiddleware, MembresiaController.createTipoMembresia);
router.put('/tipomembresia/:tme_id', authMiddleware, MembresiaController.updateTipoMembresia);
router.post('/tipomembresia/:tme_id', authMiddleware, MembresiaController.deleteTipoMembresia);

// --- base_avisos ------------------------------------------------------------------
router.get('/avisos', authMiddleware, AvisoController.getAllAvisos);
router.post('/aviso', authMiddleware, AvisoController.createAviso);
router.put('/aviso/:avi_id', authMiddleware, AvisoController.updateAviso);
router.post('/aviso/:avi_id', authMiddleware, AvisoController.deleteAviso);

// --- base noticias
router.get('/noticias', authMiddleware, NoticiaController.getAllNoticias);
router.post('/noticia', authMiddleware, NoticiaController.createNoticia);
router.put('/noticia/:nt_id', authMiddleware, NoticiaController.updateNoticia);
router.post('/noticia/:nt_id', authMiddleware, NoticiaController.deleteNoticia);

//// Centros
router.get('/centros', CentroController.getAllCentros);
router.post('/centro', authMiddleware, CentroController.createCentro);
router.put('/centro/:cnt_id', authMiddleware, CentroController.updateCentro);
router.post('/centro/:cnt_id', authMiddleware, CentroController.deleteCentro);

//// Especialidades
router.get('/especialidades', authMiddleware, EspecialidadController.getAllEspecialidades);
router.post('/especialidad', authMiddleware, EspecialidadController.createEspecialidad);
router.put('/especialidad/:esp_id', authMiddleware, EspecialidadController.updateEspecialidad);
router.post('/especialidad/:esp_id', authMiddleware, EspecialidadController.deleteEspecialidad);

//// doctores
router.get('/doctores', authMiddleware, DoctorController.getAllDoctores);
router.post('/doctor', authMiddleware, DoctorController.createDoctor);
router.put('/doctor/:doc_id', authMiddleware, DoctorController.updateDoctor);
router.post('/doctor/:doc_id', authMiddleware, DoctorController.deleteDoctor);
router.post('/doctores/buscar', authMiddleware, DoctorController.getAllDoctoresXCIPatMatNombres);

//// consultorios
router.get('/consultorios/:cnt_id', authMiddleware, ConsultorioController.getAllConsultorios);
router.post('/consultorio', authMiddleware, ConsultorioController.createConsultorio);
router.put('/consultorio/:con_id', authMiddleware, ConsultorioController.updateConsultorio);
router.post('/consultorio/:con_id', authMiddleware, ConsultorioController.deleteConsultorio);

//// planificacion
router.get('/planificaciones/:fecha', authMiddleware, PlanificacionController.getAllPlanificaciones);
router.get('/planificaciones/:fecha/:cnt_id', PlanificacionController.getAllPlanificacionesXFechaCntId);
router.post('/planificacion', authMiddleware, PlanificacionController.createPlanificacion);
router.put('/planificacion/:pln_id', authMiddleware, PlanificacionController.updatePlanificacion);
router.post('/planificacion/:pln_id', authMiddleware, PlanificacionController.deletePlanificacion);

//// Tipos Cliente
router.get('/tiposClientes', TiposClienteController.getAllTiposClientes);
router.post('/tiposCliente', authMiddleware, TiposClienteController.createTipoCliente);
router.put('/tiposCliente/:tcli_id', authMiddleware, TiposClienteController.updateTipoCliente);
router.post('/tiposCliente/:tcli_id', authMiddleware, TiposClienteController.deleteTipoCliente);

//// Clientes
router.post('/cliente/buscarHistorial', ClienteController.getClienteHistorialXCliId); // lo puse aqui por tema del compilador tsc, tema en las rutas
router.post('/clientes/buscarXCI', authMiddleware, ClienteController.getClientesXCI);
router.post('/clientes/buscar', authMiddleware, ClienteController.getAllClientesXCIPatMatNombres);

router.get('/clientes/:fecha', authMiddleware, ClienteController.getAllClientesXFecha);
router.get('/clientes', authMiddleware, ClienteController.getAllClientes);
router.post('/cliente', authMiddleware, ClienteController.createCliente);
router.put('/cliente/:cli_id', authMiddleware, ClienteController.updateCliente);
router.post('/cliente/:cli_id', authMiddleware, ClienteController.deleteCliente);
router.post('/clientes/buscar', authMiddleware, ClienteController.getAllClientesXCIPatMatNombres);

//// Historiales
router.get('/historiales', authMiddleware, HistorialesController.getAllHistoriales);
router.post('/historial', authMiddleware, HistorialesController.createHistorial);
router.post('/historiales/buscar', HistorialesController.getAllHistorialesXCIPatMatNombres);
router.put('/historial/:hc_id', authMiddleware, HistorialesController.updateHistorial);
router.post('/historial/:hc_id', authMiddleware, HistorialesController.deleteHistorial);

//// Historiales Detalle
router.get('/historialesDet/:hc_id', authMiddleware, HistorialesDetController.getAllHistorialesDetXHcId);
router.get('/historialesDet/buscar/:hcd_id', authMiddleware, HistorialesDetController.getHistorialDet);
router.post('/historialDet', authMiddleware, HistorialesDetController.createHistorialDet);
router.put('/historialDet/:hcd_id', authMiddleware, HistorialesDetController.updateHistorialDet);
router.post('/historialDet/:hcd_id', authMiddleware, HistorialesDetController.deleteHistorialDet);

//// Fichas
//router.get('/fichas/:fecha', authMiddleware, FichaController.getAllFichas);
router.get('/fichas/historiales/:fecha/:cnt_id', authMiddleware, FichaController.getAllFichasHistoriales);

router.get('/fichas/:fecha/:cnt_id', FichaController.getAllFichas);
router.post('/ficha', FichaController.createFicha);
router.get('/ficha/buscar/:fch_id', FichaController.getFicha);
router.put('/ficha/:fch_id', authMiddleware, FichaController.updateFicha);
router.post('/ficha/:fch_id', authMiddleware, FichaController.deleteFicha);

router.post('/sice/setHistorial/:hcl_codigo', SiceController.setHistorial);

export default router;
