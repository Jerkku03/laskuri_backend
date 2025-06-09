const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const dataRouter = require('./controllers/data')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const projectsRouter = require('./controllers/projects')
const allProjectsRouter = require('./controllers/allprojects')
require('dotenv').config()

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })
  
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/data', dataRouter)
app.use('/api/projects', projectsRouter)
app.use('/api/allProjects', allProjectsRouter)

//if (process.env.NODE_ENV === 'test') {
//  const testingRouter = require('./controllers/testing')
//  app.use('/api/testing', testingRouter)}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app