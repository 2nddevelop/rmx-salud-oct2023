// db.ts
import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'rmx_salud_2023',
  password: '123456y',
  port: 5432,
});

export default pool;
