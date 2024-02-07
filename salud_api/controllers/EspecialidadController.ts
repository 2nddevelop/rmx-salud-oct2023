// controllers/UserController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';
//import Membresia from '../models/Membresia';

const EspecialidadController = {
  getAllEspecialidades: async (req: Request, res: Response) => {
    try {
      const especialidadesQuery = await pool.query(
        "SELECT * FROM rmx_sld_especialidades WHERE esp_estado != 'X' ORDER BY 1 "
      ); 
      const especialidades = especialidadesQuery.rows;
      res.json(especialidades);
    } catch (error) {
      console.error('Error al obtener los Tipos de Especialidades:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  createEspecialidad: async (req: Request, res: Response) => {
    const { esp_codigo, esp_descripcion, esp_codigo_cuaderno, esp_usr_id, esp_estado} = req.body;

    try {
      const newEspecialidades = await pool.query('INSERT INTO rmx_sld_especialidades' 
      + '(esp_codigo, esp_descripcion, esp_codigo_cuaderno, esp_usr_id, esp_estado)'
      + 'VALUES ($1, $2, $3, $4, $5) RETURNING *', [esp_codigo, esp_descripcion, esp_codigo_cuaderno, esp_usr_id, esp_estado ]);

      res.json(newEspecialidades.rows[0]);
    } catch (error) {
      console.error('Error al crear la Especialidad:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  updateEspecialidad: async (req: Request, res: Response) => {
    const { esp_id } = req.params;
    const { esp_codigo, esp_descripcion, esp_codigo_cuaderno, esp_modificado, esp_usr_id, esp_estado} = req.body;

    try {
      // Verificar si las Especialidades existe en la base de datos
      const especialidadesQuery = await pool.query('SELECT * FROM rmx_sld_especialidades WHERE esp_id = $1', [esp_id]);
      const especialidades = especialidadesQuery.rows[0];

      if (!especialidades) {
        return res.status(404).json({ message: 'Especialidad no encontrada' });
      }

      // Actualizar las Especialidades en la base de datos
      const updateEspecialidad = await pool.query(
        'UPDATE rmx_sld_especialidades SET esp_codigo = $1, esp_descripcion = $2, esp_codigo_cuaderno = $3, esp_modificado = $4, esp_usr_id = $5 WHERE esp_id = $6 RETURNING *',
        [esp_codigo, esp_descripcion, esp_codigo_cuaderno, esp_modificado, esp_usr_id, esp_id]
      );

      res.json(updateEspecialidad.rows[0]);
    } catch (error) {
      console.error('Error al actualizar la Especialidad:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  deleteEspecialidad: async (req: Request, res: Response) => {
    const { esp_id } = req.params;
    const { esp_usr_id, esp_modificado, esp_estado} = req.body;

    try {
      const result = await pool.query(
        'UPDATE rmx_sld_especialidades SET esp_modificado = $1, esp_estado = $2, esp_usr_id = $3 WHERE esp_id = $4 RETURNING *', 
        [esp_modificado, esp_estado, esp_usr_id, esp_id]
      );
  
      if (result.rowCount === 0) {
         return res.status(404).json({ message: 'Especialidad no encontrado' });
      }
  
      res.json({ message: 'Especialidad eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el Especialidad:', error);
      res.status(500).json({ message: 'Error interno del servidor', error});
    }
  }
};
export default EspecialidadController;
