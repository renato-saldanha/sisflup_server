const config = require('../knexfile.tsx')
const knex = require('knex')(config)

module.exports = knex
