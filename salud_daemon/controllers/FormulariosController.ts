import { Request, Response } from 'express';
import { ejecutarConsulta } from '../services/dataService';

const FormulariosController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const sql = `SELECT TOP 100 FOR_CODIGO, FOR_FECHA, CUA_CODIGO, COL_CODIGO, FOR_COL_POSI, FOR_VIGENCIA, EMP_CODIGO,
      FOR_VER, GRS_CODIGO, FOR_VAL_GRS, FOR_VAL_DEF, FOR_OBLIGA, FOR_MODIFICA, FOR_FORMATO, FOR_CURSIVA
      FROM SE_FORMULARIO
      ORDER BY FOR_CODIGO`;
      const resultado = await ejecutarConsulta(sql, 'bdESTADISTICA');
      res.json(resultado);
    } catch (error) {
      console.error('Error de consulta:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },
};

export default FormulariosController;