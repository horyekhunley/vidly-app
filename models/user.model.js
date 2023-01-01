const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: 5,
        maxLength: 50
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        minLength: 5,
        maxLength: 255
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: 8,
        maxLength: 1024
    },
    isAdmin: {
        type: Boolean,

    },
}, { timestamps: true })

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.JWT_SECRET)
    return token
}
const User = mongoose.model('user', userSchema)

const validateUser = (user) => {
	const schema = Joi.object({
		name: Joi.string().min(5).max(50).required().trim(),
		email: Joi.string().min(5).max(255).required().trim().email(),
		password: Joi.string().min(8).max(255).required()
	})
	return schema.validate(user)
}
module.exports = {
    User,
    validateUser
}