// controllers/UserController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';
//import Comision from '../models/Comision';

const ComisionController = {
  getAllComisiones: async (req: Request, res: Response) => {
    try {
      const comisionesQuery = await pool.query('SELECT * FROM base_comisiones');
      const comisiones = comisionesQuery.rows;
      res.json(comisiones);
    } catch (error) {
      console.error('Error al obtener los comisiones:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  createComision: async (req: Request, res: Response) => {
    const { com_titulo, com_contenido, com_registrado, com_usr_id } = req.body;

    try {

      // Crear un nuevo comisiones en la base de datos
      const newComision = await pool.query('INSERT INTO base_comisiones (com_titulo, com_contenido, com_registrado, com_usr_id) VALUES ($1, $2, $3, $4) RETURNING *', [com_titulo, com_contenido, com_registrado, com_usr_id]);

      res.json(newComision.rows[0]);
    } catch (error) {
      console.error('Error al crear la Comision:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  updateComision: async (req: Request, res: Response) => {
    const { com_id } = req.params;
    const { com_titulo, com_contenido, com_actualizado, com_usr_id} = req.body;

    try {
      // Verificar si el Comisiones existe en la base de datos
      const comisionesQuery = await pool.query('SELECT * FROM base_comisiones WHERE com_id = $1', [com_id]);
      const comisiones = comisionesQuery.rows[0];

      if (!comisiones) {
        return res.status(404).json({ message: 'Comision no encontrado' });
      }

      // Actualizar el Comisiones en la base de datos
      const updatedComision = await pool.query(

        'UPDATE base_comisiones SET com_titulo = $1, com_contenido = $2, com_actualizado = $3, com_usr_id = $4 WHERE com_id = $5 RETURNING *',
        [com_titulo, com_contenido, com_actualizado, com_usr_id, com_id]
      );

      res.json(updatedComision.rows[0]);
    } catch (error) {
      console.error('Error al actualizar la Comision:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  deleteComision: async (req: Request, res: Response) => {
    const { com_id } = req.params;
    const { com_usr_id, com_estado = 'X'} = req.body;

    try {
      // Verificar si el Comisiones existe en la base de datos
      const comisionesQuery = await pool.query('SELECT * FROM base_comisiones WHERE com_id = $1', [com_id]);
      const comisiones = comisionesQuery.rows[0];

      if (!comisiones) {
        return res.status(404).json({ message: 'Comisiones no encontrado' });
      }

      // Eliminar el Comisiones de la base de datos
      await pool.query('UPDATE base_comisiones SET com_estado = $1, com_usr_id = $2 WHERE com_id = $3 RETURNING *', 
            [com_estado, com_usr_id, com_id]);

      res.json({ message: 'Comisiones eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el Comisiones:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

};

export default ComisionController;
