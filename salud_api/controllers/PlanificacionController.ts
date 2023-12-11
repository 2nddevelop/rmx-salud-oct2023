// controllers/UserController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';
//import Membresia from '../models/Membresia';

const PlanificacionController = {
  getAllPlanificaciones: async (req: Request, res: Response) => {
    const { fecha } = req.params;

    try {
      const planificacionesQuery = await pool.query(
        `SELECT p.*, c.cnt_codigo, c.cnt_descripcion, d.doc_data, 
            c.cnt_codigo, c.cnt_descripcion, e.esp_codigo, e.esp_descripcion, cn.con_codigo, cn.con_descripcion
          FROM rmx_sld_planificacion p
          INNER JOIN rmx_sld_centros c ON c.cnt_id = p.pln_cnt_id
          INNER JOIN rmx_sld_especialidades e ON e.esp_id = p.pln_esp_id
          INNER JOIN rmx_sld_consultorios cn ON cn.con_id = p.pln_con_id
          INNER JOIN rmx_sld_doctores d ON d.doc_id = p.pln_doc_id
          WHERE p.pln_data->>'pln_fecha' = $1
            AND p.pln_estado != 'X' 
          ORDER BY p.pln_cnt_id, p.pln_esp_id, p.pln_con_id `, [fecha]
      );
      const planificaciones = planificacionesQuery.rows;
      res.json(planificaciones);
    } catch (error) {
      console.error('Error al obtener las Planificaciones:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  getAllPlanificacionesXFechaCntId: async (req: Request, res: Response) => {
    const { fecha, cnt_id } = req.params;

    try {
      const planificacionesQuery = await pool.query(
        `SELECT p.*, c.cnt_codigo, c.cnt_descripcion, d.doc_data, 
            cnt_codigo, c.cnt_descripcion, e.esp_codigo, e.esp_descripcion, cn.con_codigo, cn.con_descripcion
          FROM rmx_sld_planificacion p
          INNER JOIN rmx_sld_centros c ON c.cnt_id = p.pln_cnt_id
          INNER JOIN rmx_sld_especialidades e ON e.esp_id = p.pln_esp_id
          INNER JOIN rmx_sld_consultorios cn ON cn.con_id = p.pln_con_id
          INNER JOIN rmx_sld_doctores d ON d.doc_id = p.pln_doc_id
          WHERE p.pln_data->>'pln_fecha' = $1
            AND c.cnt_id = $2
            AND p.pln_estado != 'X' ORDER BY 1`, [fecha, cnt_id]
      );
      const planificaciones = planificacionesQuery.rows;
      res.json(planificaciones);
    } catch (error) {
      console.error('Error al obtener las Planificaciones:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  createPlanificacion: async (req: Request, res: Response) => {
    const { pln_esp_id, pln_cnt_id, pln_doc_id, pln_con_id, pln_data, pln_data_disponibles, pln_usr_id, pln_estado } = req.body;
    try {
      const newPlanificacion = await pool.query(
        `INSERT INTO rmx_sld_planificacion (pln_cnt_id, pln_esp_id, pln_doc_id, pln_con_id, pln_data, pln_data_disponibles, pln_usr_id, pln_estado) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING * `,
        [pln_cnt_id, pln_esp_id, pln_doc_id, pln_con_id, pln_data, JSON.stringify(pln_data_disponibles), pln_usr_id, pln_estado]
      );

      res.json(newPlanificacion.rows[0]);
    } catch (error) {
      console.error('Error al crear la Planificación:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  updatePlanificacion: async (req: Request, res: Response) => {
    const { pln_id } = req.params;
    const { pln_esp_id, pln_cnt_id, pln_doc_id, pln_con_id, pln_data, pln_data_disponibles,
          pln_modificado, pln_usr_id, pln_estado } = req.body;
    console.log(pln_id);
    console.log('---');
    console.log( pln_esp_id, pln_cnt_id, pln_doc_id, pln_con_id, pln_data, pln_data_disponibles,
            pln_modificado, pln_usr_id, pln_estado );
  
    try {
      // Verificar si el Planificaciones existe en la base de datos
      const planificacionesQuery = await pool.query('SELECT * FROM rmx_sld_planificacion WHERE pln_id = $1', [pln_id]);
      const planificaciones = planificacionesQuery.rows[0];

      if (!planificaciones) {
        return res.status(404).json({ message: 'Planificacion no encontrado' });
      }

      // Actualizar el Planificaciones en la base de datos
      const updatePlanificacion = await pool.query(
        `UPDATE rmx_sld_planificacion SET pln_cnt_id = $1, pln_esp_id = $2, pln_con_id = $3, pln_doc_id = $4, 
          pln_data = $5, pln_data_disponibles = $6, pln_modificado = $7, pln_usr_id = $8, pln_estado = $9 WHERE pln_id = $10 RETURNING * `,
        [pln_cnt_id, pln_esp_id, pln_con_id, pln_doc_id, 
          pln_data,  JSON.stringify(pln_data_disponibles), pln_modificado, pln_usr_id, pln_estado, pln_id]
      );

      res.json(updatePlanificacion.rows[0]);
    } catch (error) {
      console.error('Error al actualizar la Planificacion:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  deletePlanificacion: async (req: Request, res: Response) => {
    const { pln_id } = req.params;
    const { pln_usr_id, pln_modificado, pln_estado} = req.body;
    try {
      const result = await pool.query(
        'UPDATE rmx_sld_planificacion SET pln_modificado = $1, pln_estado = $2, pln_usr_id = $3 WHERE pln_id = $4 RETURNING *', 
        [pln_modificado, pln_estado, pln_usr_id, pln_id]
      );
  
      if (result.rowCount === 0) {
         return res.status(404).json({ message: 'Planificacion no encontrado' });
      }
  
      res.json({ message: 'Planificacion eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar la Planificacion:', error);
      res.status(500).json({ message: 'Error interno del servidor', error});
    }
  }
};

export default PlanificacionController;
