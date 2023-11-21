// controllers/UserController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';
//import User from '../models/User';

const UserController = {
  login: async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
      // Verificar si el usuario existe en la base de datos
      const userQuery = await pool.query('SELECT * FROM base_usuarios WHERE usr_email = $1', [username]);
      const user = userQuery.rows[0];

      if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      // Comparar la contraseña proporcionada con la contraseña almacenada
      const isPasswordMatch = await bcrypt.compare(password, user.usr_clave);

      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      // Generar un token JWT
      const token = jwt.sign({ userId: user.usr_id }, 'secreto', { expiresIn: '1h' });

      res.json({ token });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  getAllUsers: async (req: Request, res: Response) => {
    try {
      const usersQuery = await pool.query(
        `SELECT u.*, o.ori_codigo, o.ori_descripcion, t.tme_codigo, t.tme_descripcion 
        FROM base_usuarios u
        INNER JOIN base_tipos_membresias t ON t.tme_id = u.usr_tme_id
        INNER JOIN base_origenes o ON o.ori_id = u.usr_ori_id
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
    const { username, password } = req.body;

    try {
      // Verificar si el usuario ya existe en la base de datos
      const existingUserQuery = await pool.query('SELECT * FROM base_usuarios WHERE usr_email = $1', [username]);
      const existingUser = existingUserQuery.rows[0];

      if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya existe' });
      }

      // Hashear la contraseña antes de almacenarla
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear un nuevo usuario en la base de datos
      const newUser = await pool.query('INSERT INTO base_usuarios (usr_email, usr_clave) VALUES ($1, $2) RETURNING *', [username, hashedPassword]);

      res.json(newUser.rows[0]);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  updateUser: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, password } = req.body;

    try {
      // Verificar si el usuario existe en la base de datos
      const existingUserQuery = await pool.query('SELECT * FROM base_usuarios WHERE id = $1', [id]);
      const existingUser = existingUserQuery.rows[0];

      if (!existingUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      // Hashear la contraseña antes de almacenarla
      const hashedPassword = await bcrypt.hash(password, 10);

      // Actualizar el usuario en la base de datos
      const updatedUser = await pool.query(
        'UPDATE base_usuarios SET usr_email = $1, usr_clave = $2 WHERE usr_id = $3 RETURNING *',
        [username, hashedPassword, id]
      );

      res.json(updatedUser.rows[0]);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      // Verificar si el usuario existe en la base de datos
      const existingUserQuery = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      const existingUser = existingUserQuery.rows[0];

      if (!existingUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      // Eliminar el usuario de la base de datos
      await pool.query('DELETE FROM users WHERE id = $1', [id]);

      res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },
};

export default UserController;
