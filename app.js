const express = require('express')
require('express-async-errors')
const winston = require('winston')
require('winston-mongodb')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
require('dotenv').config()

const app = express()

require('./startup/routes')(app)
require('./startup/db')()

winston.add(new winston.transports.File({ filename: 'logfile.log' }))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running at http://localhost:${port}`))