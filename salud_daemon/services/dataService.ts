import { ConnectionPool, config } from 'mssql';

// Configuración de la conexión a la base de datos
const dbConfig: config = {
  user: 'sa',
  password: 'sqlserver2012',
  database: 'OMRS_SQL',
  server: '192.168.22.113\\LECTURAS',
  options: {
    port: 1433,
    encrypt: false, // Si tu servidor SQL Server utiliza SSL/TLS
  },
};

// Función para ejecutar consultas en la base de datos
export const ejecutarConsulta = async (query: string) => {
  try {
    // Crea una pool de conexiones
    const pool = new ConnectionPool(dbConfig);
    await pool.connect();

    // Ejecuta la consulta
    const result = await pool.request().query(query);

    // Cierra la conexión
    await pool.close();

    return result.recordset;
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    throw error;
  }
};
