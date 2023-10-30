// controllers/UserController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';
//import Membresia from '../models/Membresia';

const PlanificacionController = {
  getAllPlanificaciones: async (req: Request, res: Response) => {
    try {
      const planificacionesQuery = await pool.query(
        "SELECT p.*, c.cnt_codigo, c.cnt_descripcion, e.esp_codigo, e.esp_descripcion "
        + "FROM rmx_sld_planificacion p "
        + "INNER JOIN rmx_sld_centros c ON c.cnt_id = p.pln_cnt_id "
        + "INNER JOIN rmx_sld_especialidades e ON e.esp_id = p.pln_esp_id "
        + "WHERE p.pln_estado != 'X' ORDER BY 1 "
      ); // quitar el plural dela ultima palabra
      const planificaciones = planificacionesQuery.rows;
      res.json(planificaciones);
    } catch (error) {
      console.error('Error al obtener los Planificaciones:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  /*getAllPlanificacionesByFechaArea: async (req: Request, res: Response) => {
    console.log('List PlanificacionesByFechaArea: ', req.params);

    const { reg_fecha, pln_cnt_id } = req.params;

    try {
      const planificacionesQuery = await pool.query(
        "SELECT p.*, c.cnt_codigo, c.cnt_descripcion, e.esp_codigo, e.esp_descripcion "
        + "FROM rmx_sld_planificacion p "
        + "INNER JOIN rmx_sld_centros c ON c.cnt_id = p.pln_cnt_id "
        + "INNER JOIN rmx_sld_especialidades e ON e.esp_id = p.pln_esp_id "
        + "WHERE p.reg_fecha = $1 AND p.pln_cnt_id = $2 "
        + " -- AND p.pln_esp_id = $3 "
        + "  AND p.pln_estado != 'X' ORDER BY 1 ",
        [reg_fecha, pln_cnt_id]
      );
      const planificaciones = planificacionesQuery.rows;
      res.json(planificaciones);
    } catch (error) {
      console.error('Error al obtener los Planificaciones:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },*/

  createPlanificacion: async (req: Request, res: Response) => {
    console.log('Create: ', req.body);

    const { pln_esp_id, pln_cnt_id,pln_data, 
      pln_modificado, pln_usr_id, pln_estado } = req.body;

    try {
      // Crear un nuevo Planificacion en la base de datos
      const newPlanificacion = await pool.query('INSERT INTO rmx_sld_planificacion'
        + '(pln_cnt_id, pln_esp_id, pln_data '
        + 'pln_usr_id, pln_estado) '
        + 'VALUES ($1, $2, $3, $4, $5, ) RETURNING *', 
        [ pln_cnt_id, pln_esp_id, pln_data, 
          pln_usr_id, pln_estado ]);

      res.json(newPlanificacion.rows[0]);
    } catch (error) {
      console.error('Error al crear el origen:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  updatePlanificacion: async (req: Request, res: Response) => {
    console.log('ID: ', req.params);
    console.log('Update: ', req.body);

    const { pln_id } = req.params;
    const { pln_esp_id, pln_cnt_id, pln_data, 
          pln_modificado, pln_usr_id, pln_estado } = req.body;

    try {
      // Verificar si el Planificaciones existe en la base de datos
      const planificacionesQuery = await pool.query('SELECT * FROM rmx_sld_planificacion WHERE pln_id = $1', [pln_id]);
      const planificaciones = planificacionesQuery.rows[0];

      if (!planificaciones) {
        return res.status(404).json({ message: 'Planificacion no encontrado' });
      }

      // Actualizar el Planificaciones en la base de datos
      const updatePlanificacion = await pool.query(
        'UPDATE rmx_sld_planificacion SET pln_cnt_id = $1, pln_esp_id = $2, pln_data = $3, pln_modificado = $4, pln_usr_id = $5 WHERE pln_id = $6 RETURNING *',
        [pln_cnt_id, pln_esp_id, pln_data, pln_modificado, pln_usr_id, pln_id]
      );

      res.json(updatePlanificacion.rows[0]);
    } catch (error) {
      console.error('Error al actualizar el Planificacion:', error);
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
      console.error('Error al eliminar el Planificacion:', error);
      res.status(500).json({ message: 'Error interno del servidor', error});
    }
  }
};

export default PlanificacionController;
