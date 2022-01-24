const Joi = require("joi");
const mongoose = require("mongoose")
const passwordComplexity = require('joi-password-complexity')

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50,
	},
	email: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 1025,
	},
});

const validate = (user) => {
	const schema = Joi.object({
		name: Joi.string().min(5).max(50).required(),
		email: Joi.string().min(5).max(255).required().email(),
		password: passwordComplexity().required(),
	});
  return schema.validate(user);
}

const User = mongoose.model("User", userSchema);

module.exports = {
  User, validate
}
