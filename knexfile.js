const knexConfig = {
  client: 'pg',
  connection: {
    // connectionString: 'http://localhost:5432',
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'cyvsza5r',
    database: 'sis_flup',
  },
  migrations: {
    directory: './migrations'
  },
  seeds: {
    directory: './seeds'
  }
}
module.exports = knexConfig;
