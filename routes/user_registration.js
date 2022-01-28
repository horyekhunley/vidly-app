const { User, validate } = require('../models/user_model')
require('dotenv').config()
const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()
const _ = require('lodash')
const bcrypt = require('bcrypt')

router.get('/me', auth, async(req, res) => {
  const user = User.findById(req.user._id)
  res.send(user)
})

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

  //send the id, name and email back as a response header client
  res.header('x-auth-token', token).send( _.pick(user, ['_id', 'name', 'email']))

})

module.exports = router