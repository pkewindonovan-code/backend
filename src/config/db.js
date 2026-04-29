import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  host: 'aws-1-us-west-2.pooler.supabase.com',
  port: 5432,
  database: 'postgres',
  user: 'postgres.yoltegtlefnveazpwwsm',
  password: 'asdsdbgsrtu',
  ssl: {
    rejectUnauthorized: false
  }
});