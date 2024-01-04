// index.ts
import express from 'express';
import bodyParser from 'body-parser';
import router from '../middleware/router';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import cors from 'cors';

import https from 'https';
import fs from 'fs';

const app = express();
const port = 8888;

app.use(bodyParser.json());
app.use(cors({
  origin: '*',
  allowedHeaders: '*',
  methods: '*',
  preflightContinue: true,
  optionsSuccessStatus: 204
}));
//app.use((req, res, next) => {
//  res.header('Access-Control-Allow-Origin', '*');
//  res.header('Access-Control-Allow-Headers', '*');
//  res.header('Access-Control-Allow-Methods', '*');
//  next();
//});

app.get('/', (req, res) => {
  res.sendFile('public/app.html', { root: '.' });
});

app.use('/api', router);

// documentación swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
    },
  },
  apis: ['**/*.ts'], // Especifica la ruta de tus archivos de ruta/controlador
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


https
  .createServer({
    key: fs.readFileSync(__dirname + '/../../certificados/privatekey.pem'),
    cert: fs.readFileSync(__dirname + '/../../certificados/certificate.pem')
  }, app)
  .listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}\nSwagger en https://localhost:${port}/api/docs/`);
  });