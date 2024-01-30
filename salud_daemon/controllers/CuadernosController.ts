import { Request, Response } from 'express';
import { ejecutarConsulta } from '../services/dataService';

const CuadernosController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const sql = `SELECT CUA_CODIGO, CUA_DESCRIPCION, CUA_VIGENCIA, EMP_CODIGO, CUA_TIPO, CUA_COPIAS,
        CUA_FECHA_INICIO, CUA_FECHA_FINAL, CUA_ESTADO, CUA_GRUPO, es_codigo, codestabl, CUA_USO_SEGSOCIAL
      FROM SE_CUADERNO
      WHERE CUA_ESTADO = 'A'
      ORDER BY CUA_DESCRIPCION`;
      const resultado = await ejecutarConsulta(sql, 'bdESTADISTICA');
      res.json(resultado);
    } catch (error) {
      console.error('Error de consulta:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  getCodigo: async (req: Request, res: Response) => {
    const { cua_codigo } = req.params;
    try {
      const sql = `SELECT CUA_CODIGO, CUA_DESCRIPCION, CUA_VIGENCIA, EMP_CODIGO, CUA_TIPO, CUA_COPIAS,
        CUA_FECHA_INICIO, CUA_FECHA_FINAL, CUA_ESTADO, CUA_GRUPO, es_codigo, codestabl, CUA_USO_SEGSOCIAL
      FROM SE_CUADERNO
      WHERE CUA_CODIGO = ${cua_codigo}`;
      const resultado = await ejecutarConsulta(sql, 'bdESTADISTICA');
      res.json(resultado[0]);
    } catch (error) {
      console.error('Error de consulta:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },
};

export default CuadernosController;