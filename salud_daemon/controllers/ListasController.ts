import { Request, Response } from 'express';
import { ejecutarConsulta } from '../services/dataService';

const ListasController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const sql = `SELECT TOP 100 lis_tabla, lis_codigo, lis_descripcion, emp_codigo
      FROM ad_listagenerica
      ORDER BY lis_tabla, lis_descripcion`;
      const resultado = await ejecutarConsulta(sql, 'bdADMIN');
      res.json(resultado);
    } catch (error) {
      console.error('Error de consulta:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  getTblListas: async (req: Request, res: Response) => {
    const { tabla } = req.params;
    try {
      const sql = `SELECT lis_codigo, lis_descripcion, emp_codigo
      FROM ad_listagenerica
      WHERE lis_tabla = '${tabla}'
      ORDER BY lis_descripcion`;
      const resultado = await ejecutarConsulta(sql, 'bdADMIN');
      res.json(resultado);
    } catch (error) {
      console.error('Error de consulta:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },
};

export default ListasController;