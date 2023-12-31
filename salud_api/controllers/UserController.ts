// controllers/UserController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';
//import User from '../models/User';

const UserController = {
  login: async (req: Request, res: Response) => {
    const { username, password } = req.body; // Cambiado de username a usr_email
    try {
      // Verificar si el usuario existe en la base de datos
      const userQuery = await pool.query(`
      SELECT u.*, r.*, c.*
      FROM base_usuarios u
        INNER JOIN base_usuarios_roles ur ON ur.urol_usuario_id = u.usr_id
        INNER JOIN base_roles r ON r.rol_id = ur.urol_rol_id
        INNER JOIN rmx_sld_centros c ON c.cnt_id = u.usr_cnt_id
      WHERE u.usr_email = $1
        AND u.usr_estado <> 'X' `, [username]);
      const user = userQuery.rows[0];
  
      if (!user) {
        return res.status(401).json({ message: 'No existe el usuario' });
      }

      // Comparar la contraseña proporcionada con la contraseña almacenada
      const isPasswordMatch = await bcrypt.compare(password, user.usr_clave);
      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
  
      // Generar un token JWT
      const token = jwt.sign({ userId: user.usr_id }, 'secreto', { expiresIn: '6h' });
      const rol_id = user.rol_id;
      const rol_descripcion = user.rol_descripcion;
      const cnt_id = user.cnt_id;
      const cnt_descripcion = user.cnt_descripcion;
      const usr_id = user.usr_id;
      const usr_nombres = user.usr_nombres + ' ' + user.usr_primer_apellido + ' ' + user.usr_segundo_apellido;
      res.json({ token, rol_id, rol_descripcion, cnt_id, cnt_descripcion, usr_id, usr_nombres });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },
  
  getUserXId: async (req: Request, res: Response) => {
    const {usr_id} = req.params;
    try {
      const usersQuery = await pool.query(
        
        `SELECT u.* 
        FROM base_usuarios u
        WHERE u.usr_id = $1 
          AND u.usr_estado != 'X' ORDER BY 1 `, [usr_id]
      );
      const users = usersQuery.rows;
      res.json(users);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  getAllUsers: async (req: Request, res: Response) => {
    try {
      const usersQuery = await pool.query(
        `SELECT u.*, c.cnt_codigo, c.cnt_descripcion 
        FROM base_usuarios u
        INNER JOIN rmx_sld_centros c ON c.cnt_id = u.usr_cnt_id
        WHERE u.usr_estado != 'X' ORDER BY 1`
      );
      const users = usersQuery.rows;
      res.json(users);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  createUser: async (req: Request, res: Response) => {
    const { usr_cnt_id, usr_nombres, usr_primer_apellido, usr_segundo_apellido, usr_direccion, usr_celular, usr_lat, usr_lng, usr_email, usr_clave, usr_usr_id  } = req.body;

    try {
      // Verificar si el usuario ya existe en la base de datos
      const existingUserQuery = await pool.query('SELECT * FROM base_usuarios WHERE usr_email = $1', [usr_email]);
      const existingUser = existingUserQuery.rows[0];

      if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya existe' });
      }

      // Hashear la contraseña antes de almacenarla
      //const hashedPassword = await bcrypt.hash(password, 10);

      // Crear un nuevo usuario en la base de datos
      const newUser = await pool.query(`INSERT INTO base_usuarios
       (usr_cnt_id, usr_nombres, usr_primer_apellido, usr_segundo_apellido, usr_direccion, usr_celular, usr_lat, usr_lng, usr_email, usr_clave, usr_usr_id) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, crypt($10, gen_salt('bf')), $11) RETURNING * `, 
       [ usr_cnt_id, usr_nombres, usr_primer_apellido, usr_segundo_apellido, usr_direccion, usr_celular, usr_lat, usr_lng, usr_email, usr_clave, usr_usr_id]);

      res.json(newUser.rows[0]);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  updateUser: async (req: Request, res: Response) => {
    const { usr_id } = req.params;
    const { usr_cnt_id, usr_nombres, usr_primer_apellido, usr_segundo_apellido, usr_direccion, usr_celular, usr_lat, usr_lng, usr_email, usr_clave, usr_actualizado, usr_usr_id  } = req.body;

  
    try {
      // Verificar si el usuario existe en la base de datos
      const existingUserQuery = await pool.query('SELECT * FROM base_usuarios WHERE usr_id = $1', [usr_id]);
      const existingUser = existingUserQuery.rows[0];
      if (!existingUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Hashear la contraseña antes de almacenarla
      //const hashedPassword = await bcrypt.hash(password, 10);
  
      // Actualizar el usuario en la base de datos
      const updatedUserQuery = await pool.query(
        `UPDATE base_usuarios SET 
          usr_cnt_id = $1, usr_nombres = $2, usr_primer_apellido = $3, 
          usr_segundo_apellido = $4, usr_direccion = $5, usr_celular = $6, 
          usr_lat = $7, usr_lng = $8, usr_email = $9, 
          usr_clave = crypt($10, gen_salt('bf')), usr_actualizado = $11 
          WHERE usr_id = $12 RETURNING * `,
        [usr_cnt_id, usr_nombres, usr_primer_apellido, usr_segundo_apellido, usr_direccion, usr_celular, usr_lat, usr_lng, usr_email, usr_clave, usr_actualizado, usr_id]
      );
  
      const updatedUser = updatedUserQuery.rows[0];
  
      res.json(updatedUser);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    const { usr_id } = req.params;
    const { usr_usr_id, usr_actualizado, usr_estado} = req.body;

    try {
      const result = await pool.query(
        'UPDATE base_usuarios SET usr_actualizado = $1, usr_estado = $2, usr_usr_id = $3 WHERE usr_id = $4 RETURNING *',
        [usr_actualizado, usr_estado, usr_usr_id, usr_id]
      );
        if (result.rowCount === 0) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }
      res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },
}
  
export default UserController;
