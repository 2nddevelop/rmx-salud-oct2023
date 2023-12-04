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

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('app/app.html', { root: '.' });
});

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
//router.post('/users', authMiddleware, UserController.createUser);
//router.put('/users/:id', authMiddleware, UserController.updateUser);
//router.delete('/users/:id', authMiddleware, UserController.deleteUser);

// --- base_membresias ------------------------------------------------------------------
router.get('/tiposmembresias', MembresiaController.getAllTiposMembresias);
router.post('/tipomembresia', authMiddleware, MembresiaController.createTipoMembresia);
router.put('/tipomembresia/:tme_id', authMiddleware, MembresiaController.updateTipoMembresia);
router.post('/tipomembresia/:tme_id', authMiddleware, MembresiaController.deleteTipoMembresia);

//// Centros
router.get('/centros', authMiddleware, CentroController.getAllCentros);
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

//// consultorios
router.get('/consultorios/:cnt_id', authMiddleware, ConsultorioController.getAllConsultorios);
router.post('/consultorio', authMiddleware, ConsultorioController.createConsultorio);
router.put('/consultorio/:con_id', authMiddleware, ConsultorioController.updateConsultorio);
router.post('/consultorio/:con_id', authMiddleware, ConsultorioController.deleteConsultorio);

//// planificacion
router.get('/planificaciones/:fecha', authMiddleware, PlanificacionController.getAllPlanificaciones);
router.get('/planificaciones/:fecha/:cnt_id', authMiddleware, PlanificacionController.getAllPlanificacionesXFechaCntId);
router.post('/planificacion', authMiddleware, PlanificacionController.createPlanificacion);
router.put('/planificacion/:pln_id', authMiddleware, PlanificacionController.updatePlanificacion);
router.post('/planificacion/:pln_id', authMiddleware, PlanificacionController.deletePlanificacion);

//// Tipos Cliente
router.get('/tiposClientes', authMiddleware, TiposClienteController.getAllTiposClientes);
router.post('/tiposCliente', authMiddleware, TiposClienteController.createTipoCliente);
router.put('/tiposCliente/:tcli_id', authMiddleware, TiposClienteController.updateTipoCliente);
router.post('/tiposCliente/:tcli_id', authMiddleware, TiposClienteController.deleteTipoCliente);

//// Clientes
router.get('/clientes', authMiddleware, ClienteController.getAllClientes);
router.post('/cliente', authMiddleware, ClienteController.createCliente);
router.put('/cliente/:cli_id', authMiddleware, ClienteController.updateCliente);
router.post('/cliente/:cli_id', authMiddleware, ClienteController.deleteCliente);

//// Historiales
router.get('/historiales', authMiddleware, HistorialesController.getAllHistoriales);
router.post('/historial', authMiddleware, HistorialesController.createHistorial);
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
router.get('/fichas/:fecha/:cnt_id', authMiddleware, FichaController.getAllFichas);
router.post('/ficha', authMiddleware, FichaController.createFicha);
router.get('/ficha/buscar/:fch_id', authMiddleware, FichaController.getFicha);
router.put('/ficha/:fch_id', authMiddleware, FichaController.updateFicha);
router.post('/ficha/:fch_id', authMiddleware, FichaController.deleteFicha);

export default router;
