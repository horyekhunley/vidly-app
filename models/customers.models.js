const mongoose = require('mongoose')
const Joi = require('joi')

const customerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please provide a customer name'],
		minLength: 5,
		maxLength: 50,
	},
	phone: {
		type: String,
		required: [true, "Please provide customer's phone number"]
	},
	isGold: {
		type: Boolean,
		default: false
	},
})
const Customer = mongoose.model('customer', customerSchema)

const validateCustomer = (customer) => {
	const schema = Joi.object({
		name: Joi.string().min(5).max(50).required().trim(),
		phone: Joi.string().required().trim(),
		isGold: Joi.boolean()
	})
	return schema.validate(customer)
}

module.exports = {
	Customer,
	validateCustomer
}