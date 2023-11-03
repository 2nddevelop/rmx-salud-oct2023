// controllers/UserController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';
//import Membresia from '../models/Membresia';

const CentroController = {
  getAllCentros: async (req: Request, res: Response) => {
    try {
      const centrosQuery = await pool.query(
        "SELECT * FROM rmx_sld_centros WHERE cnt_estado != 'X' ORDER BY 1 "
      ); 
      const centros = centrosQuery.rows;
      res.json(centros);
    } catch (error) {
      console.error('Error al obtener los Tipos de Centros:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  createCentro: async (req: Request, res: Response) => {
    const { cnt_codigo, cnt_descripcion, cnt_usr_id, cnt_estado} = req.body;

    try {
      const newCentros = await pool.query('INSERT INTO rmx_sld_centros' 
      + '(cnt_codigo, cnt_descripcion, cnt_usr_id, cnt_estado)'
      + 'VALUES ($1, $2, $3, $4) RETURNING *', [cnt_codigo, cnt_descripcion, cnt_usr_id, cnt_estado ]);

      res.json(newCentros.rows[0]);
    } catch (error) {
      console.error('Error al crear el Centro:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  updateCentro: async (req: Request, res: Response) => {
    const { cnt_id } = req.params;
    const { cnt_codigo, cnt_descripcion, cnt_modificado, cnt_usr_id, cnt_estado} = req.body;

    try {
      const centrosQuery = await pool.query('SELECT * FROM rmx_sld_centros WHERE cnt_id = $1', [cnt_id]);
      const centros = centrosQuery.rows[0];

      if (!centros) {
        return res.status(404).json({ message: 'Centro no encontrada' });
      }

      const updateCentro = await pool.query(
        'UPDATE rmx_sld_centros SET cnt_codigo = $1, cnt_descripcion = $2, cnt_modificado = $3, cnt_usr_id = $4, WHERE cnt_id = $5 RETURNING *',
        [cnt_codigo, cnt_descripcion, cnt_modificado, cnt_usr_id,  cnt_id]
      );

      res.json(updateCentro.rows[0]);
    } catch (error) {
      console.error('Error al actualizar el Centro:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  deleteCentro: async (req: Request, res: Response) => {
    const { cnt_id } = req.params;
    const { cnt_usr_id, cnt_modificado, cnt_estado } = req.body;
  
    try {
      const result = await pool.query(
        'UPDATE rmx_sld_centros SET cnt_modificado = $1, cnt_estado = $2, cnt_usr_id = $3 WHERE cnt_id = $4 RETURNING *',
        [cnt_modificado, cnt_estado, cnt_usr_id, cnt_id]
      );
  
      if (result.rowCount === 0) {
         return res.status(404).json({ message: 'Centro no encontrado' });
      }
  
      res.json({ message: 'Centro eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el Centro:', error);
      res.status(500).json({ message: 'Error interno del servidor', error});
    }
  }
  
};

export default CentroController;
