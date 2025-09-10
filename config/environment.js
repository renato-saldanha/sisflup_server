// Configurações de ambiente
module.exports = {
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'cyvsza5r',
    database: process.env.DB_NAME || 'sis_flup'
  },
  server: {
    host: process.env.SERVER_HOST || '192.168.1.14',
    port: process.env.SERVER_PORT || 4000
  },
  environment: process.env.NODE_ENV || 'development'
}
