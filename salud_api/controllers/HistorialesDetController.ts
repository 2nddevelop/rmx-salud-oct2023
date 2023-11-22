// controllers/UserController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';
//import Membresia from '../models/Membresia';

const HistorialesDetController = {
  getAllHistorialesDetXHcId: async (req: Request, res: Response) => {
    const { hc_id } = req.params; 

    try {
      const historialesDetQuery = await pool.query(
        `SELECT h.*, c.cli_data
        FROM rmx_sld_historiales_det h
        INNER JOIN rmx_gral_clientes c ON c.cli_id = h.hc_cli_id
        WHERE h.hc_estado != 'X' ORDER BY 1`
      );
      const historiales = historialesDetQuery.rows;
      res.json(historiales);
    } catch (error) {
      console.error('Error al obtener los Historiales Detalle:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  createHistorialDet: async (req: Request, res: Response) => {
    const { hcd_hc_id, hcd_fecha, hcd_data_sv, hcd_data_consulta, hcd_data_recetario, hcd_modificado, hcd_usr_id, hcd_estado, hcd_id  } = req.body;

    try {
      const newHistorialesDet = await pool.query(
        'INSERT INTO rmx_sld_historiales_det (hcd_hc_id, hcd_fecha, hcd_data_sv, hcd_data_consulta, hcd_data_recetario, hcd_usr_id, hc_estado) VALUES ($1, $2, $3, $4) RETURNING *',
        [hcd_hc_id, hcd_fecha, hcd_data_sv, hcd_data_consulta, hcd_data_recetario, hcd_modificado, hcd_usr_id, hcd_estado, hcd_id ]
      );

      res.json(newHistorialesDet.rows[0]);
    } catch (error) {
      console.error('Error al crear el Historial Detalle:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  updateHistorialDet: async (req: Request, res: Response) => {
    const { hcd_id } = req.params;
    const { hcd_hc_id, hcd_fecha, hcd_data_sv, hcd_data_consulta, hcd_data_recetario, hcd_modificado, hcd_usr_id, hcd_estado } = req.body;

    try {
      const historialesDetQuery = await pool.query('SELECT * FROM rmx_sld_historiales_det WHERE hcd_id = $1', [hcd_id]);
      const historialesDet = historialesDetQuery.rows[0];

      if (!historialesDet) {
        return res.status(404).json({ message: 'Historial Detalle no encontrado' });
      }

      // Actualizar el Historiales en la base de datos
      const updateHistorialesDet = await pool.query(
        `UPDATE rmx_sld_historiales_det SET hcd_hc_id = $1, hcd_fecha = $2, hcd_data_sv = $3, hcd_data_consulta = $4, 
          hcd_data_recetario = $5, hcd_modificado = $6, hcd_usr_id = $7, hcd_estado = $8 
        WHERE hc_id = $9 RETURNING *`, [hcd_hc_id, hcd_fecha, hcd_data_sv, hcd_data_consulta, hcd_data_recetario, hcd_modificado, hcd_usr_id, hcd_estado, hcd_id ]
      );

      res.json(updateHistorialesDet.rows[0]);
    } catch (error) {
      console.error('Error al actualizar el Historial Detalle:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  deleteHistorialDet: async (req: Request, res: Response) => {
    const { hcd_id } = req.params;
    const { hcd_usr_id, hcd_modificado, hcd_estado} = req.body;
    try {
      const result = await pool.query(
        'UPDATE rmx_sld_historiales_det SET hc_modificado = $1, hc_estado = $2, hc_usr_id = $3 WHERE hc_id = $4 RETURNING *', 
        [hcd_modificado, hcd_estado, hcd_usr_id, hcd_id]
      );
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Historial Detalle no encontrado' });
      }
      res.json({ message: 'Historial Detalle eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el Historial Detalle:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

};

export default HistorialesDetController;
