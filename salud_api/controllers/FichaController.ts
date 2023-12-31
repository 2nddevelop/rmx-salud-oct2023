// controllers/UserController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';
//import Membresia from '../models/Membresia';

const FichaController = {
  getAllFichas: async (req: Request, res: Response) => {
    const { fecha, cnt_id } = req.params;

    try {
      const fichasQuery = await pool.query(
        `SELECT f.*, c.cli_data, p.pln_id, p.pln_data, ce.*, d.*, e.*, co.*
        FROM rmx_sld_fichas f
        INNER JOIN rmx_gral_clientes c ON c.cli_id = f.fch_cli_id
        INNER JOIN rmx_sld_planificacion p ON p.pln_id = f.fch_pln_id
        INNER JOIN rmx_sld_centros ce ON ce.cnt_id = p.pln_cnt_id
        INNER JOIN rmx_sld_doctores d ON d.doc_id = p.pln_doc_id
        INNER JOIN rmx_sld_especialidades e ON e.esp_id = p.pln_esp_id
        INNER JOIN rmx_sld_consultorios co ON co.con_id = p.pln_con_id
        WHERE p.pln_data->>'pln_fecha' = $1
          AND p.pln_cnt_id = $2
          AND f.fch_estado != 'X' 
        ORDER BY ce.cnt_descripcion, e.esp_codigo, co.con_codigo, f.fch_hora `, [fecha, cnt_id]
      );
      const fichas = fichasQuery.rows;
      res.json(fichas);
    } catch (error) {
      console.error('Error al obtener los Fichas:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  getAllFichasHistoriales: async (req: Request, res: Response) => {
    const { fecha, cnt_id } = req.params;

    try {
      const fichasQuery = await pool.query(
        `SELECT f.*, c.cli_data, p.pln_data, ce.*, d.*, e.*, co.*, h.*, hcd.*
        FROM rmx_sld_fichas f
        INNER JOIN rmx_gral_clientes c ON c.cli_id = f.fch_cli_id
        INNER JOIN rmx_sld_planificacion p ON p.pln_id = f.fch_pln_id
        INNER JOIN rmx_sld_centros ce ON ce.cnt_id = p.pln_cnt_id
        INNER JOIN rmx_sld_doctores d ON d.doc_id = p.pln_doc_id
        INNER JOIN rmx_sld_especialidades e ON e.esp_id = p.pln_esp_id
        INNER JOIN rmx_sld_consultorios co ON co.con_id = p.pln_con_id
        left outer join rmx_sld_historiales h ON h.hc_codigo = f.fch_kdx_medico
        left outer join rmx_sld_historiales_det hcd ON hcd.hcd_hc_id = h.hc_id
        WHERE p.pln_data->>'pln_fecha' = $1
          AND p.pln_cnt_id = $2
          AND f.fch_estado != 'X' 
        ORDER BY ce.cnt_descripcion, e.esp_codigo, co.con_codigo `, [fecha, cnt_id]
      );
      const fichas = fichasQuery.rows;
      res.json(fichas);
    } catch (error) {
      console.error('Error al obtener los Fichas:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  getFicha: async (req: Request, res: Response) => {
    const { fch_id } = req.params;

    try {
      const fichasQuery = await pool.query(
        `SELECT f.*, c.cli_data, p.pln_data, ce.*, d.*, e.*, co.*
        FROM rmx_sld_fichas f
        INNER JOIN rmx_gral_clientes c ON c.cli_id = f.fch_cli_id
        INNER JOIN rmx_sld_planificacion p ON p.pln_id = f.fch_pln_id
        INNER JOIN rmx_sld_centros ce ON ce.cnt_id = p.pln_cnt_id
        INNER JOIN rmx_sld_doctores d ON d.doc_id = p.pln_doc_id
        INNER JOIN rmx_sld_especialidades e ON e.esp_id = p.pln_esp_id
        INNER JOIN rmx_sld_consultorios co ON co.con_id = p.pln_con_id
        WHERE f.fch_id = $1 ORDER BY 1`, [fch_id]
      );
      const fichas = fichasQuery.rows;
      res.json(fichas);
    } catch (error) {
      console.error('Error al obtener los Fichas:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  createFicha: async (req: Request, res: Response) => {
    const { fch_cli_id, fch_pln_id, fch_nro_ficha, fch_kdx_medico, fch_usr_id, fch_estado, filtro_fecha, 
      filtro_centro_id, fch_hora, pln_data_disponibles } = req.body;

      try {
      const nextFicha = await pool.query(
        `SELECT e.esp_codigo, COUNT(f.*) AS next_ficha 
          FROM rmx_sld_fichas f
          INNER JOIN rmx_sld_planificacion p ON p.pln_id = f.fch_pln_id
          INNER JOIN rmx_sld_especialidades e ON e.esp_id = p.pln_esp_id
          WHERE p.pln_data->>'pln_fecha' = $1
          AND p.pln_cnt_id = $2
          AND p.pln_id = $3
          AND f.fch_estado != 'X'
          GROUP BY e.esp_codigo 
          ORDER BY e.esp_codigo 
        `, [filtro_fecha, filtro_centro_id, fch_pln_id]
      );

      let numero_ficha = 0;
      let codigo_ficha = 'FFF';
      if (Object.keys(nextFicha.rows).length > 0) {
        codigo_ficha = nextFicha.rows[0].esp_codigo;
        numero_ficha = parseInt(nextFicha.rows[0].next_ficha) + 1;
      } else {
        numero_ficha = 1;
      }
      codigo_ficha = `${codigo_ficha}-${numero_ficha}`;
      const newFicha = await pool.query(
        `INSERT INTO rmx_sld_fichas (fch_cli_id, fch_pln_id, fch_nro_ficha, 
          fch_kdx_medico, fch_usr_id, fch_estado, fch_hora) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING * `,
        [fch_cli_id, fch_pln_id, codigo_ficha, //fch_nro_ficha, 
          fch_kdx_medico, fch_usr_id, fch_estado, fch_hora]
      );

      const upd = await pool.query(
        `UPDATE rmx_sld_planificacion SET pln_data_disponibles = $1 
          WHERE pln_id = $2 RETURNING * `,
        [JSON.stringify(pln_data_disponibles), fch_pln_id]
      );

      res.json(newFicha.rows[0]);
    } catch (error) {
      console.error('Error al crear la Ficha:', error);
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
        `UPDATE rmx_sld_fichas SET fch_pln_id = $1, fch_cli_id = $2, fch_nro_ficha = $3, 
          fch_kdx_medico = $4, fch_modificado = $5, fch_usr_id = $6, fch_estado = $7 
        WHERE fch_id = $8 RETURNING *`, [fch_pln_id, fch_cli_id, fch_nro_ficha, fch_kdx_medico, fch_modificado, fch_usr_id, fch_estado, fch_id, ]
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
