const { validateUser, User } = require("../models/user.model");
const _ = require("lodash")
const Joi = require('joi')
const bcrypt = require('bcrypt')

exports.register = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("This user already exists");

  // user = new User(_.pick(user, ['name', 'email', 'password']))
  user = new User({
    ...req.body
  })

  user.password = await bcrypt.hash(user.password, 10)
  await user.save();

  const token = user.generateAuthToken()

  // res.status(201).send(_.pick(user, [ "_id", "name", "email"]))
  res.header('x-auth-token', token).send({
    _id: user._id,
    name: user.name,
    email: user.email
  })
};
exports.login = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password")

  const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
  if(!isPasswordValid) return res.status(400).send('Invalid email or password')

  const token = user.generateAuthToken()
  res.send(token)
}
exports.getLoggedInUser = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password')
  res.status(200).send(user)
}

// create a new joi validation for user since we only need to validate email and password
const validate = (req) => {
	const schema = Joi.object({
		email: Joi.string().min(5).max(255).required().trim().email(),
		password: Joi.string().min(8).max(255).required()
	})
	return schema.validate(req)
}