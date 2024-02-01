import { config } from 'mssql';

// Configuración de la conexión a la base de datos
const dbConfig: config = {
  user: 'sa',
  password: '1a2b3c4d',
  database: 'bdESTADISTICA',
  server: '192.168.0.8',
  options: {
    encrypt: true, // Si tu servidor SQL Server utiliza SSL/TLS
    trustServerCertificate: true,
    cryptoCredentialsDetails: {
      minVersion: 'TLSv1'
    }
  }
};

export default dbConfig;
