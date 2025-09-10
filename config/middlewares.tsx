const bodyParse = require('body-parser')
const cors = require('cors')

module.exports = (app) => {
  // Middleware para parsing JSON
  app.use(bodyParse.json({ limit: '10mb' }))
  app.use(bodyParse.urlencoded({ extended: true, limit: '10mb' }))
  
  // CORS configurado para permitir todas as origens
  app.use(cors({ 
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }))
  
  // Middleware para logging de requisições
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
    next()
  })
  
  // Middleware para tratamento de erros
  app.use((err, req, res, next) => {
    console.error('Erro capturado pelo middleware:', err)
    res.status(500).json({ 
      resposta: 'Erro interno do servidor',
      timestamp: new Date().toISOString()
    })
  })
};