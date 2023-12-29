import { Request, Response } from 'express';
import { ejecutarConsulta } from '../services/dataService';

const PacientesController = {
  getAllClientes: async (req: Request, res: Response) => {
    try {
      const sql = `SELECT TOP 10 HCL_CODIGO AS cli_id, HCL_NUMCI AS cli_nit, HCL_APPAT AS cli_paterno, HCL_APMAT AS cli_materno, HCL_NOMBRE as cli_nombres,
        HCL_TELDOM AS cli_telefono, HCL_DIRECC AS cli_direccion, HCL_FECNAC AS cli_fec_nac, HCL_FECHA AS cli_registrado,
        'CLR' AS tcli_codigo, 'CLR' AS tcli_descripcion
      FROM SE_HC
      WHERE HCL_ESTADO = 'A'`;
      const clientes = await ejecutarConsulta(sql);
      res.json(clientes);
    } catch (error) {
      console.error('Error al obtener los Clientes:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  getAllClientesXCIPatMatNombres: async (req: Request, res: Response) => {
    const { cli_nit, cli_paterno, cli_materno, cli_nombres } = req.body;

    let condicion = '';
    condicion += cli_nit !== "" ? ` AND HCL_NUMCI like '${cli_nit}%'` : "";
    condicion += cli_paterno !== "" ? ` AND UPPER(HCL_APPAT) like '${cli_paterno.toUpperCase()}%'` : "";
    condicion += cli_materno !== "" ? ` AND UPPER(HCL_APMAT) like '${cli_materno.toUpperCase()}%'` : "";
    condicion += cli_nombres !== "" ? ` AND UPPER(HCL_NOMBRE) like '${cli_nombres.toUpperCase()}%'` : "";

    try {
      const sql = `SELECT TOP 10 HCL_CODIGO AS cli_id, HCL_NUMCI AS cli_nit, HCL_APPAT AS cli_paterno, HCL_APMAT AS cli_materno, HCL_NOMBRE as cli_nombres,
        HCL_TELDOM AS cli_telefono, HCL_DIRECC AS cli_direccion, HCL_FECNAC AS cli_fec_nac, HCL_FECHA AS cli_registrado,
        'CLR' AS tcli_codigo, 'CLR' AS tcli_descripcion
      FROM SE_HC
      WHERE HCL_ESTADO = 'A' ${condicion}`;
      const clientes = await ejecutarConsulta(sql);
      res.json(clientes);
    } catch (error) {
      console.error('Error al obtener los Clientes:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },
};

export default PacientesController;