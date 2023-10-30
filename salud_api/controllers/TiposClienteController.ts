// controllers/UserController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';
//import Membresia from '../models/Membresia';

const TiposClienteController = {
  getAllTiposClientes: async (req: Request, res: Response) => {
    try {
      const tiposClienteQuery = await pool.query(
        "SELECT * FROM rmx_gral_tipos_cliente WHERE tcli_estado != 'X' ORDER BY 1 "
      ); 
      const tiposCliente = tiposClienteQuery.rows;
      res.json(tiposCliente);
    } catch (error) {
      console.error('Error al obtener los Tipos de Tipo Cliente:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  createTipoCliente: async (req: Request, res: Response) => {
    const { tcli_codigo, tcli_descripcion, 
            tcli_modificado, tcli_usr_id, tcli_estado} = req.body;

    try {
      const newTiposCliente = await pool.query('INSERT INTO rmx_gral_tipos_cliente' 
      + '(tcli_codigo, tcli_descripcion, tcli_usr_id, tcli_estado)'
      + 'VALUES ($1, $2, $3, $4) RETURNING *', [tcli_codigo, tcli_descripcion, tcli_usr_id, tcli_estado ]);

      res.json(newTiposCliente.rows[0]);
    } catch (error) {
      console.error('Error al crear el Tipo Cliente:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  updateTipoCliente: async (req: Request, res: Response) => {
    const { tcli_id } = req.params;
    const { tcli_codigo, tcli_descripcion, tcli_modificado, tcli_usr_id, tcli_estado} = req.body;

    try {
      const tiposClienteQuery = await pool.query('SELECT * FROM rmx_gral_tipos_cliente WHERE tcli_id = $1', [tcli_id]);
      const tiposCliente = tiposClienteQuery.rows[0];
      if (!tiposCliente) {
        return res.status(404).json({ message: 'Tipo Cliente no encontrada' });
      }
      const updateTipoCliente = await pool.query(
        'UPDATE rmx_gral_tipos_cliente SET tcli_codigo = $1, tcli_descripcion = $2, tcli_modificado = $3, tcli_usr_id = $4 WHERE tcli_id = $5 RETURNING *',
        [tcli_codigo, tcli_descripcion, tcli_modificado, tcli_usr_id, tcli_id]
      );
      res.json(updateTipoCliente.rows[0]);
    } catch (error) {
      console.error('Error al actualizar el Tipo Cliente:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  deleteTipoCliente: async (req: Request, res: Response) => {
    const { tcli_id } = req.params;
    const { tcli_usr_id, tcli_modificado, tcli_estado} = req.body;
    try {
      const result = await pool.query(
        'UPDATE rmx_gral_tipos_cliente SET tcli_modificado = $1, tcli_estado = $2, tcli_usr_id = $3 WHERE tcli_id = $4 RETURNING *',
        [tcli_modificado, tcli_estado, tcli_usr_id, tcli_id]
      );
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Tipo Cliente no encontrada' });
      }
      res.json({ message: 'Tipo Cliente eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el Tipo Cliente:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

};

export default TiposClienteController;
