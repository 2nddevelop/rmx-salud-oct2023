// middleware/router.ts
import express from 'express';
import PacientesController from '../controllers/PacientesController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

// PACIENTES
router.get('/clientes', PacientesController.getAllClientes);
router.post('/clientes/buscar', PacientesController.getAllClientesXCIPatMatNombres);

export default router;