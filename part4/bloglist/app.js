const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const morgan = require('morgan')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const usersRourter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const url = config.MONGODB_URI

mongoose.set('strictQuery', false)
logger.info('connecting to mongoDB')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(express.json())
app.use(cors())

app.use('/api/login', loginRouter)
app.use('/api/users',usersRourter)

app.use(middleware.requestLogger)


//app.use(middleware.tokenExtractor)
//app.use(middleware.tokenValidator)

app.use('/api/blogs', blogsRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)
module.exports = app;