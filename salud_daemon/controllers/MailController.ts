// controllers/MailController.ts
import { Request, Response } from 'express';
import axios, { AxiosError }  from 'axios';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';
import nodemailer from 'nodemailer';

// Configuración del transporte SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com', // smt.zoho.com zoho
  port: 465, //465 zoho
  secure: true, 
  auth: {
    user: 'arsan.soft@arsansoft.com',
    pass: 'Arsan2023',
  },
});

// Función para enviar correo
const MailController = {
  sendMail: async (req: Request, res: Response) => {

    const { destinatario, asunto, cuerpo, urlAdjunto } = req.body;

    try {
      const response = await axios.get(urlAdjunto, { responseType: 'arraybuffer' });

      console.log('llego al controlador sendMail');
      const mailOptions = {
        from: '"ArsanSoft" <arsan.soft@arsansoft.com>',
        to: destinatario,
        subject: asunto,
        //text: cuerpo,
        html: cuerpo,
        attachments: [
          {
            filename: 'adjunto_desde_url.pdf',
            href: urlAdjunto,
          },
        ],
      };

      // xxxxx borrar const info = await transporter.sendMail(mailOptions);

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Mensaje %s enviado: %s', info.messageId, info.response);
            res.render('index');
      });

      //console.log('Correo enviado:', info);
      res.json({"result": true, "message": "Mail was sended"});
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
  }
};

export default MailController;
