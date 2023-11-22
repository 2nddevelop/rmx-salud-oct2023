// controllers/UserController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';
//import Membresia from '../models/Membresia';

const ConsultorioController = {
  getAllConsultorios: async (req: Request, res: Response) => {
    const { cnt_id } = req.params;
  
    try {
      const consultoriosQuery = await pool.query(
        `SELECT co.*, c.cnt_codigo, c.cnt_descripcion
        FROM rmx_sld_consultorios co
        INNER JOIN rmx_sld_centros c ON c.cnt_id = co.con_cnt_id
        WHERE co.con_cnt_id = $1
        AND co.con_estado != 'X' ORDER BY 1`, [cnt_id]
      );
      const consultorios = consultoriosQuery.rows;
      res.json(consultorios);
    } catch (error) {
      console.error('Error al obtener los Consultorios:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  createConsultorio: async (req: Request, res: Response) => {
    const { con_cnt_id, con_codigo, con_descripcion, con_usr_id, con_estado } = req.body;

    try {
      const newConsultorio = await pool.query(
        'INSERT INTO rmx_sld_consultorios (con_cnt_id, con_codigo, con_descripcion, con_usr_id, con_estado) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [con_cnt_id, con_codigo, con_descripcion, con_usr_id, con_estado]
      );

      res.json(newConsultorio.rows[0]);
    } catch (error) {
      console.error('Error al crear el Consultorio:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  updateConsultorio: async (req: Request, res: Response) => {
    const { con_id } = req.params;
    const { con_cnt_id, con_codigo, con_descripcion,
          con_modificado, con_usr_id, con_estado } = req.body;

    try {
      const consultoriosQuery = await pool.query('SELECT * FROM rmx_sld_consultorios WHERE con_id = $1', [con_id]);
      const consultorios = consultoriosQuery.rows[0];

      if (!consultorios) {
        return res.status(404).json({ message: 'Consultorio no encontrado' });
      }

      // Actualizar el Consultorios en la base de datos
      const updateConsultorio = await pool.query(
        `UPDATE rmx_sld_consultorios SET con_cnt_id = $1, con_codigo = $2, 
          con_descripcion = $3, con_modificado = $4, con_usr_id = $5, con_estado = $6 
        WHERE con_id = $7 RETURNING *`, [con_cnt_id, con_codigo, con_descripcion, con_modificado, con_usr_id, con_estado, con_id]
      );

      res.json(updateConsultorio.rows[0]);
    } catch (error) {
      console.error('Error al actualizar el Consultorio:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  deleteConsultorio: async (req: Request, res: Response) => {
    const { con_id } = req.params;
    const { con_usr_id, con_modificado, con_estado} = req.body;
    try {
      const result = await pool.query(
        'UPDATE rmx_sld_consultorios SET con_modificado = $1, con_estado = $2, con_usr_id = $3 WHERE con_id = $4 RETURNING *', 
        [con_modificado, con_estado, con_usr_id, con_id]
      );
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Consultorio no encontrado' });
      }
      res.json({ message: 'Consultorio eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el Consultorio:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

};

export default ConsultorioController;
