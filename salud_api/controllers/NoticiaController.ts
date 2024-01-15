import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';

const NoticiaController = {
  getAllNoticias: async (req: Request, res: Response) => {
    try {
      const noticiasQuery = await pool.query('SELECT * FROM base_noticias');
      const noticias = noticiasQuery.rows;
      res.json(noticias);
    } catch (error) {
      console.error('Error al obtener los origenes:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  createNoticia: async (req: Request, res: Response) => {
    const { nt_titulo, nt_contenido, nt_usr_id, nt_estado} = req.body;

    try {

      // Crear un nuevo aviso en la base de datos
      const newNoticia = await pool.query('INSERT INTO base_noticias'
      + '(nt_titulo, nt_contenido, nt_usr_id, nt_estado)' 
      + 'VALUES ($1, $2, $3, $4) RETURNING *', [nt_titulo, nt_contenido, nt_usr_id, nt_estado]);

      res.json(newNoticia.rows[0]);
    } catch (error) {
      console.error('Error al crear el aviso:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  updateNoticia: async (req: Request, res: Response) => {
    const { nt_id } = req.params;
    const { nt_titulo, nt_contenido, nt_actualizado, nt_usr_id} = req.body;

    try {
      // Verificar si el Noticia existe en la base de datos
      const noticiasQuery = await pool.query('SELECT * FROM base_noticias WHERE nt_id = $1', [nt_id]);
      const noticias = noticiasQuery.rows[0];

      if (!noticias) {
        return res.status(404).json({ message: 'Noticia no encontrado' });
      }

      // Actualizar el Noticia en la base de datos
      const updatedNoticia = await pool.query(
        'UPDATE base_noticias SET nt_titulo = $1, nt_contenido = $2, nt_actualizado = $3, nt_usr_id = $4 WHERE nt_id = $5 RETURNING *',
        [nt_titulo, nt_contenido, nt_actualizado, nt_usr_id, nt_id]
      );
      res.json(updatedNoticia.rows[0]);
    } catch (error) {
      console.error('Error al actualizar el Noticia:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  deleteNoticia: async (req: Request, res: Response) => {
    const { nt_id } = req.params;
    const { nt_usr_id, nt_estado = 'X'} = req.body;

    try {
      // Verificar si el Noticia existe en la base de datos
      const noticiasQuery = await pool.query('SELECT * FROM base_noticias WHERE nt_id = $1', [nt_id]);
      const noticias = noticiasQuery.rows[0];

      if (!noticias) {
        return res.status(404).json({ message: 'Noticia no encontrado' });
      }

      // Eliminar el Noticia de la base de datos
      await pool.query('UPDATE base_noticias SET nt_estado = $1, nt_usr_id = $2 WHERE nt_id = $3 RETURNING *', 
            [nt_estado, nt_usr_id, nt_id ]);

      res.json({ message: 'Noticia eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el Noticia:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },
};

export default NoticiaController;
