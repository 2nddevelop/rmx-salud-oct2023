// controllers/UserController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';
//import Membresia from '../models/Membresia';

const HistorialController = {
  getAllHistoriales: async (req: Request, res: Response) => {
    // xxx const { fecha, cnt_id } = req.params;

    try {
      const historialesQuery = await pool.query(
        `SELECT h.*, c.*
        FROM rmx_sld_historiales h
        right outer JOIN rmx_gral_clientes c ON c.cli_id = h.hc_cli_id
        WHERE c.cli_estado != 'X' 
        ORDER BY c.cli_data->>'cli_paterno', c.cli_data->>'cli_materno', c.cli_data->>'cli_nombres' 
        LIMIT 50 `
      );
      const historiales = historialesQuery.rows;
      res.json(historiales);
    } catch (error) {
      console.error('Error al obtener los Historiales:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  getAllHistorialesXCIPatMatNombres: async (req: Request, res: Response) => {
    // xxx const { fecha, cnt_id } = req.params;
    const { cli_nit, cli_paterno, cli_materno, cli_nombres } = req.body;

    const nit = cli_nit !== "" ? " AND UPPER(c.cli_data->>'cli_nit') like '" + cli_nit.toUpperCase() + "%' " : " ";
    const pat = cli_paterno !== "" ? " AND UPPER(c.cli_data->>'cli_paterno') like '" + cli_paterno.toUpperCase() + "%' " : " ";
    const mat = cli_materno !== "" ? " AND UPPER(c.cli_data->>'cli_materno') like '" + cli_materno.toUpperCase() + "%' " : " ";
    const noms = cli_nombres !== "" ? " AND UPPER(c.cli_data->>'cli_nombres') like '" + cli_nombres.toUpperCase() + "%' " : " ";

    try {
      const sql = `SELECT h.*, c.*
      FROM rmx_sld_historiales h
      right outer JOIN rmx_gral_clientes c ON c.cli_id = h.hc_cli_id
      WHERE c.cli_estado != 'X' ${nit} ${pat} ${mat} ${noms} 
      ORDER BY c.cli_data->>'cli_paterno', c.cli_data->>'cli_materno', c.cli_data->>'cli_nombres' `;
      const historialesQuery = await pool.query( 
        sql
      );
      const historiales = historialesQuery.rows;
      res.json(historiales);
    } catch (error) {
      console.error('Error al obtener los Historiales:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  createHistorial: async (req: Request, res: Response) => {
    const { hc_cli_id, hc_codigo, hc_usr_id, hc_estado } = req.body;

    try {
      const newHistorial = await pool.query(
        'INSERT INTO rmx_sld_historiales (hc_cli_id, hc_codigo, hc_usr_id, hc_estado) VALUES ($1, $2, $3, $4) RETURNING *',
        [hc_cli_id, hc_codigo, hc_usr_id, hc_estado]
      );

      res.json(newHistorial.rows[0]);
    } catch (error) {
      console.error('Error al crear el Historial:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  updateHistorial: async (req: Request, res: Response) => {
    const { hc_id } = req.params;
    const { hc_cli_id, hc_codigo, hc_modificado, hc_usr_id, hc_estado } = req.body;

    try {
      const historialesQuery = await pool.query('SELECT * FROM rmx_sld_historiales WHERE hc_id = $1', [hc_id]);
      const historiales = historialesQuery.rows[0];

      if (!historiales) {
        return res.status(404).json({ message: 'Historial no encontrado' });
      }

      // Actualizar el Historiales en la base de datos
      const updateHistorial = await pool.query(
        `UPDATE rmx_sld_historiales SET hc_cli_id = $1, hc_codigo = $2, hc_modificado = $3, hc_usr_id = $4, hc_estado = $5 
        WHERE hc_id = $6 RETURNING *`, [hc_cli_id, hc_codigo, hc_modificado, hc_usr_id, hc_estado, hc_id, ]
      );

      res.json(updateHistorial.rows[0]);
    } catch (error) {
      console.error('Error al actualizar el Historial:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  deleteHistorial: async (req: Request, res: Response) => {
    const { hc_id } = req.params;
    const { hc_usr_id, hc_modificado, hc_estado} = req.body;
    try {
      const result = await pool.query(
        'UPDATE rmx_sld_historiales SET hc_modificado = $1, hc_estado = $2, hc_usr_id = $3 WHERE hc_id = $4 RETURNING *', 
        [hc_modificado, hc_estado, hc_usr_id, hc_id]
      );
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Historial no encontrado' });
      }
      res.json({ message: 'Historial eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el Historial:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

};

export default HistorialController;
