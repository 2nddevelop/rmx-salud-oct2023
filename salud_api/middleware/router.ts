// middleware/router.ts
import express from 'express';
import UserController from '../controllers/UserController';
import OrigenController from '../controllers/OrigenController';
import AvisoController from '../controllers/AvisoController';
import NoticiaController from '../controllers/NoticiaController';
import MembresiaController from '../controllers/MembresiaController';
import ComisionController from '../controllers/ComisionController';
import AreaController from '../controllers/AreaController';
import GalponController from '../controllers/GalponController';
import RegistroController from '../controllers/RegistroController';
import authMiddleware from '../middleware/authMiddleware';

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

// --- base_origenes ------------------------------------------------------------------
router.get('/origenes', authMiddleware, OrigenController.getAllOrigenes);
router.post('/origen', authMiddleware, OrigenController.createOrigen);
router.put('/origen/:ori_id', authMiddleware, OrigenController.updateOrigen);
router.post('/origen/:ori_id', authMiddleware, OrigenController.deleteOrigen);

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

// --- base_comisiones ------------------------------------------------------------------
router.get('/comisiones', ComisionController.getAllComisiones);
router.post('/comision', authMiddleware, ComisionController.createComision);
router.put('/comision/:com_id', authMiddleware, ComisionController.updateComision);
router.post('/comision/:com_id', authMiddleware, ComisionController.deleteComision);

// --- base noticias
router.get('/noticias', authMiddleware, NoticiaController.getAllNoticias);
router.post('/noticia', authMiddleware, NoticiaController.createNoticia);
router.put('/noticia/:nt_id', authMiddleware, NoticiaController.updateNoticia);
router.post('/noticia/:nt_id', authMiddleware, NoticiaController.deleteNoticia);

// --- base area
router.get('/areas', authMiddleware, AreaController.getAllAreas);
router.post('/area', authMiddleware, AreaController.createArea);
router.put('/area/:ar_id', authMiddleware, AreaController.updateArea);
router.post('/area/:ar_id', authMiddleware, AreaController.deleteArea);

// --- base galpon
router.get('/galpones', authMiddleware, GalponController.getAllGalpones);
router.post('/galpon', authMiddleware, GalponController.createGalpon);
router.put('/galpon/:gp_id', authMiddleware, GalponController.updateGalpon);
router.post('/galpon/:gp_id', authMiddleware, GalponController.deleteGalpon);

// --- base registros
router.get('/registros', authMiddleware, RegistroController.getAllRegistros);
router.get('/registros/:reg_fecha/:reg_ar_id', RegistroController.getAllRegistrosByFechaArea);
router.post('/registro', authMiddleware, RegistroController.createRegistro);
router.put('/registro/:reg_id', authMiddleware, RegistroController.updateRegistro);
router.post('/registro/:reg_id', authMiddleware, RegistroController.deleteRegistro);

export default router;
