// middleware/router.ts
import express from 'express';
import ColumnasController from '../controllers/ColumnasController';
import CuadernosController from '../controllers/CuadernosController';
import FormulariosController from '../controllers/FormulariosController';
import PacientesController from '../controllers/PacientesController';
import ListasController from '../controllers/ListasController';
// import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

// COLUMNAS
router.get('/columnas', ColumnasController.getAll);
router.get('/columnas/:cua_codigo', ColumnasController.getCuaColumnas);

// CUADERNOS
router.get('/cuadernos', CuadernosController.getAll);

// FORMULARIOS
router.get('/formularios', FormulariosController.getAll);

// LISTAS - en bdADMIN
router.get('/listas', ListasController.getAll);
router.get('/listas/:tabla', ListasController.getTblListas);

// PACIENTES
router.get('/clientes', PacientesController.getAll);
router.post('/clientes/buscar', PacientesController.getAllClientesXCIPatMatNombres);

export default router;