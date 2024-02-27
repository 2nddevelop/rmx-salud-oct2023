// controllers/UserController.ts
import { Request, Response } from 'express';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import pool from '../db';
//import Membresia from '../models/Membresia';

const SiceController = {
  setHistorial: async (req: Request, res: Response) => {
    const { hcl_codigo } = req.params;
    const { paciente } = req.body;
    try {
      pool.query(`SELECT cli_id FROM rmx_gral_clientes WHERE codigo_ant = ${hcl_codigo}`).then(fila => {
        const hcl_codigo_nuevo = paciente.hcl_codigo_nuevo;
        delete paciente.hcl_codigo_nuevo;
        if (fila.rows.length > 0) {
          pool.query(`UPDATE rmx_gral_clientes SET
              cli_data = '${JSON.stringify(paciente)}',
              codigo_ant = ${hcl_codigo_nuevo}
            WHERE cli_id = ${fila.rows[0].cli_id}`);
        } else {
          pool.query(`INSERT INTO rmx_gral_clientes (cli_tcli_id, cli_data, cli_usr_id, codigo_ant) VALUES
            (0, '${JSON.stringify(paciente)})', 0, ${hcl_codigo}`);
        }
      });
      res.json({ message: 'Hecho' });
    } catch (error) {
      console.error('Error al obtener los Tipos de Roles:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },
};

export default SiceController;
