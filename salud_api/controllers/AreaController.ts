// controllers/UserController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';
//import Membresia from '../models/Membresia';

const AreaController = {
  getAllAreas: async (req: Request, res: Response) => {
    try {
      const areasQuery = await pool.query(
        "SELECT * FROM prc_areas WHERE ar_estado != 'X' ORDER BY 1 "
      ); // quitar el plural dela ultima palabra
      const areas = areasQuery.rows;
      res.json(areas);
    } catch (error) {
      console.error('Error al obtener los Tipos de Areas:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  createArea: async (req: Request, res: Response) => {
    const { ar_codigo, ar_descripcion, 
            ar_actualizado, ar_usr_id, ar_estado} = req.body;

    try {
      // Crear un nuevo areas en la base de datos
      const newAreas = await pool.query('INSERT INTO prc_areas' 
      + '(ar_codigo, ar_descripcion, ar_usr_id, ar_estado)'
      + 'VALUES ($1, $2, $3, $4) RETURNING *', [ar_codigo, ar_descripcion, ar_usr_id, ar_estado ]);

      res.json(newAreas.rows[0]);
    } catch (error) {
      console.error('Error al crear el Area:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  updateArea: async (req: Request, res: Response) => {
    const { ar_id } = req.params;
    const { ar_codigo, ar_descripcion, ar_actualizado, ar_usr_id, ar_estado} = req.body;

    try {
      // Verificar si el Areas existe en la base de datos
      const areasQuery = await pool.query('SELECT * FROM prc_areas WHERE ar_id = $1', [ar_id]);
      const areas = areasQuery.rows[0];

      if (!areas) {
        return res.status(404).json({ message: 'Area no encontrada' });
      }

      // Actualizar el Areas en la base de datos
      const updateArea = await pool.query(
        'UPDATE prc_areas SET ar_codigo = $1, ar_descripcion = $2, ar_actualizado = $3, ar_usr_id = $4 WHERE ar_id = $5 RETURNING *',
        [ar_codigo, ar_descripcion, ar_actualizado, ar_usr_id, ar_id]
      );

      res.json(updateArea.rows[0]);
    } catch (error) {
      console.error('Error al actualizar el Area:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  deleteArea: async (req: Request, res: Response) => {
    const { ar_id } = req.params;
    const { ar_usr_id, ar_actualizado, ar_estado} = req.body;

    try {
      // Verificar si el Areas existe en la base de datos
      const areasQuery = await pool.query('SELECT * FROM prc_areas WHERE ar_id = $1', [ar_id]);
      const areas = areasQuery.rows[0];

      if (!areas) {
        return res.status(404).json({ message: 'Area no encontrada' });
      }

      // Eliminar el Areas de la base de datos
      await pool.query('UPDATE prc_areas SET ar_actualizado = 1 ar_estado = $2, ar_usr_id = $3 WHERE ar_id = $4 RETURNING *', 
            [ar_actualizado, ar_estado, ar_usr_id, ar_id]);

      res.json({ message: 'Area eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el Area:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

};

export default AreaController;
