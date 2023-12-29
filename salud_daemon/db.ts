import { ConnectionPool, config } from 'mssql';

// Configuración de la conexión a la base de datos
const dbConfig: config = {
  user: 'sa',
  password: '@a1b2c3d4',
  database: 'estadistica',
  server: '127.0.0.1',
  options: {
    port: 1433,
    encrypt: false, // Si tu servidor SQL Server utiliza SSL/TLS
  },
};
const pool = new ConnectionPool(dbConfig);

/*
//import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'OMRS',
  password: '123456y',
  port: 5432,
});
*/

export default pool;
