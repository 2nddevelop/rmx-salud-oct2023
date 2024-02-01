import { Request, Response } from 'express';
import { ejecutarConsulta } from '../services/dataService';

const ListasController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const sql = `SELECT TOP 100 lis_tabla, lis_codigo, lis_descripcion, emp_codigo
      FROM ad_listagenericaE
      ORDER BY lis_tabla, lis_descripcion`;
//      const resultado = await ejecutarConsulta(sql, 'bdADMIN');
      const resultado = await ejecutarConsulta(sql, 'bdESTADISTICA');
      res.json(resultado);
    } catch (error) {
      console.error('Error de consulta:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  getTblListas: async (req: Request, res: Response) => {
    const { tabla } = req.params;
    try {
      let sql = '';
      if (isNaN(parseInt(tabla))) {
        sql = `SELECT lis_codigo, lis_descripcion, emp_codigo
        FROM ad_listagenericaE
        WHERE lis_tabla = '${tabla}'
        ORDER BY lis_descripcion`;
      } else {
        sql = `SELECT l.lis_codigo, l.lis_descripcion, l.emp_codigo
        FROM SE_COLUMNAS c JOIN ad_RelacionaTablas t ON c.rel_codigo = t.rel_codigo
            JOIN ad_listagenericaE l ON t.lis_tabla = l.lis_tabla
        WHERE c.COL_CODIGO = ${tabla}
        ORDER BY lis_descripcion`;
      }
//      const resultado = await ejecutarConsulta(sql, 'bdADMIN');
      const resultado = await ejecutarConsulta(sql, 'bdESTADISTICA');
      res.json(resultado);
    } catch (error) {
      console.error('Error de consulta:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },
};

export default ListasController;