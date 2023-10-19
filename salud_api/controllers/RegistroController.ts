// controllers/UserController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';
//import Membresia from '../models/Membresia';

const RegistroController = {
  getAllRegistros: async (req: Request, res: Response) => {
    try {
      const registrosQuery = await pool.query(
        "SELECT r.*, g.gp_codigo, g.gp_descripcion, a.ar_codigo, a.ar_descripcion "
        + "FROM prc_registros r "
        + "INNER JOIN prc_galpones g ON g.gp_id = r.reg_gp_id "
        + "INNER JOIN prc_areas a ON a.ar_id = g.gp_ar_id "
        + "WHERE r.reg_estado != 'X' ORDER BY 1 "
      ); // quitar el plural dela ultima palabra
      const registros = registrosQuery.rows;
      res.json(registros);
    } catch (error) {
      console.error('Error al obtener los Registros:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  getAllRegistrosByFechaArea: async (req: Request, res: Response) => {
    console.log('List RegistrosByFechaArea: ', req.params);

    const { reg_fecha, reg_ar_id } = req.params;

    try {
      const registrosQuery = await pool.query(
        "SELECT r.*, g.gp_codigo, g.gp_descripcion, a.ar_codigo, a.ar_descripcion "
        + "FROM prc_registros r "
        + "INNER JOIN prc_galpones g ON g.gp_id = r.reg_gp_id "
        + "INNER JOIN prc_areas a ON a.ar_id = g.gp_ar_id "
        + "WHERE r.reg_fecha = $1 AND r.reg_ar_id = $2 "
        + " -- AND r.reg_gp_id = $3 "
        + "  AND r.reg_estado != 'X' ORDER BY 1 ",
        [reg_fecha, reg_ar_id]
      );
      const registros = registrosQuery.rows;
      res.json(registros);
    } catch (error) {
      console.error('Error al obtener los Registros:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  createRegistro: async (req: Request, res: Response) => {
    console.log('Create: ', req.body);

    const { reg_fecha, reg_gp_id, reg_ar_id,
      reg_chimi, reg_choqueta, reg_comun, reg_elegida_kl, 
      reg_hojeada, reg_hojeada_esp, reg_mediana, reg_mediana_esp, 
      reg_actualizado, reg_usr_id, reg_estado } = req.body;

    try {
      // Crear un nuevo Registro en la base de datos
      const newOrigen = await pool.query('INSERT INTO prc_registros'
        + '(reg_ar_id, reg_gp_id, reg_fecha, '
        + 'reg_chimi, reg_choqueta, reg_comun, reg_elegida_kl, '
        + 'reg_hojeada, reg_hojeada_esp, reg_mediana, reg_mediana_esp, '
        + 'reg_usr_id, reg_estado) '
        + 'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *', 
        [ reg_ar_id, reg_gp_id, reg_fecha,
          reg_chimi, reg_choqueta, reg_comun, reg_elegida_kl, 
          reg_hojeada, reg_hojeada_esp, reg_mediana, reg_mediana_esp, 
          reg_usr_id, reg_estado ]);

      res.json(newOrigen.rows[0]);
    } catch (error) {
      console.error('Error al crear el origen:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  updateRegistro: async (req: Request, res: Response) => {
    console.log('ID: ', req.params);
    console.log('Update: ', req.body);

    const { reg_id } = req.params;
    const { reg_fecha, reg_gp_id, reg_ar_id,
      reg_chimi, reg_choqueta, reg_comun, reg_elegida_kl, 
      reg_hojeada, reg_hojeada_esp, reg_mediana, reg_mediana_esp, 
      reg_actualizado, reg_usr_id, reg_estado } = req.body;

    try {
      // Verificar si el Registros existe en la base de datos
      const registrosQuery = await pool.query('SELECT * FROM prc_registros WHERE reg_id = $1', [reg_id]);
      const registros = registrosQuery.rows[0];

      if (!registros) {
        return res.status(404).json({ message: 'Registro no encontrado' });
      }

      // Actualizar el Registros en la base de datos
      const updateRegistro = await pool.query(
        'UPDATE prc_registros SET reg_ar_id = $1, reg_gp_id = $2, reg_fecha = $3, reg_chimi = $4, reg_choqueta = $5, reg_comun = $6, reg_elegida_kl = $7, reg_hojeada = $8, reg_hojeada_esp = $9, reg_mediana = $10, reg_mediana_esp = $11, reg_actualizado = $12, reg_usr_id = $13 WHERE reg_id = $14 RETURNING *',
        [reg_ar_id, reg_gp_id, reg_fecha, reg_chimi, reg_choqueta, reg_comun, reg_elegida_kl, reg_hojeada, reg_hojeada_esp, reg_mediana, reg_mediana_esp, reg_actualizado, reg_usr_id, reg_id]
      );

      res.json(updateRegistro.rows[0]);
    } catch (error) {
      console.error('Error al actualizar el Registro:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  deleteRegistro: async (req: Request, res: Response) => {
    console.log('ID: ', req.params);
    console.log('Delete: ', req.body);

    const { reg_id } = req.params;
    const { reg_usr_id, reg_actualizado, reg_estado} = req.body;
    try {
      // Verificar si el Registros existe en la base de datos
      const registrosQuery = await pool.query('SELECT * FROM prc_registros WHERE reg_id = $1', [reg_id]);
      const registros = registrosQuery.rows[0];

      if (!registros) {
        return res.status(404).json({ message: 'Registro no encontrado' });
      }

      // Eliminar el Registros de la base de datos
      await pool.query('UPDATE prc_registros SET reg_actualizado = $1, reg_estado = $2, reg_usr_id = $3 WHERE reg_id = $4 RETURNING *', 
            [reg_actualizado, reg_estado, reg_usr_id, reg_id]);

      res.json({ message: 'Registro eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el Registro:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

};

export default RegistroController;
