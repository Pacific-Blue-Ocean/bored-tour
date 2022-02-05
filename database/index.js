const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: 'localhost',
  database: process.env.DATABASE,
  password: process.env.DB_PASS,
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool
  .connect()
  .then(() => console.log('Connected to Postgres database'))
  .catch((err) => console.error('Error connecting to Postgres database', err.stack));

pool.on('error', (err) => {
  console.error('Unexpected error on idle Postgres client', err);
  process.exit(-1);
});

module.exports.pool = pool;
