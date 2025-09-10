const config = require('./config/environment.js')

const knexConfig = {
  client: 'pg',
  connection: {
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database,
  },
  migrations: {
    directory: './migrations'
  },
  seeds: {
    directory: './seeds'
  },
  pool: {
    min: 2,
    max: 10
  }
}
module.exports = knexConfig;