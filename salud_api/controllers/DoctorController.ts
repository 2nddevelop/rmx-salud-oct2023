// controllers/UserController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';
//import Membresia from '../models/Membresia';

const DoctorController = {
  getAllDoctores: async (req: Request, res: Response) => {
    try {
      const doctoresQuery = await pool.query(
        "SELECT d.*, c.cnt_codigo, c.cnt_descripcion, e.esp_codigo, e.esp_descripcion "
        + "FROM rmx_sld_doctores d "
        + "INNER JOIN rmx_sld_centros c ON c.cnt_id = d.doc_cnt_id "
        + "INNER JOIN rmx_sld_especialidades e ON e.esp_id = d.doc_esp_id "
        + "WHERE d.doc_estado != 'X' ORDER BY 1 "
      ); // quitar el plural dela ultima palabra
      const doctores = doctoresQuery.rows;
      res.json(doctores);
    } catch (error) {
      console.error('Error al obtener los Doctores:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  /*getAllDoctoresByFechaArea: async (req: Request, res: Response) => {
    console.log('List DoctoresByFechaArea: ', req.params);

    const { reg_fecha, doc_cnt_id } = req.params;

    try {
      const doctoresQuery = await pool.query(
        "SELECT d.*, c.cnt_codigo, c.cnt_descripcion, e.esp_codigo, e.esp_descripcion "
        + "FROM rmx_sld_doctores d "
        + "INNER JOIN rmx_sld_centros c ON c.cnt_id = d.doc_cnt_id "
        + "INNER JOIN rmx_sld_especialidades e ON e.esp_id = d.doc_esp_id "
        + "WHERE d.reg_fecha = $1 AND d.doc_cnt_id = $2 "
        + " -- AND d.doc_esp_id = $3 "
        + "  AND d.doc_estado != 'X' ORDER BY 1 ",
        [reg_fecha, doc_cnt_id]
      );
      const doctores = doctoresQuery.rows;
      res.json(doctores);
    } catch (error) {
      console.error('Error al obtener los Doctores:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },*/

  createDoctor: async (req: Request, res: Response) => {
    console.log('Create: ', req.body);

    const { doc_esp_id, doc_cnt_id,doc_data, 
      doc_modificado, doc_usr_id, doc_estado } = req.body;

    try {
      // Crear un nuevo Doctor en la base de datos
      const newDoctor = await pool.query('INSERT INTO rmx_sld_doctores'
        + '(doc_cnt_id, doc_esp_id, doc_data '
        + 'doc_usr_id, doc_estado) '
        + 'VALUES ($1, $2, $3, $4, $5, ) RETURNING *', 
        [ doc_cnt_id, doc_esp_id, doc_data, 
          doc_usr_id, doc_estado ]);

      res.json(newDoctor.rows[0]);
    } catch (error) {
      console.error('Error al crear el origen:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  updateDoctor: async (req: Request, res: Response) => {
    console.log('ID: ', req.params);
    console.log('Update: ', req.body);

    const { doc_id } = req.params;
    const { doc_esp_id, doc_cnt_id, doc_data, 
          doc_modificado, doc_usr_id, doc_estado } = req.body;

    try {
      // Verificar si el Doctores existe en la base de datos
      const doctoresQuery = await pool.query('SELECT * FROM rmx_sld_doctores WHERE doc_id = $1', [doc_id]);
      const doctores = doctoresQuery.rows[0];

      if (!doctores) {
        return res.status(404).json({ message: 'Doctor no encontrado' });
      }

      // Actualizar el Doctores en la base de datos
      const updateDoctor = await pool.query(
        'UPDATE rmx_sld_doctores SET doc_cnt_id = $1, doc_esp_id = $2, doc_data = $3, doc_modificado = $4, doc_usr_id = $5 WHERE doc_id = $6 RETURNING *',
        [doc_cnt_id, doc_esp_id, doc_data, doc_modificado, doc_usr_id, doc_id]
      );

      res.json(updateDoctor.rows[0]);
    } catch (error) {
      console.error('Error al actualizar el Doctor:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  deleteDoctor: async (req: Request, res: Response) => {
    console.log('ID: ', req.params);
    console.log('Delete: ', req.body);

    const { doc_id } = req.params;
    const { doc_usr_id, doc_modificado, doc_estado} = req.body;
    try {
      // Verificar si el Doctores existe en la base de datos
      const doctoresQuery = await pool.query('SELECT * FROM rmx_sld_doctores WHERE doc_id = $1', [doc_id]);
      const doctores = doctoresQuery.rows[0];

      if (!doctores) {
        return res.status(404).json({ message: 'Doctor no encontrado' });
      }

      // Eliminar el Doctores de la base de datos
      await pool.query('UPDATE rmx_sld_doctores SET doc_modificado = $1, doc_estado = $2, doc_usr_id = $3 WHERE doc_id = $4 RETURNING *', 
            [doc_modificado, doc_estado, doc_usr_id, doc_id]);

      res.json({ message: 'Doctor eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el Doctor:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

};

export default DoctorController;
