// controllers/UserController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';
//import Membresia from '../models/Membresia';

const MembresiaController = {
  getAllTiposMembresias: async (req: Request, res: Response) => {
    try {
      const tiposmembresiasQuery = await pool.query('SELECT * FROM base_tipos_membresias'); // quitar el plural dela ultima palabra
      const tiposmembresias = tiposmembresiasQuery.rows;
      res.json(tiposmembresias);
    } catch (error) {
      console.error('Error al obtener los Tipos de Membresias:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  createTipoMembresia: async (req: Request, res: Response) => {
    const { tme_codigo, tme_descripcion, tme_costo, tme_registrado, tme_usr_id} = req.body;

    try {

      // Crear un nuevo tiposmembresias en la base de datos
      const newMembresias = await pool.query('INSERT INTO base_tipos_membresias (tme_codigo, tme_descripcion, tme_costo, tme_registrado, tme_usr_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [tme_codigo, tme_descripcion, tme_costo, tme_registrado, tme_usr_id]);

      res.json(newMembresias.rows[0]);
    } catch (error) {
      console.error('Error al crear el Tipo de Membresia:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  updateTipoMembresia: async (req: Request, res: Response) => {
    const { tme_id } = req.params;
    const { tme_codigo, tme_descripcion, tme_costo, tme_actualizado, tme_usr_id} = req.body;

    try {
      // Verificar si el Membresias existe en la base de datos
      const tiposmembresiasQuery = await pool.query('SELECT * FROM base_tipos_membresias WHERE tme_id = $1', [tme_id]);
      const tiposmembresias = tiposmembresiasQuery.rows[0];

      if (!tiposmembresias) {
        return res.status(404).json({ message: 'Tipo de Membresia no encontrado' });
      }

      // Actualizar el Membresias en la base de datos
      const updateTipoMembresia = await pool.query(
        'UPDATE base_tipos_membresias SET tme_codigo = $1, tme_descripcion = $2, tme_costo = $3, tme_actualizado = $4, tme_usr_id = $5 WHERE tme_id = $6 RETURNING *',
        [tme_codigo, tme_descripcion, tme_costo, tme_actualizado, tme_usr_id, tme_id]
      );

      res.json(updateTipoMembresia.rows[0]);
    } catch (error) {
      console.error('Error al actualizar el Tipo de Membresia:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  deleteTipoMembresia: async (req: Request, res: Response) => {
    const { tme_id } = req.params;
    const { tme_usr_id, tme_estado = 'X'} = req.body;

    try {
      // Verificar si el Membresias existe en la base de datos
      const tiposmembresiasQuery = await pool.query('SELECT * FROM base_tipos_membresias WHERE tme_id = $1', [tme_id]);
      const tiposmembresias = tiposmembresiasQuery.rows[0];

      if (!tiposmembresias) {
        return res.status(404).json({ message: 'Tipo de Membresia no encontrado' });
      }

      // Eliminar el Membresias de la base de datos
      await pool.query('UPDATE base_tipos_membresias SET tme_estado = $1, tme_usr_id = $2 WHERE tme_id = $3 RETURNING *', 
            [tme_estado, tme_usr_id, tme_id]);

      res.json({ message: 'Tipo de Membresia eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el Tipo de Membresia:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

};

export default MembresiaController;
