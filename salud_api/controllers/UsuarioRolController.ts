// controllers/UserController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';
//import Membresia from '../models/Membresia';

const UsuarioRolController = {
  getAllUsuariosRol: async (req: Request, res: Response) => {
    //const { fecha, cnt_id } = req.params;

    try {
      const usuariosRolQuery = await pool.query(
        `SELECT ur.*, r.*, u.*
        FROM base_usuarios_roles ur
        INNER JOIN base_usuarios u ON u.usr_id = ur.urol_usuario_id
        INNER JOIN base_roles r ON r.rol_id = ur.urol_rol_id
        WHERE ur.urol_estado != 'X' `
      );
      const usuariosRol = usuariosRolQuery.rows;
      res.json(usuariosRol);
    } catch (error) {
      console.error('Error al obtener los UsuariosRol:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  createUsuarioRol: async (req: Request, res: Response) => {
    const { urol_usuario_id, urol_rol_id, urol_usr_id, urol_estado} = req.body;

    try {
      const newUsuariosRol = await pool.query('INSERT INTO base_usuarios_roles' 
      + '(urol_usuario_id, urol_rol_id, urol_usr_id, urol_estado)'
      + 'VALUES ($1, $2, $3, $4) RETURNING *', [urol_usuario_id, urol_rol_id, urol_usr_id, urol_estado ]);

      res.json(newUsuariosRol.rows[0]);
    } catch (error) {
      console.error('Error al crear el Rol:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  updateUsuarioRol: async (req: Request, res: Response) => {
    const { urol_id } = req.params;
    const { urol_usuario_id, urol_rol_id, urol_actualizado, urol_usr_id, urol_estado} = req.body;

    try {
      const usuariosRolQuery = await pool.query('SELECT * FROM base_usuarios_roles WHERE urol_id = $1', [urol_id]);
      const usuariosRol = usuariosRolQuery.rows[0];

      if (!usuariosRol) {
        return res.status(404).json({ message: 'Rol no encontrada' });
      }

      const updateUsuarioRol = await pool.query(
        'UPDATE base_usuarios_roles SET urol_usuario_id = $1, urol_rol_id = $2, urol_actualizado = $3, urol_usr_id = $4, urol_estado = $5 WHERE urol_id = $6 RETURNING *',
        [urol_usuario_id, urol_rol_id, urol_actualizado, urol_usr_id, urol_estado, urol_id]
      );

      res.json(updateUsuarioRol.rows[0]);
    } catch (error) {
      console.error('Error al actualizar el Rol:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  deleteUsuarioRol: async (req: Request, res: Response) => {
    const { urol_id } = req.params;
    const { urol_usr_id, urol_actualizado, urol_estado } = req.body;
  
    try {
      const result = await pool.query(
        'UPDATE base_usuarios_roles SET urol_actualizado = $1, urol_estado = $2, urol_usr_id = $3 WHERE urol_id = $4 RETURNING *',
        [urol_actualizado, urol_estado, urol_usr_id, urol_id]
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

export default UsuarioRolController;
