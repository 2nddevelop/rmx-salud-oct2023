import { Request, Response } from 'express';
import { ejecutarConsulta } from '../services/dataService';

const ColumnasController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const sql = `SELECT TOP 100 COL_CODIGO, COL_DESCRIPCION, COL_TIPO, COL_INI, COL_FIN, COL_PERMISO,
        COL_VIGENCIA, EMP_CODIGO, COL_ANCHO, COL_AUXILIAR, rel_codigo
      FROM SE_COLUMNAS
      ORDER BY COL_DESCRIPCION`;
      const resultado = await ejecutarConsulta(sql, 'bdESTADISTICA');
      res.json(resultado);
    } catch (error) {
      console.error('Error de consulta:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },
};

export default ColumnasController;