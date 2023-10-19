// controllers/UserController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';
//import Origen from '../models/Origen';

const OrigenController = {
  getAllOrigenes: async (req: Request, res: Response) => {
    try {
      const origenesQuery = await pool.query('SELECT * FROM base_origenes');
      const origenes = origenesQuery.rows;
      res.json(origenes);
    } catch (error) {
      console.error('Error al obtener los origenes:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  createOrigen: async (req: Request, res: Response) => {
    const { ori_codigo, ori_descripcion, ori_registrado, ori_usr_id } = req.body;

    try {

      // Crear un nuevo origen en la base de datos
      const newOrigen = await pool.query('INSERT INTO base_origenes (ori_codigo, ori_descripcion, ori_registrado, ori_usr_id) VALUES ($1, $2, $3, $4) RETURNING *', [ori_codigo, ori_descripcion, ori_registrado, ori_usr_id]);

      res.json(newOrigen.rows[0]);
    } catch (error) {
      console.error('Error al crear el origen:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  updateOrigen: async (req: Request, res: Response) => {
    const { ori_id } = req.params;
    const { ori_codigo, ori_descripcion, ori_actualizado, ori_usr_id } = req.body;

    try {
      // Verificar si el Origen existe en la base de datos
      const origenesQuery = await pool.query('SELECT * FROM base_origenes WHERE ori_id = $1', [ori_id]);
      const origenes = origenesQuery.rows[0];

      if (!origenes) {
        return res.status(404).json({ message: 'Origen no encontrado' });
      }

      // Actualizar el Origen en la base de datos
      const updatedOrigen = await pool.query(

        'UPDATE base_origenes SET ori_codigo = $1, ori_descripcion = $2, ori_actualizado = $3, ori_usr_id = $4 WHERE ori_id = $5 RETURNING *',
        [ori_codigo, ori_descripcion, ori_actualizado, ori_usr_id, ori_id]
      );
      res.json(updatedOrigen.rows[0]);
    } catch (error) {
      console.error('Error al actualizar el Origen:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  deleteOrigen: async (req: Request, res: Response) => {
    const { ori_id } = req.params;
    const { ori_usr_id, ori_estado = 'X'} = req.body;

    try {
      // Verificar si el Origen existe en la base de datos
      const origenesQuery = await pool.query('SELECT * FROM base_origenes WHERE ori_id = $1', [ori_id]);
      const origenes = origenesQuery.rows[0];

      if (!origenes) {
        return res.status(404).json({ message: 'Origen no encontrado' });
      }

      // Eliminar el Origen de la base de datos
      await pool.query('UPDATE base_origenes SET ori_estado = $1, ori_usr_id = $2 WHERE ori_id = $3 RETURNING *',
            [ori_estado, ori_usr_id, ori_id ]);

      res.json({ message: 'Origen eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el Origen:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },
};

export default OrigenController;
