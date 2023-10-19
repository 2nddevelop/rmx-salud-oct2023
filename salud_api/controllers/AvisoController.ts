// controllers/AvisoController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';
//import Aviso from '../models/Aviso';

const AvisoController = {
  getAllAvisos: async (req: Request, res: Response) => {
    try {
      const avisosQuery = await pool.query('SELECT * FROM base_avisos');
      const avisos = avisosQuery.rows;
      res.json(avisos);
    } catch (error) {
      console.error('Error al obtener los origenes:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  createAviso: async (req: Request, res: Response) => {
    const { avi_titulo, avi_contenido, avi_registrado, avi_usr_id} = req.body;

    try {

      // Crear un nuevo aviso en la base de datos
      const newAviso = await pool.query('INSERT INTO base_avisos (avi_titulo, avi_contenido, avi_registrado, avi_usr_id) VALUES ($1, $2, $3, $4) RETURNING *', [avi_titulo, avi_contenido, avi_registrado, avi_usr_id]);

      res.json(newAviso.rows[0]);
    } catch (error) {
      console.error('Error al crear el aviso:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  updateAviso: async (req: Request, res: Response) => {
    const { avi_id } = req.params;
    const { avi_titulo, avi_contenido, avi_actualizado, avi_usr_id} = req.body;

    try {
      // Verificar si el Aviso existe en la base de datos
      const avisosQuery = await pool.query('SELECT * FROM base_avisos WHERE avi_id = $1', [avi_id]);
      const avisos = avisosQuery.rows[0];

      if (!avisos) {
        return res.status(404).json({ message: 'Aviso no encontrado' });
      }

      // Actualizar el Aviso en la base de datos
      const updatedAviso = await pool.query(
        'UPDATE base_avisos SET avi_titulo = $1, avi_contenido = $2, avi_actualizado = $3, avi_usr_id = $4 WHERE avi_id = $5 RETURNING *',
        [avi_titulo, avi_contenido, avi_actualizado, avi_usr_id, avi_id]
      );
      res.json(updatedAviso.rows[0]);
    } catch (error) {
      console.error('Error al actualizar el Aviso:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  deleteAviso: async (req: Request, res: Response) => {
    const { avi_id } = req.params;
    const { avi_usr_id, avi_estado = 'X'} = req.body;

    try {
      // Verificar si el Aviso existe en la base de datos
      const avisosQuery = await pool.query('SELECT * FROM base_avisos WHERE avi_id = $1', [avi_id]);
      const avisos = avisosQuery.rows[0];

      if (!avisos) {
        return res.status(404).json({ message: 'Aviso no encontrado' });
      }

      // Eliminar el Aviso de la base de datos
      await pool.query('UPDATE base_avisos SET avi_estado = $1, avi_usr_id = $2 WHERE avi_id = $3 RETURNING *', 
            [avi_estado, avi_usr_id, avi_id ]);

      res.json({ message: 'Aviso eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el Aviso:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },
};

export default AvisoController;