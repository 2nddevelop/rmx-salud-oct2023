import pool from '../db';

// Función para ejecutar consultas en la base de datos
export const ejecutarConsulta = async (query: string) => {
  try {
    // Crea una pool de conexiones
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