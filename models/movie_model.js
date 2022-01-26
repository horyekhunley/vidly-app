const mongoose = require("mongoose");
const Joi = require("joi");
const { Genre } = require("../models/genre_model");

const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		minlength: 5,
		maxlength: 255
	},
	genre: {
		type: mongoose.Types.ObjectId,
	},
	numberInStock: {
		type: Number,
		required: true,
		min: 0,
		max: 255,
	},
	dailyRentalRate: {
		type: Number,
		required: true,
		min: 0,
		max: 255,
	},
});

// genreSchema.methods.generateAuthToken = function(){
//   const token = jwt.sign({ _id: this._id}, process.env.JWT_SECRET)
//   return token
// }

const validate = (movie) => {
	const schema = Joi.object({
		title: Joi.string().min(5).max(50).required(),
		genreId: Joi.objectId().required(),
		numberInStock: Joi.number(),
		dailyRentalRate: Joi.number(),
	});
	return schema.validate(movie);
};

const Movie = mongoose.model("Movie", movieSchema);

module.exports = {
	Movie,
	validate,
};
