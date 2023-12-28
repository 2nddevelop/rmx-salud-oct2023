// db.ts
import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'OMRS',
  password: '123456y',
  port: 5432,
});

export default pool;
