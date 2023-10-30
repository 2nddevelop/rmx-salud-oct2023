// controllers/UserController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';
//import Membresia from '../models/Membresia';

const ClienteController = {
  getAllClientes: async (req: Request, res: Response) => {
    try {
      const clienteQuery = await pool.query(
        "SELECT c.*, tc.tcli_codigo, tc.tcli_descripcion " +
        "FROM rmx_gral_clientes c " +
        "INNER JOIN rmx_gral_tipos_cliente tc ON tc.tcli_id = c.cli_tcli_id " +
        "WHERE c.cli_estado != 'X' ORDER BY 1 "
      ); 
      const clientes = clienteQuery.rows;
      res.json(clientes);
    } catch (error) {
      console.error('Error al obtener los Clientes:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  createCliente: async (req: Request, res: Response) => {
    console.log('Create: ', req.body);

    const { cli_tcli_id, cli_data, cli_modificado, cli_usr_id, cli_estado } = req.body;

    try {
      // Crear un nuevo Cliente en la base de datos
      const newCliente = await pool.query('INSERT INTO rmx_gral_clientes'
        + '(cli_tcli_id, cli_data, cli_usr_id, cli_estado) '
        + 'VALUES ($1, $2, $3, $4) RETURNING *', 
        [ cli_tcli_id, cli_data, cli_usr_id, cli_estado ]);

      res.json(newCliente.rows[0]);
    } catch (error) {
      console.error('Error al crear el origen:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  updateCliente: async (req: Request, res: Response) => {
    console.log('ID: ', req.params);
    console.log('Update: ', req.body);

    const { cli_id } = req.params;
    const { cli_tcli_id, cli_data, cli_modificado, cli_usr_id, cli_estado } = req.body;

    try {
      // Verificar si el Clientes existe en la base de datos
      const clienteQuery = await pool.query('SELECT * FROM rmx_gral_clientes WHERE cli_id = $1', [cli_id]);
      const clientes = clienteQuery.rows[0];

      if (!clientes) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }

      // Actualizar el Clientes en la base de datos
      const updateCliente = await pool.query(
        'UPDATE rmx_gral_clientes SET cli_tcli_id = $1, cli_data = $2, cli_modificado = $3, cli_usr_id = $4 WHERE cli_id = $5 RETURNING *',
        [cli_tcli_id, cli_data, cli_modificado, cli_usr_id, cli_id]
      );

      res.json(updateCliente.rows[0]);
    } catch (error) {
      console.error('Error al actualizar el Cliente:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  deleteCliente: async (req: Request, res: Response) => {
    const { cli_id } = req.params;
    const { cli_usr_id, cli_modificado, cli_estado} = req.body;
    try {

      const result = await pool.query(
        'UPDATE rmx_gral_clientes SET cli_modificado = $1, cli_estado = $2, cli_usr_id = $3 WHERE cli_id = $4 RETURNING *', 
        [cli_modificado, cli_estado, cli_usr_id, cli_id]
      );
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }
      res.json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el Cliente:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

};

export default ClienteController;
