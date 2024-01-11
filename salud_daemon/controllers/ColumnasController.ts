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

  getCuaColumnas: async (req: Request, res: Response) => {
    const { cua_codigo } = req.params;
    try {
      const sql = `SELECT l.COL_CODIGO, l.COL_DESCRIPCION, l.COL_TIPO, l.COL_INI, l.COL_FIN, l.COL_PERMISO,
        l.COL_VIGENCIA, l.EMP_CODIGO, l.COL_ANCHO, l.COL_AUXILIAR, rel_codigo
      FROM SE_FORMULARIO f JOIN SE_COLUMNAS l ON f.COL_CODIGO = l.COL_CODIGO
      WHERE f.CUA_CODIGO = ${cua_codigo}
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