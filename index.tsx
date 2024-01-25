const app = require('express')()
const db = require('./config/db.tsx')
const consign = require('consign')

const config = require('config')
const host = config.get('server.host')
const port = config.get('server.port')

consign()
  .then('./config/middlewares.tsx')
  .then('./api')
  .then('./config/routes.tsx')
  .into(app)

app.db = db


app.listen(port, host, e => {
  if (e) {
    console.log(e)
    process.exit(1)
  }

  console.log(`Backend executado em ${host}:${port}`)
})