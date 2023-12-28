// middleware/router.ts
import express from 'express';
import UserController from '../controllers/UserController';
import AreaController from '../controllers/AreaController';
import MailController from '../controllers/MailController';
import authMiddleware from './authMiddleware';

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

// --- WhatsApp
router.get('/clients', AreaController.getClients);

// --- WhatsApp
router.get('/bulkSendDb', AreaController.getAll);

// --- WhatsApp
router.post('/sendMail', MailController.sendMail);

export default router;
