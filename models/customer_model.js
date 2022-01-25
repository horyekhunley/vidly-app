const mongoose = require('mongoose')
const Joi = require('joi')

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  isGold: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
})

// genreSchema.methods.generateAuthToken = function(){
//   const token = jwt.sign({ _id: this._id}, process.env.JWT_SECRET)
//   return token
// }

const validate = (customer) => {
	const schema = Joi.object({
		name: Joi.string().min(5).max(50).required(),
		isGold: Joi.boolean(),
		phone: Joi.string().min(9).max(50).required(),
	
	})
  return schema.validate(customer);
}

const Customer = mongoose.model('Customer', customerSchema)

module.exports = {
  Customer, validate
}