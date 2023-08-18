const { Pool } = require('pg');

//const connectionString = process.env.DATABASE_URL || 'https://localhost:5432/wordledb';

const client = new Pool({
  user: 'postgres',
  port: 5432,
  host: 'localhost',
  database: 'wordledb',
  password: 'Mpmon812*',
  //connectionString,
  //ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

module.exports = client;