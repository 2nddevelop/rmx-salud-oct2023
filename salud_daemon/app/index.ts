import express from 'express';
import router from '../middleware/router';
import cors from 'cors';

import https from 'https';
import fs from 'fs';

const app = express();
app.disable('x-powered-by')
const port = 8888;

app.use(express.json());
app.use(cors({
  origin: '*',
  allowedHeaders: '*',
  methods: '*',
  preflightContinue: true,
  optionsSuccessStatus: 204
}));

app.get('/', (req, res) => {
  res.sendFile('public/app.html', { root: '.' });
});

app.use('/api', router);

https
  .createServer({
    key: fs.readFileSync(__dirname + '/../../certificados/privatekey.pem'),
    cert: fs.readFileSync(__dirname + '/../../certificados/certificate.pem')
  }, app)
  .listen(port, () => {
    console.log(`Server listening at https://localhost:${port}`);
  });