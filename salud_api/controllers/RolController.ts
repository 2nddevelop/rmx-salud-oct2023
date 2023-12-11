// controllers/UserController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';
//import Membresia from '../models/Membresia';

const RolController = {
  getAllRoles: async (req: Request, res: Response) => {
    try {
      const rolesQuery = await pool.query(
        "SELECT * FROM base_roles WHERE rol_estado != 'X' ORDER BY 1 "
      ); 
      const roles = rolesQuery.rows;
      res.json(roles);
    } catch (error) {
      console.error('Error al obtener los Tipos de Roles:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  createRol: async (req: Request, res: Response) => {
    const { rol_codigo, rol_descripcion, rol_usr_id, rol_estado} = req.body;

    try {
      const newRoles = await pool.query('INSERT INTO base_roles' 
      + '(rol_codigo, rol_descripcion, rol_usr_id, rol_estado)'
      + 'VALUES ($1, $2, $3, $4) RETURNING *', [rol_codigo, rol_descripcion, rol_usr_id, rol_estado ]);

      res.json(newRoles.rows[0]);
    } catch (error) {
      console.error('Error al crear el Rol:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  updateRol: async (req: Request, res: Response) => {
    const { rol_id } = req.params;
    const { rol_codigo, rol_descripcion, rol_actualizado, rol_usr_id, rol_estado} = req.body;

    try {
      const rolesQuery = await pool.query('SELECT * FROM base_roles WHERE rol_id = $1', [rol_id]);
      const roles = rolesQuery.rows[0];

      if (!roles) {
        return res.status(404).json({ message: 'Rol no encontrada' });
      }

      const updateRol = await pool.query(
        'UPDATE base_roles SET rol_codigo = $1, rol_descripcion = $2, rol_actualizado = $3, rol_usr_id = $4, rol_estado = $5 WHERE rol_id = $6 RETURNING *',
        [rol_codigo, rol_descripcion, rol_actualizado, rol_usr_id, rol_estado, rol_id]
      );

      res.json(updateRol.rows[0]);
    } catch (error) {
      console.error('Error al actualizar el Rol:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  deleteRol: async (req: Request, res: Response) => {
    const { rol_id } = req.params;
    const { rol_usr_id, rol_actualizado, rol_estado } = req.body;
  
    try {
      const result = await pool.query(
        'UPDATE base_roles SET rol_actualizado = $1, rol_estado = $2, rol_usr_id = $3 WHERE rol_id = $4 RETURNING *',
        [rol_actualizado, rol_estado, rol_usr_id, rol_id]
      );
  
      if (result.rowCount === 0) {
         return res.status(404).json({ message: 'Rol no encontrado' });
      }
  
      res.json({ message: 'Rol eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el Rol:', error);
      res.status(500).json({ message: 'Error interno del servidor', error});
    }
  }
  
};

export default RolController;
