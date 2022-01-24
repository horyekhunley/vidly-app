const mongoose = require('mongoose')
const Joi = require('joi')

const genreSchema = new mongoose.Schema({
  name: {
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

const validate = (genre) => {
	const schema = Joi.object({
		name: Joi.string().min(5).max(50).required(),
	
	})
  return schema.validate(genre);
}

const Genre = mongoose.model('Genre', genreSchema)

module.exports = {
  Genre, validate
}