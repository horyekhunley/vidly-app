const { User, validate } = require('../models/user_model')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const express = require('express')
const router = express.Router()
const _ = require('lodash')
const bcrypt = require('bcrypt')

router.post('/register', async(req, res) => {
  const { error } = validate(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  let user = await User.findOne({ email: req.body.email })
  if(user) return res.status(400).send('User already exists')

  //hash the incoming password
  const hashedPassword = await bcrypt.hash(req.body.password, 10)
  
  // populate the db with user details
  user = await new User({
    ...req.body,
    password: hashedPassword
  })
  // then save the user to db
  await user.save()

  const token = user.generateAuthToken()

  //send the id, name and email back to the frontend client
  res.header('x-auth-token', token).send( _.pick(user, ['_id', 'name', 'email']))

})

module.exports = router