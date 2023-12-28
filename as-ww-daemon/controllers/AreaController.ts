// controllers/UserController.ts
import { Request, Response } from 'express';
import axios, { AxiosError }  from 'axios';

import { ejecutarConsulta } from '../services/dataService';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';

const AreaController = {
  getClients: async (req: Request, res: Response) => {
    try {
      const query = 'SELECT top 50 * FROM TLECA200 '
                    + '';
  
      const datos = await ejecutarConsulta(query);
      console.log('datos >>>', datos);
      // Devuelve los datos como respuesta
      res.json(datos);
    } catch (error) {
      // Manejo de errores
      res.status(500).json({ error: 'Error al obtener los datos de la base de datos' });
    }
  },

  getAll: async (req: Request, res: Response) => {
    let areas: any = [];
    try {
      const query = 'SELECT top 50 * FROM TLECA200 '
                    + '';
    
      const datos = await ejecutarConsulta(query);
      areas = datos;
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los datos de la base de datos' });
    }

    try {
      let i = 0;
      const urlWw = 'http://localhost:3001/lead';
      const urlWwM = 'http://localhost:3001/leadM';
      const urlEmail = 'http://localhost:3000/api/sendMail';

      // test const areas = [
    	// test 	{
      // test     "WhmNom": "Cliente 1",
      // test     "WhmCel": "59170189699",  
      // test     "WhmEmail": "arsan.soft@arsansoft.com",
      // test     "WhmUrl": "https://cran.r-project.org/web/packages/cheatsheet/cheatsheet.pdf"
      // test   }, {
      // test     "WhmNom": "Cliente 1",
      // test     "WhmCel": "59164080454",  
      // test     "WhmEmail": "plan.b@zoho.com",
      // test     "WhmUrl": "https://cran.r-project.org/web/packages/cheatsheet/cheatsheet.pdf"
      // test   }, 
      // test ];

      areas.forEach((el: any) => {
        const fechaHoraActual = new Date();

        // Obtiene los componentes individuales de la fecha y hora
        const aa = fechaHoraActual.getFullYear();
        const mm = fechaHoraActual.getMonth() + 1; // Los meses van de 0 a 11
        const dd = fechaHoraActual.getDate();
        const horas = fechaHoraActual.getHours();
        const minutos = fechaHoraActual.getMinutes();
        const segundos = fechaHoraActual.getSeconds();

        // mensajes formateados
        const encabGenerado = `Cliente: ${el.WhmNom}\nNúmero: _${el.WhmCel}_\n\n`;
        const fechaGenerada = `\n\n📆 _${aa}-${mm}-${dd}_ ⏰ _${horas}:${minutos}:${segundos}_`;
      
        const datosWw = {
          "message": encabGenerado + el.WhmUrl + fechaGenerada,
          "phone": '591' + el.WhmCel,
          "urlFile": el.WhmUrl,
          "newFileName": `AvisoCobranza_${aa}-${mm}-${dd}.pdf`
        };

        // WhatsApp
        axios.post(urlWwM, datosWw)
        .then((responseWw) => {
          console.log('Datos del WhatsApp:', responseWw.data);
        })
        .catch((error: AxiosError) => {
          if (error.response) {
            console.error('Error en la respuesta del servidor:', error.response.data);
          } else if (error.request) {
            console.error('No se recibió respuesta del servidor');
          } else {
            console.error('Error al consumir el servicio:', error.message);
          }
        });

        i++;

        // E-mail
        const datosEmail = {
          "destinatario": el.WhmEmail,
          "asunto": 'Aviso de cobranza ' + i,
          "cuerpo": encabGenerado + 'Adjunto enviamos AVISO DE COBRNAZA' + fechaGenerada,
          //"urlAdjunto": 'https://cran.r-project.org/web/packages/cheatsheet/cheatsheet.pdf'
          "urlAdjunto": el.WhmUrl
        };

        axios.post(urlEmail, datosEmail)
        .then((responseEmail) => {
          console.log('Datos del E-mail:', responseEmail.data);
        })
        .catch((error: AxiosError) => {
          if (error.response) {
            console.error('Error en la respuesta del servidor:', error.response.data);
          } else if (error.request) {
            console.error('No se recibió respuesta del servidor');
          } else {
            console.error('Error al consumir el servicio:', error.message);
          }
        });
      });
      res.json(areas);
    } catch (error) {
      console.error('Error al obtener respuesta del envio de correo:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

};

export default AreaController;
