import { config } from 'mssql';

// Configuración de la conexión a la base de datos
const dbConfig: config = {
  user: 'sa',
  password: '@a1b2c3d4',
  database: 'bdESTADISTICA',
  server: 'localhost',
  options: {
    port: 1433,
    encrypt: true, // Si tu servidor SQL Server utiliza SSL/TLS
    trustServerCertificate: true,
    cryptoCredentialsDetails: {
      minVersion: 'TLSv1'
    }
  },
};

export default dbConfig;
