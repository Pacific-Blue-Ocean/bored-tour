const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'pacific',
  password: 'admin',
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool
  .connect()
  .then(() => console.log('Connected to Postgres database'))
  .catch((err) => console.error('Error connecting to Postgres database', err.stack));

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle Postgres client', err);
  process.exit(-1);
});

module.exports.pool = pool;
