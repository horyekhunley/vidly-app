const { Genre } = require('../models/genre.models')
const {Movie, validateMovie} = require('../models/movies.models')

exports.getAllMovies = async (req, res) => {
	const movies = await Movie.find().sort('title')
	return res.status(200).json(movies)
}

exports.createMovie = async (req, res) => {
	const { error } = validateMovie(req.body)
	if (error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId)
    if(!genre) return res.status(400).send('Invalid genre')

	const movie = new Movie({
		title: req.body.title,
		genre: {
            _id: genre._id,
            name: genre.name
        },
		numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
	})
	await movie.save()
	res.status(201).json(movie)
}

exports.updateMovie = async (req, res) => {
	const { error } = validateMovie(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	const movie = await Movie.findByIdAndUpdate(req.params.id, {...req.body}, {
		new: true
	})
	if (!movie) return res.status(404).send('The movie with the given id does not exist')

	res.status(200).json({
		message: 'Movie updated successfully',
		movie
	})}

exports.deleteMovie = async (req, res) => {
	const movie = await Movie.findByIdAndRemove(req.params.id)
	if (!movie) return res.status(404).send('The movie with the given id does not exist')
	res.status(200).json({
		message: 'Movie deleted successfully',
		movie
	})
}

exports.getMovieById = async (req, res) => {
	const movie = await Movie.findById(req.params.id)
	if (!movie) return res.status(404).send('The movie with the given id does not exist')
	return res.status(200).json(movie)
}