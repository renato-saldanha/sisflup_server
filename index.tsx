const app = require('express')()
const db = require('./config/db.tsx')
const consign = require('consign')
const config = require('./config/environment.js')

const host = config.server.host
const port = config.server.port

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