const { User } = require('../models/user_model')
const mongoose = require('mongoose')
const Joi = require('joi')
const express = require('express')
const passwordComplexity = require('joi-password-complexity')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const router = express.Router()
const _ = require('lodash')
const bcrypt = require('bcrypt')

router.post('/login', async(req, res) => {

  //first validate request
  const { error } = validate(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  // check to see if email exists
  let user = await User.findOne({ email: req.body.email })
  if(!user) return res.status(400).send('Invalid email or password')

  const passwordMatch = await bcrypt.compare(req.body.password, user.password)

  if(!passwordMatch) return res.status(400).send('Invalid email or password')

  const token = user.generateAuthToken()
  res.send(token)
})

const validate = (req) => {
	const schema = Joi.object({
		email: Joi.string().min(5).max(255).required().email(),
		password: passwordComplexity().required(),
	});
  return schema.validate(req);
}

module.exports = router