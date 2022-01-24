const express = require('express')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')
require('dotenv').config()
const users = require('./models/user_model')
const userRegistration = require('./routes/user_registration')
const genreRoute = require('./routes/genre_route')
const userLogin = require('./routes/user_login')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGOOSE_URI, {
  useNewUrlParser: true,
}).then(() => {
  console.log('MongoDB connected...')
}).catch((err) => {
  console.log('Error connecting to MongoDB. Error...', err)
  process.exit
})

app.use('/api/users/', userRegistration)
app.use('/api/users/', userLogin)
app.use('/api/genre/', genreRoute)


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running at http://localhost:${port}`))