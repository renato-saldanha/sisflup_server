const app = require('express')()
const db = require('./config/db.tsx')
const consign = require('consign')

const host = "192.168.2.75"
const port = 4000

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