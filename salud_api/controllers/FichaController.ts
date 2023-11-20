// controllers/UserController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';
//import Membresia from '../models/Membresia';

const FichaController = {
  getAllFichas: async (req: Request, res: Response) => {
    try {
      const fichasQuery = await pool.query(
        `SELECT f.*, c.cli_data, p.pln_data
        FROM rmx_sld_fichas f
        INNER JOIN rmx_gral_clientes c ON c.cli_id = f.fch_cli_id
        INNER JOIN rmx_sld_planificacion p ON p.pln_id = f.fch_pln_id
        WHERE f.fch_estado != 'X' ORDER BY 1`
      );
      const fichas = fichasQuery.rows;
      res.json(fichas);
    } catch (error) {
      console.error('Error al obtener los Fichas:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  createFicha: async (req: Request, res: Response) => {
    const { fch_cli_id, fch_pln_id, fch_nro_ficha, fch_kdx_medico, fch_usr_id, fch_estado } = req.body;
    try {
      const newFicha = await pool.query(
        'INSERT INTO rmx_sld_fichas (fch_cli_id, fch_pln_id, fch_nro_ficha, fch_kdx_medico, fch_usr_id, fch_estado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [fch_cli_id, fch_pln_id, fch_nro_ficha, fch_kdx_medico, fch_usr_id, fch_estado]
      );

      res.json(newFicha.rows[0]);
    } catch (error) {
      console.error('Error al crear el Ficha:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  updateFicha: async (req: Request, res: Response) => {
    const { fch_id } = req.params;
    const { fch_cli_id, fch_pln_id, fch_nro_ficha, fch_kdx_medico,
          fch_modificado, fch_usr_id, fch_estado } = req.body;

    try {
      const fichasQuery = await pool.query('SELECT * FROM rmx_sld_fichas WHERE fch_id = $1', [fch_id]);
      const fichas = fichasQuery.rows[0];

      if (!fichas) {
        return res.status(404).json({ message: 'Ficha no encontrado' });
      }

      // Actualizar el Fichas en la base de datos
      const updateFicha = await pool.query(
        'UPDATE rmx_sld_fichas SET fch_pln_id = $1, fch_cli_id = $2, fch_nro_ficha = $3, fch_kdx_medico = $4, fch_modificado = $5, fch_usr_id = $6 WHERE fch_id = $7 RETURNING *',
        [fch_pln_id, fch_cli_id, fch_nro_ficha, fch_kdx_medico, fch_modificado, fch_usr_id, fch_id]
      );

      res.json(updateFicha.rows[0]);
    } catch (error) {
      console.error('Error al actualizar el Ficha:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  deleteFicha: async (req: Request, res: Response) => {
    const { fch_id } = req.params;
    const { fch_usr_id, fch_modificado, fch_estado} = req.body;
    try {
      const result = await pool.query(
        'UPDATE rmx_sld_fichas SET fch_modificado = $1, fch_estado = $2, fch_usr_id = $3 WHERE fch_id = $4 RETURNING *', 
        [fch_modificado, fch_estado, fch_usr_id, fch_id]
      );
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Ficha no encontrado' });
      }
      res.json({ message: 'Ficha eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el Ficha:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

};

export default FichaController;
