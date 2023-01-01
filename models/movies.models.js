const mongoose = require('mongoose')
const Joi = require('joi')

const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Please provide a genre name'],
        minLength: 5,
		maxLength: 255,
        trim: true
	},
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    },
    numberInStock: {
        type: Number,
        min: 0,
        max: 255,
        required: true
    },
    dailyRentalRate: {
        type: Number,
        min: 0,
        max: 255,
        required: true,
    }
})
const Movie = mongoose.model('movie', movieSchema)

const validateMovie = (movie) => {
	const schema = Joi.object({
		title: Joi.string().max(255).required().trim(),
        genreId: Joi.ObjectId().required(),
		numberInStock: Joi.number(),
		dailyRentalRate: Joi.number(),
	})
	return schema.validate(movie)
}

module.exports = {
	Movie,
	validateMovie
}