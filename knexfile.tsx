const knexConfig = {
  client: 'pg',
  connection: {
    // connectionString: 'http://localhost:5432',
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '!!R3n@t0',
    database: 'sis_flup',
  }
}
module.exports = knexConfig;