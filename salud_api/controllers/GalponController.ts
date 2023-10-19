// controllers/UserController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';
//import Membresia from '../models/Membresia';

const GalponController = {
  getAllGalpones: async (req: Request, res: Response) => {
    try {
      const galponesQuery = await pool.query(
        "SELECT g.*, a.ar_codigo, a.ar_descripcion " +
        "FROM prc_galpones g " +
        "INNER JOIN prc_areas a ON a.ar_id = g.gp_ar_id " +
        "WHERE g.gp_estado != 'X' ORDER BY 1 "
        ); // quitar el plural dela ultima palabra
      const galpones = galponesQuery.rows;
      res.json(galpones);
    } catch (error) {
      console.error('Error al obtener los Galpones:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  createGalpon: async (req: Request, res: Response) => {
    const { gp_codigo, gp_descripcion, gp_ar_id, gp_actualizado, gp_usr_id, gp_estado} = req.body;

    try {

      // Crear un nuevo galpones en la base de datos
      const newGalpon = await pool.query('INSERT INTO prc_galpones'
        + '(gp_ar_id, gp_codigo, gp_descripcion,'
        + 'gp_usr_id, gp_estado)'
        + 'VALUES ($1, $2, $3, $4, $5) RETURNING *', 
        [gp_ar_id, gp_codigo, gp_descripcion, gp_usr_id, gp_estado]);

      res.json(newGalpon.rows[0]);
    } catch (error) {
      console.error('Error al crear el Galpon:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  updateGalpon: async (req: Request, res: Response) => {
    const { gp_id } = req.params;
    const { gp_ar_id, gp_codigo, gp_descripcion, gp_actualizado, gp_usr_id, gp_estado} = req.body;

    try {
      // Verificar si el Galpones existe en la base de datos
      const galponesQuery = await pool.query('SELECT * FROM prc_galpones WHERE gp_id = $1', [gp_id]);
      const galpones = galponesQuery.rows[0];

      if (!galpones) {
        return res.status(404).json({ message: 'Galpon no encontrado' });
      }

      // Actualizar el Galpones en la base de datos
      const updateGalpon = await pool.query(
        'UPDATE prc_galpones SET gp_ar_id = $1, gp_codigo = $2, gp_descripcion = $3, gp_actualizado = $4, gp_usr_id = $5 WHERE gp_id = $6 RETURNING *',
        [gp_ar_id, gp_codigo, gp_descripcion, gp_actualizado, gp_usr_id, gp_id]
      );

      res.json(updateGalpon.rows[0]);
    } catch (error) {
      console.error('Error al actualizar el Galpon:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  deleteGalpon: async (req: Request, res: Response) => {
    const { gp_id } = req.params;
    const { gp_usr_id, gp_actualizado, gp_estado} = req.body;

    try {
      // Verificar si el Galpones existe en la base de datos
      const galponesQuery = await pool.query('SELECT * FROM prc_galpones WHERE gp_id = $1', [gp_id]);
      const galpones = galponesQuery.rows[0];

      if (!galpones) {
        return res.status(404).json({ message: 'Galpon no encontrado' });
      }

      // Eliminar el Galpones de la base de datos
      await pool.query('UPDATE prc_galpones SET gp_actualizado = $1 gp_estado = $2, gp_usr_id = $3 WHERE gp_id = $4 RETURNING *', 
            [gp_actualizado, gp_estado, gp_usr_id, gp_id]);

      res.json({ message: 'Galpon eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el Galpon:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

};

export default GalponController;
